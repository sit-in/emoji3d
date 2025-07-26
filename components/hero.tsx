"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"

export default function Hero() {
  const scrollToSteps = () => {
    document.getElementById("steps")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-300 via-pink-300 to-purple-400">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-300 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-pink-300 rounded-full blur-lg"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-orange-300 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-purple-300 rounded-full blur-lg"></div>
      </div>

      {/* Island silhouette */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-emerald-600 to-emerald-400 opacity-60 rounded-t-full transform scale-x-150"></div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 drop-shadow-lg font-pacifico">
          一键生成 3D Emoji
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-4 max-w-2xl mx-auto leading-relaxed">
          将你的照片转换成可爱的 3D 海岛风格 Emoji 贴纸
        </p>
        <p className="text-lg md:text-xl text-white/80 mb-12 max-w-xl mx-auto">
          AI 驱动，秒级生成，让你的表情包与众不同
        </p>

        <Button
          onClick={scrollToSteps}
          size="lg"
          className="bg-white text-orange-500 hover:bg-orange-50 text-xl px-12 py-6 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 font-semibold"
        >
          开始制作 ✨
          <ArrowDown className="ml-2 h-5 w-5" />
        </Button>
      </div>

      {/* Floating emoji decorations */}
      <div className="absolute top-1/4 left-1/4 text-4xl animate-bounce" style={{ animationDelay: "0s" }}>
        🏝️
      </div>
      <div className="absolute top-1/3 right-1/4 text-3xl animate-bounce" style={{ animationDelay: "1s" }}>
        🌺
      </div>
      <div className="absolute bottom-1/3 left-1/6 text-3xl animate-bounce" style={{ animationDelay: "2s" }}>
        🥥
      </div>
      <div className="absolute bottom-1/4 right-1/6 text-4xl animate-bounce" style={{ animationDelay: "0.5s" }}>
        🌴
      </div>
    </section>
  )
}
