"use client"

import { Button } from "@/components/ui/button"
import { Upload, Sparkles, Zap, ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"

export default function HeroModern() {
  const [imageLoaded, setImageLoaded] = useState(false)
  
  const scrollToUploader = () => {
    document.getElementById("uploader")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      {/* 网格背景 */}
      <div className="absolute inset-0 bg-grid-gray-100 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      
      {/* 渐变装饰 */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-blue-100 via-cyan-100 to-teal-100 rounded-full blur-3xl opacity-40"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 左侧内容 */}
          <div className="text-center lg:text-left">
            {/* 标签 */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-50 border border-purple-200 rounded-full text-purple-700 text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              <span>基于 AI 的 3D 生成技术</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              将照片变成
              <span className="relative">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                  3D Emoji
                </span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 20" preserveAspectRatio="none">
                  <path d="M0,15 Q150,0 300,15" stroke="url(#gradient)" strokeWidth="4" fill="none"/>
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#9333ea" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-lg">
              使用先进的 AI 技术，一键将你的照片转换成独特的 3D 海岛风格表情包
            </p>

            {/* 特点 */}
            <div className="grid grid-cols-3 gap-4 mb-8 max-w-lg mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                  <Zap className="w-5 h-5 text-orange-500" />
                  <span className="font-semibold text-gray-900">快速</span>
                </div>
                <p className="text-sm text-gray-600">30秒生成</p>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-purple-500" />
                  <span className="font-semibold text-gray-900">智能</span>
                </div>
                <p className="text-sm text-gray-600">AI 优化</p>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                  <Upload className="w-5 h-5 text-pink-500" />
                  <span className="font-semibold text-gray-900">简单</span>
                </div>
                <p className="text-sm text-gray-600">一键上传</p>
              </div>
            </div>

            {/* 按钮 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                onClick={scrollToUploader}
                size="lg"
                className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-6 rounded-2xl text-lg font-medium shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                开始制作
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-gray-200 hover:border-gray-300 bg-white px-8 py-6 rounded-2xl text-lg font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                onClick={() => document.getElementById("steps")?.scrollIntoView({ behavior: "smooth" })}
              >
                了解流程
              </Button>
            </div>
          </div>

          {/* 右侧展示 */}
          <div className="relative">
            <div className="relative mx-auto max-w-md">
              {/* 主展示图 */}
              <div className="relative bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 shadow-2xl">
                {/* 装饰点 */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-purple-500 rounded-full"></div>
                <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-pink-500 rounded-full"></div>
                
                {/* 示例图片 */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="bg-white rounded-2xl p-4 shadow-lg">
                      <img 
                        src="/demo/lady-original.jpg" 
                        alt="原始照片"
                        className="w-full h-32 object-cover rounded-lg"
                        onLoad={() => setImageLoaded(true)}
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.jpg"
                        }}
                      />
                      <p className="text-xs text-center mt-2 text-gray-600">原始照片</p>
                    </div>
                    <div className="bg-white rounded-2xl p-4 shadow-lg">
                      <img 
                        src="/demo/lady-3d-model.png" 
                        alt="3D模型"
                        className="w-full h-32 object-cover rounded-lg"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.jpg"
                        }}
                      />
                      <p className="text-xs text-center mt-2 text-gray-600">3D 模型</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-white rounded-2xl p-4 shadow-lg">
                      <img 
                        src="/demo/lady-transparent-3d.png" 
                        alt="透明3D"
                        className="w-full h-32 object-cover rounded-lg bg-checkered"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.jpg"
                        }}
                      />
                      <p className="text-xs text-center mt-2 text-gray-600">透明 3D</p>
                    </div>
                    <div className="bg-white rounded-2xl p-4 shadow-lg">
                      <img 
                        src="/demo/lady-composite.png" 
                        alt="合成效果"
                        className="w-full h-32 object-cover rounded-lg"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.jpg"
                        }}
                      />
                      <p className="text-xs text-center mt-2 text-gray-600">合成效果</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 悬浮标签 */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow-lg text-sm font-medium text-gray-700">
                实际效果展示
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}