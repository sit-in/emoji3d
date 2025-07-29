"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Upload, Zap, Palette, Layers, MapPin, Eye } from "lucide-react"

export default function HeroCreative() {
  const [currentStep, setCurrentStep] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  // 步骤数据
  const steps = [
    { 
      title: "选择风格与上传",
      icon: Palette,
      preview: "/demo/lady-original.jpg",
      color: "from-purple-500 to-pink-500"
    },
    { 
      title: "AI 生成 3D 模型",
      icon: Sparkles,
      preview: "/demo/lady-3d-model.png",
      color: "from-blue-500 to-purple-500"
    },
    { 
      title: "自动去除背景",
      icon: Layers,
      preview: "/demo/lady-transparent-3d.png",
      color: "from-green-500 to-blue-500"
    },
    { 
      title: "合成效果预览",
      icon: MapPin,
      preview: "/demo/lady-composite.png",
      color: "from-orange-500 to-pink-500"
    },
    { 
      title: "多视图保存",
      icon: Eye,
      preview: "/demo/lady-composite.png",
      color: "from-pink-500 to-purple-500"
    }
  ]
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height
    })
  }

  const scrollToUploader = () => {
    document.getElementById("uploader")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* 动态背景 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 左侧内容 */}
          <div className="text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full text-purple-700 text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>基于先进 AI 技术</span>
              <span className="text-xs bg-purple-600 text-white px-2 py-0.5 rounded-full">NEW</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
              如何制作你的
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 mt-2">
                专属 3D Emoji
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-xl">
              简单 5 步，让 AI 为你创造独一无二的 3D 海岛风格表情包
            </p>

            {/* 步骤指示器 */}
            <div className="flex items-center gap-2 justify-center lg:justify-start">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`transition-all duration-500 ${
                    index === currentStep 
                      ? 'w-8 h-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full' 
                      : 'w-2 h-2 bg-gray-300 rounded-full'
                  }`}
                />
              ))}
            </div>

            {/* CTA 按钮 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Button
                onClick={scrollToUploader}
                size="lg"
                className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-10 py-6 rounded-2xl text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center">
                  <Upload className="w-5 h-5 mr-2" />
                  立即开始制作
                </span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-gray-200 hover:border-purple-400 bg-white px-10 py-6 rounded-2xl text-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                onClick={() => document.getElementById("steps")?.scrollIntoView({ behavior: "smooth" })}
              >
                了解详细流程
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>

          {/* 右侧创意展示区 */}
          <div className="relative lg:pl-12">
            {/* 3D 透视容器 */}
            <div 
              className="relative perspective-1000"
              onMouseMove={handleMouseMove}
              style={{
                transform: `rotateY(${(mousePosition.x - 0.5) * 10}deg) rotateX(${-(mousePosition.y - 0.5) * 10}deg)`,
                transformStyle: 'preserve-3d',
                transition: 'transform 0.1s ease-out'
              }}
            >
              {/* 主卡片 */}
              <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                {/* 顶部步骤标题 */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${steps[currentStep].color} flex items-center justify-center text-white shadow-lg`}>
                        {React.createElement(steps[currentStep].icon, { className: "w-5 h-5" })}
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">第 {currentStep + 1} 步</p>
                        <h3 className="font-semibold text-gray-900">{steps[currentStep].title}</h3>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}></div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 图片预览区 */}
                <div className="relative h-96 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                  {/* 背景装饰 */}
                  <div className="absolute inset-0">
                    <div className={`absolute inset-0 bg-gradient-to-br ${steps[currentStep].color} opacity-5`}></div>
                    {currentStep === 2 && (
                      <div className="absolute inset-0 bg-checkered opacity-10"></div>
                    )}
                  </div>
                  
                  {/* 图片容器 */}
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="relative w-full h-full">
                      <img
                        src={steps[currentStep].preview}
                        alt={steps[currentStep].title}
                        className="w-full h-full object-contain rounded-2xl shadow-xl transition-all duration-700 transform"
                        style={{
                          transform: `scale(${currentStep === 2 ? 0.9 : 1}) translateZ(50px)`,
                        }}
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.jpg"
                        }}
                      />
                      
                      {/* 悬浮标签 */}
                      {currentStep === 0 && (
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700 shadow-lg">
                          原始照片
                        </div>
                      )}
                      {currentStep === 1 && (
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                          AI 生成中...
                        </div>
                      )}
                      {currentStep === 2 && (
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                          背景已移除
                        </div>
                      )}
                      {currentStep === 3 && (
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                          合成完成
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 进度条 */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                    <div 
                      className={`h-full bg-gradient-to-r ${steps[currentStep].color} transition-all duration-3000 ease-linear`}
                      style={{ width: '100%' }}
                    ></div>
                  </div>
                </div>

                {/* 底部功能提示 */}
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Zap className="w-4 h-4 text-orange-500" />
                      <span>处理时间：30-60秒</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Sparkles className="w-4 h-4 text-purple-500" />
                      <span>AI 智能优化</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 装饰元素 */}
              <div className="absolute -top-8 -right-8 w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-2xl opacity-30"></div>
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full blur-2xl opacity-30"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}