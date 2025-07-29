"use client"

import { useState } from "react"
import { Check } from "lucide-react"

// 使用本地图片路径
// 使用女士照片演示
const demoImages = {
  original: "/demo/lady-original.jpg", // 原始女士照片
  "3d": "/demo/lady-3d-model.png", // 3D模型效果
  transparent: "/demo/lady-transparent-3d.png", // 透明3D效果
  composite: "/demo/lady-composite.png", // 合成效果
}

// 临时使用占位图（当实际图片未准备好时）
const placeholderImages = {
  original: "/demo/original-placeholder.svg",
  "3d": "/demo/3d-model-placeholder.svg",
  transparent: "/demo/transparent-3d-placeholder.svg",
  composite: "/demo/composite-placeholder.svg",
}

export default function FeatureDemo() {
  const [currentView, setCurrentView] = useState<"original" | "3d" | "transparent" | "composite">("composite")
  const [useRealImages, setUseRealImages] = useState(true)
  const [imageLoadError, setImageLoadError] = useState<Record<string, boolean>>({})
  
  // 根据图片加载情况选择使用真实图片还是占位图
  const getImageSrc = (type: keyof typeof demoImages) => {
    if (!useRealImages || imageLoadError[type]) {
      return placeholderImages[type]
    }
    return demoImages[type]
  }
  
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            看看实际效果
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            一张照片，四种呈现方式，满足你的不同需求
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 图片展示区 */}
          <div className="relative">
            <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-2xl">
              <div className="relative aspect-square">
                {/* 原图 */}
                <img
                  src={getImageSrc("original")}
                  alt="原始照片"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                    currentView === "original" ? "opacity-100" : "opacity-0"
                  }`}
                  onError={() => setImageLoadError(prev => ({ ...prev, original: true }))}
                />
                
                {/* 3D模型 */}
                <div className={`absolute inset-0 bg-checkered transition-opacity duration-500 ${
                  currentView === "3d" ? "opacity-100" : "opacity-0"
                }`}>
                  <img
                    src={getImageSrc("3d")}
                    alt="3D模型"
                    className="w-full h-full object-contain p-8"
                    onError={() => setImageLoadError(prev => ({ ...prev, "3d": true }))}
                  />
                </div>
                
                {/* 透明3D */}
                <div className={`absolute inset-0 bg-checkered transition-opacity duration-500 ${
                  currentView === "transparent" ? "opacity-100" : "opacity-0"
                }`}>
                  <img
                    src={getImageSrc("transparent")}
                    alt="透明3D"
                    className="w-full h-full object-contain p-8"
                    onError={() => setImageLoadError(prev => ({ ...prev, transparent: true }))}
                  />
                </div>
                
                {/* 合成效果 */}
                <div className={`absolute inset-0 transition-opacity duration-500 ${
                  currentView === "composite" ? "opacity-100" : "opacity-0"
                }`}>
                  <img
                    src={getImageSrc("composite")}
                    alt="合成效果"
                    className="w-full h-full object-cover"
                    onError={() => {
                      setImageLoadError(prev => ({ ...prev, composite: true }))
                      // 如果合成图加载失败，使用分层显示
                      const elem = document.getElementById('composite-fallback')
                      if (elem) elem.style.display = 'block'
                    }}
                  />
                  {/* 备用合成效果（分层显示） */}
                  <div id="composite-fallback" className="absolute inset-0" style={{ display: 'none' }}>
                    <img
                      src={getImageSrc("original")}
                      alt="合成效果背景"
                      className="w-full h-full object-cover"
                    />
                    <img
                      src={getImageSrc("transparent")}
                      alt="合成3D"
                      className="absolute bottom-4 right-4 w-1/4 h-1/4 object-contain"
                    />
                  </div>
                </div>
              </div>
              
              {/* 视图标签 */}
              <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                {currentView === "original" && "原始照片"}
                {currentView === "3d" && "3D 模型"}
                {currentView === "transparent" && "透明 3D"}
                {currentView === "composite" && "合成效果"}
              </div>
            </div>
            
            {/* 视图切换按钮 */}
            <div className="mt-6 flex justify-center gap-2">
              {(["composite", "original", "3d", "transparent"] as const).map((view) => (
                <button
                  key={view}
                  onClick={() => setCurrentView(view)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    currentView === view
                      ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {view === "composite" && "合成效果"}
                  {view === "original" && "原始照片"}
                  {view === "3d" && "3D 模型"}
                  {view === "transparent" && "透明 3D"}
                </button>
              ))}
            </div>
          </div>
          
          {/* 功能说明 */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-800">
              四种视图，随心切换
            </h3>
            
            <p className="text-lg text-gray-600">
              我们的 AI 不仅能生成精美的 3D 模型，还能智能去除背景，
              并将透明的 3D 头像完美合成到原图上。
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">合成效果</h4>
                  <p className="text-gray-600">将透明 3D 头像叠加在原图上，创造有趣的视觉效果</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">原始照片</h4>
                  <p className="text-gray-600">保留你上传的原始照片，随时对比查看</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">3D 模型</h4>
                  <p className="text-gray-600">AI 生成的完整 3D 模型，包含背景</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">透明 3D</h4>
                  <p className="text-gray-600">自动去除背景的 3D 模型，可用于各种创意设计</p>
                </div>
              </div>
            </div>
            
            <div className="pt-6">
              <button
                onClick={() => document.getElementById('uploader')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                立即体验
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}