import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Pacifico } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })
const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pacifico",
})

export const metadata: Metadata = {
  title: "3D Emoji 生成器 - 一键生成海岛风格表情包",
  description: "用 AI 技术将你的照片转换成独特的 3D 海岛风格 Emoji 贴纸，让表达更有趣。",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.className} ${pacifico.variable}`}>{children}</body>
    </html>
  )
}
