"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Upload, Zap } from "lucide-react"

export default function Hero() {
  const [currentEmoji, setCurrentEmoji] = useState(0)
  const emojis = ["😊", "😎", "🥰", "😍", "🤗", "😇"]
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEmoji((prev) => (prev + 1) % emojis.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const scrollToUploader = () => {
    document.getElementById("uploader")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* 动态背景 */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-20 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
        {/* 左侧文字内容 */}
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full text-purple-700 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>AI 驱动的 3D 生成技术</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            如何制作你的
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 block">
              专属 3D Emoji
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-xl">
            简单 5 步，让 AI 为你创造独一无二的 3D 海岛风格表情包
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center lg:justify-start">
            <Button
              onClick={scrollToUploader}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <Upload className="w-5 h-5 mr-2" />
              立即开始制作
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-gray-300 hover:border-purple-400 px-8 py-6 rounded-full text-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
              onClick={() => document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" })}
            >
              查看效果展示
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* 特性标签 */}
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <div className="flex items-center gap-2 text-gray-600">
              <Zap className="w-5 h-5 text-orange-500" />
              <span>30秒快速生成</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Sparkles className="w-5 h-5 text-purple-500" />
              <span>多种风格可选</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Upload className="w-5 h-5 text-pink-500" />
              <span>支持 JPG/PNG</span>
            </div>
          </div>
        </div>

        {/* 右侧展示区 */}
        <div className="flex-1 relative">
          <div className="relative w-full max-w-lg mx-auto">
            {/* 主展示卡片 */}
            <div className="relative bg-white rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-all duration-500">
              {/* 步骤标签 */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 flex gap-2">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">1</div>
                <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">2</div>
              </div>

              {/* 原始照片区域 */}
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-6 mb-4">
                <div className="text-center">
                  <div className="text-6xl mb-4 animate-pulse">{emojis[currentEmoji]}</div>
                  <p className="text-sm text-gray-600">原始照片</p>
                </div>
              </div>

              {/* 箭头 */}
              <div className="flex justify-center my-4">
                <ArrowRight className="w-6 h-6 text-purple-500 animate-pulse" />
              </div>

              {/* 3D 效果区域 */}
              <div className="bg-gradient-to-br from-orange-100 to-yellow-100 rounded-2xl p-6">
                <div className="text-center">
                  <div className="relative">
                    <div className="text-6xl transform rotate-12 animate-bounce">🏝️</div>
                    <div className="absolute top-0 right-0 text-4xl animate-spin-slow">✨</div>
                  </div>
                  <p className="text-sm text-gray-600 mt-4">3D 模型</p>
                </div>
              </div>
            </div>

            {/* 装饰元素 */}
            <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 blur-2xl"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full opacity-20 blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}