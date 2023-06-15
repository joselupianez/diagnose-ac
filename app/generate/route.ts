import { Ratelimit } from "@upstash/ratelimit"
import {Redis} from "@upstash/redis"
import { NextResponse } from "next/server"
import { headers } from "next/headers"

import { MaintenanceFrequency, AirConditioningType, AirConditioningAge } from "@/utils/dropdownTypes"

const redis = !!process.env.UPSTASH_REDIS_REST_URL && !!process.env.UPSTASH_REDIS_REST_TOKEN 
    ? new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
    }) : undefined

const ratelimit = redis
    ? new Ratelimit({
        redis: redis,
        limiter: Ratelimit.fixedWindow(5, "1440 m"),
    }) : undefined;

export async function POST(request: Request) {
    const {         
        issue,
        acAge,
        acType,
        maintenanceFrequency
    } = (await request.json()) as {
        issue?: string,
        acAge?: AirConditioningAge,
        acType?: AirConditioningType,
        maintenanceFrequency?: MaintenanceFrequency
    }

    if(!issue || !acAge || !acType || !maintenanceFrequency) return NextResponse.json({ "message": "Missing required data."}, {status: 400})

    const prompt = `Generate a diagnostic for an air conditioning of type ${acType}, that is ${acAge} old. The unit has the following maintenance frequency: ${maintenanceFrequency}. Explain it in a way that someone that anyone can understand and suggest possible repairs.
    Mention to not attempt to fix it without experience. Make it a paragraph that is less than 160 characters. Base it on the following issue: ${issue}`

    if (ratelimit) {
        const headersList = headers();
        const ipIdentifier = headersList.get("x-real-ip");
    
        const result = await ratelimit.limit(ipIdentifier ?? "");
    
        if (!result.success) {
            return NextResponse.json({
                message: "Too many uploads in 1 day. Please try again in a 24 hours."
            }, {
                status: 429,
                headers: {
                    "X-RateLimit-Limit": result.limit,
                    "X-RateLimit-Remaining": result.remaining,
                } as any,
            })
        }
    }

    const payload = {
        model: "text-davinci-003",
        prompt,
        temperature: 0.7,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        max_tokens: 200,
        stream: false,
        n: 1,
    }

    try {
        const response = await fetch("https://api.openai.com/v1/completions", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
            },
            method: "POST",
            body: JSON.stringify(payload),
        })
    
        const generatedDiagnostic = await response.json()
        
        if(generatedDiagnostic.error || !generatedDiagnostic.choices){
            return NextResponse.json({ "message": "Failed to generate diagnostic. Please try again later."}, {status: 400})
        }else{
            return NextResponse.json(generatedDiagnostic)
        }

    } catch (err){
        return NextResponse.json({ "message": "Failed to generate diagnostic. Please try again later."}, {status: 400})
    }
}