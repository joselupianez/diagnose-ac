'use client'
import Image from 'next/image'
import { useState } from "react"
import Dropdown from '@/components/Dropdown'
import { AirConditioningAge, airConditioningAges, AirConditioningType, airConditioningTypes, MaintenanceFrequency, maintenanceFrequencies } from '@/utils/dropdownTypes'
import Footer from '@/components/Footer'

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false)
  const [issue, setIssue] = useState<string>("")
  const [generatedDiagnostic, setGeneratedDiagnostic] = useState<String>("")
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [acAge, setACAge] = useState<AirConditioningAge>("Less than 1 year")
  const [acType, setACType] = useState<AirConditioningType>("Split system")
  const [maintenanceFrequency, setMaintenanceFrequency] = useState<MaintenanceFrequency>("Every 3 months")

  const generateNewDiagnostic = async (e: any) => {
    e.preventDefault()
    setGeneratedDiagnostic("")
    setLoading(true)

    const response = await fetch('/generate', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        issue,
        acAge,
        acType,
        maintenanceFrequency
      })
    })

    let answer = await response.json()

    if (response.status !== 200) {
      setErrorMessage(answer.message)
    }else {
      setGeneratedDiagnostic(answer.choices[0].text)
    }
    setLoading(false)
  }

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center p-10 min-h-screen text-slate-700 mb-5">
      <main className="flex flex-1 w-full flex-col">
        <div className="bg-white rounded-xl p-10">
          <h1 className="sm:text-6xl text-4xl font-bold mb-5">Diagnose your AC</h1>
          {errorMessage && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mt-8">{errorMessage}</div>
          )}
          <p className="my-5 font-medium text-left">1. Enter the issues you are experiencing with your air conditioning unit:</p>
          <textarea
            value={issue}
            className="w-full rounded-md border-gray-200 bg-slate-100 text-gray-700 shadow-sm placeholder:p-20 focus:ring-1 focus:ring-gray-400 focus:border-gray-400" 
            rows={4} 
            placeholder='e.g. My AC is not cooling properly.'
            onChange={(e) => setIssue(e.target.value)}
          />
          <p className="my-5 font-medium text-left">2. Select the type of air conditioning system you have:</p>
          <Dropdown 
            currentDropdownItem={acType}
            setDropDownItem={(newACType) => setACType(newACType as typeof acType)}
            dropdownItems={airConditioningTypes}
          />
          <p className="my-5 font-medium text-left">3. Select the age of your air conditioning system:</p>
          <Dropdown 
            currentDropdownItem={acAge}
            setDropDownItem={(newACAge) => setACAge(newACAge as typeof acAge)}
            dropdownItems={airConditioningAges}
          />
          <p className="my-5 font-medium text-left">4. Select the frequency of maintenance:</p>
          <Dropdown 
            currentDropdownItem={maintenanceFrequency}
            setDropDownItem={(newMaintenanceFrequency) => setMaintenanceFrequency(newMaintenanceFrequency as typeof maintenanceFrequency)}
            dropdownItems={maintenanceFrequencies}
          />
          {!loading ? (
            <button className="w-full rounded-xl py-3 px-2 mt-5 font-bold text-lg text-white bg-blue-600 hover:bg-blue-700" onClick={(e) => generateNewDiagnostic(e)}>Diagnose</button>
          ) : (
            <button className="w-full rounded-xl py-3 px-2 mt-5 font-bold text-lg text-white bg-blue-700" disabled>
              Diagnosing...
            </button>
          )}
        </div>
        {generatedDiagnostic && (
          <div className="bg-white rounded-xl mt-10 p-10">
            <h2 className="sm:text-4xl text-3xl max-w-2xl font-bold mb-10">Diagnostic:</h2>
            <p className="font-medium text-left">{generatedDiagnostic}</p>
          </div>
        )}


      </main>
      <Footer />
    </div>
  )
}
