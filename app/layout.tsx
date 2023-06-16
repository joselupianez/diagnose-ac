import { Metadata } from "next"
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Diagnose AC',
  description: 'Diagnose your air conditioner in seconds.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-200`}>
        {children}
      </body>
    </html>
  )
}
