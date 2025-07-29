"use client"

import { CheckCircle, Upload, Sparkles, Download, Share2, Palette, MapPin, Layers, Eye } from "lucide-react"

interface Step {
  number: number
  title: string
  description: string
  icon: any
  image: string
  highlights?: string[]
}

const steps: Step[] = [
  {
    number: 1,
    title: "选择风格与上传",
    description: "选择你喜欢的 3D 风格（粘土、卡通、写实等），然后上传一张清晰的照片",
    icon: Palette,
    image: "/demo/original-placeholder.svg",
    highlights: ["多种风格可选", "支持 JPG/PNG", "无文件大小限制"]
  },
  {
    number: 2,
    title: "AI 生成 3D 模型",
    description: "AI 根据你的照片和选择的风格，生成独特的 3D 头像",
    icon: Sparkles,
    image: "/demo/3d-model-placeholder.svg",
    highlights: ["智能识别面部特征", "保留个人特色", "30-60秒快速生成"]
  },
  {
    number: 3,
    title: "自动去除背景",
    description: "系统自动将 3D 模型的背景去除，生成透明背景的 PNG 图片",
    icon: Layers,
    image: "/demo/transparent-3d-placeholder.svg",
    highlights: ["自动抠图", "保留细节", "透明背景"]
  },
  {
    number: 4,
    title: "合成效果预览",
    description: "将透明 3D 头像合成到原图上，可选择 4 个不同位置",
    icon: MapPin,
    image: "/demo/composite-placeholder.svg",
    highlights: ["四个位置可选", "实时预览", "完美融合"]
  },
  {
    number: 5,
    title: "多视图保存",
    description: "提供 4 种视图供你选择：合成效果、原图、3D 模型、透明 3D",
    icon: Eye,
    image: "/demo/composite-placeholder.svg",
    highlights: ["一键切换视图", "分别保存", "高清输出"]
  },
]

export default function Steps() {
  return (
    <section id="steps" className="py-20 bg-gradient-to-b from-orange-50 to-pink-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">如何制作你的专属 3D Emoji</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            简单 5 步，让 AI 为你创造独一无二的 3D 海岛风格表情包
          </p>
        </div>

        <div className="space-y-16">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`flex flex-col lg:flex-row items-center gap-12 ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
            >
              {/* Content */}
              <div className="flex-1 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {step.number}
                  </div>
                  <step.icon className="w-8 h-8 text-orange-500" />
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-gray-800">{step.title}</h3>

                <p className="text-lg text-gray-600 leading-relaxed">{step.description}</p>

                {/* 显示亮点 */}
                {step.highlights && (
                  <div className="flex flex-wrap gap-3 mt-4">
                    {step.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-gray-700">{highlight}</span>
                      </div>
                    ))}
                  </div>
                )}

                {step.number === 5 && (
                  <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 text-green-700 font-semibold">
                      <CheckCircle className="w-5 h-5" />
                      <span>完成！开始享受你的专属 3D Emoji</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Image */}
              <div className="flex-1">
                <div className="relative group">
                  <img
                    src={step.image || "/placeholder.svg"}
                    alt={step.title}
                    className="w-full h-80 object-cover rounded-2xl shadow-2xl transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent rounded-2xl"></div>
                  
                  {/* 步骤编号悬浮 */}
                  <div className="absolute top-4 right-4 w-16 h-16 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">
                      {step.number}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA 按钮 */}
        <div className="mt-16 text-center">
          <button 
            onClick={() => document.getElementById('uploader')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white text-lg font-semibold rounded-full shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <Sparkles className="w-6 h-6" />
            立即开始制作
          </button>
        </div>
      </div>
    </section>
  )
}