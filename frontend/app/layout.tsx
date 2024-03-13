import Shell from "@/components/shell";
import type { Metadata } from "next";
import { Inter, Martian_Mono } from "next/font/google";
import "./globals.css";

const body = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
})

const mono = Martian_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "vignettte",
  description: "a smarter media manager",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${body.variable} ${mono.variable} bg-white text-gray-900 dark:bg-black dark:text-white`}>
        <Shell>{children}</Shell>
      </body>
    </html>
  )
}
