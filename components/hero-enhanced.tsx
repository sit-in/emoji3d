"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Upload, Zap, Palette, Check } from "lucide-react"

export default function HeroEnhanced() {
  const [activeDemo, setActiveDemo] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  
  // 演示数据
  const demos = [
    { emoji: "😊", color: "from-yellow-400 to-orange-400" },
    { emoji: "😎", color: "from-blue-400 to-purple-400" },
    { emoji: "🥰", color: "from-pink-400 to-red-400" },
    { emoji: "🤩", color: "from-purple-400 to-pink-400" },
  ]
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDemo((prev) => (prev + 1) % demos.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const scrollToUploader = () => {
    document.getElementById("uploader")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      {/* 高级背景效果 */}
      <div className="absolute inset-0">
        {/* 渐变球体 */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        
        {/* 装饰线条 */}
        <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* 左侧内容 */}
          <div className="text-center lg:text-left space-y-8">
            {/* 标签 */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-purple-200 rounded-full text-purple-700 text-sm font-medium shadow-lg">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>AI 驱动 · 即时生成 · 多样风格</span>
            </div>
            
            <div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                如何制作你的
                <span className="relative inline-block mt-2">
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 animate-gradient">
                    专属 3D Emoji
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-pink-200 blur-2xl opacity-30"></div>
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 max-w-xl leading-relaxed">
                简单 5 步，让 AI 为你创造独一无二的 3D 海岛风格表情包
              </p>
            </div>

            {/* 特性网格 */}
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0">
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300">
                <Palette className="w-8 h-8 text-purple-600 mb-2" />
                <h3 className="font-semibold text-gray-900">多种风格</h3>
                <p className="text-sm text-gray-600 mt-1">粘土、卡通、写实等</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300">
                <Zap className="w-8 h-8 text-orange-600 mb-2" />
                <h3 className="font-semibold text-gray-900">快速生成</h3>
                <p className="text-sm text-gray-600 mt-1">30-60秒完成</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300">
                <Upload className="w-8 h-8 text-pink-600 mb-2" />
                <h3 className="font-semibold text-gray-900">支持格式</h3>
                <p className="text-sm text-gray-600 mt-1">JPG/PNG 无限制</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300">
                <Check className="w-8 h-8 text-green-600 mb-2" />
                <h3 className="font-semibold text-gray-900">无文件大小限制</h3>
                <p className="text-sm text-gray-600 mt-1">任意尺寸均可</p>
              </div>
            </div>

            {/* CTA 按钮 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                onClick={scrollToUploader}
                size="lg"
                className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 rounded-2xl text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <Upload className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                立即开始制作
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="group border-2 border-gray-300 hover:border-purple-400 bg-white/80 backdrop-blur-sm px-8 py-6 rounded-2xl text-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                onClick={() => document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" })}
              >
                查看效果展示
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          {/* 右侧展示区 - 增强版 */}
          <div className="relative">
            <div 
              className="relative max-w-lg mx-auto"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* 主展示容器 */}
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                {/* 装饰元素 */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl opacity-20 blur-2xl"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-2xl opacity-20 blur-2xl"></div>
                
                {/* 标题 */}
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 rounded-full text-purple-700 text-sm font-medium">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                    </span>
                    实时预览
                  </div>
                </div>

                {/* 动态展示区 */}
                <div className="relative h-80 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden">
                  {/* 背景动画 */}
                  <div className="absolute inset-0">
                    <div className={`absolute inset-0 bg-gradient-to-br ${demos[activeDemo].color} opacity-10 transition-all duration-1000`}></div>
                  </div>
                  
                  {/* 中心内容 */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      {/* 原始 emoji */}
                      <div className={`text-8xl mb-4 transform transition-all duration-500 ${isHovered ? 'scale-110 rotate-6' : ''}`}>
                        {demos[activeDemo].emoji}
                      </div>
                      
                      {/* 箭头 */}
                      <div className="flex justify-center my-4">
                        <div className="flex items-center gap-2">
                          <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-purple-400"></div>
                          <ArrowRight className="w-5 h-5 text-purple-500" />
                          <div className="w-12 h-0.5 bg-gradient-to-r from-purple-400 to-transparent"></div>
                        </div>
                      </div>
                      
                      {/* 3D 效果 */}
                      <div className="relative inline-block">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-xl opacity-50"></div>
                        <div className="relative text-7xl animate-float">🏝️</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* 角标 */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    {demos.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === activeDemo ? 'bg-purple-600 w-8' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* 底部说明 */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">AI 自动识别并生成 3D 效果</p>
                  <div className="flex justify-center gap-4 mt-3">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>智能识别</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span>风格转换</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span>效果优化</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 悬浮的功能标签 */}
              <div className="absolute -top-4 -left-4 bg-white rounded-xl shadow-lg px-3 py-2 text-sm font-medium text-gray-700 animate-float">
                <Sparkles className="w-4 h-4 inline mr-1 text-yellow-500" />
                AI 驱动
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg px-3 py-2 text-sm font-medium text-gray-700 animate-float animation-delay-2000">
                <Zap className="w-4 h-4 inline mr-1 text-orange-500" />
                秒级生成
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}