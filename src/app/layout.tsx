import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Open Projects — Platforms & Tools Directory",
  description:
    "Discover platforms and tools across every creative segment. Filter by design, programming, AI, video, and more — open source, free, freemium, or paid.",
  keywords: [
    "tools",
    "platforms",
    "design",
    "programming",
    "open source",
    "freemium",
    "directory",
  ],
  openGraph: {
    title: "Open Projects — Platforms & Tools Directory",
    description:
      "Browse and filter platforms by segment and pricing across all creative categories.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="flex min-h-full w-full max-w-full flex-col overflow-x-clip bg-bg-primary text-text-primary antialiased">
        <Header />
        <main className="min-w-0 flex-1 overflow-x-clip">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
