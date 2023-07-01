import './globals.css'
import { Inter } from 'next/font/google'
import Providers from "./Providers";


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'GM Tactics',
  description: 'For Chess Puzzles',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Providers>
      <body className={inter.className}>{children}</body>
      </Providers>
    </html>
  )
}
