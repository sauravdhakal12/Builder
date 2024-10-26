import Header from "./components/header"
// import { GeistSans } from 'geist/font/sans';
import { Poppins } from "next/font/google"
import "./globals.css"
import { Toaster } from "react-hot-toast";
import NextTopLoader from 'nextjs-toploader';

import type { Viewport } from 'next'
import Footer from "./components/Footer";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

// const roboto = Roboto({weight: "300"});
const poppins = Poppins({ weight: "400" });

export default function RootLayout({
  children
}: {
  children: React.ReactNode,
}) {
  const bodyClass = `${poppins.className} flex-grow`;

  return (
    <html lang="en:US">
      <body className="min-h-screen flex flex-col justify-between max-w-10xl mx-30 bg-[#040404] text-white">

        {/* Header */}
        <Header />

        {/* Loading Bar Top */}
        <NextTopLoader showSpinner={false} color="#147ab5" speed={200} />

        {/* Main */}
        <main className={bodyClass}>
          <div className="max-w-6xl mx-auto mt-10 lg:mt-20 h-[100vmn]">
            {children}
          </div>
        </main>

        {/* Toast for popup messages */}
        <Toaster position="bottom-right" toastOptions={{
          duration: 3000,
          style: {
            background: "#111111",
            color: "white",
            border: "2px solid #444444",
            width: "300px"
          }
        }} />

        {/* Footer */}
        <Footer />

      </body>
    </html>
  )
}
