"use client"

import { CheckCircle, Upload, Sparkles, Download, Share2 } from "lucide-react"

const steps = [
  {
    number: 1,
    title: "上传照片",
    description: "选择一张清晰的人脸照片，支持 JPG/PNG 格式",
    icon: Upload,
    image: "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=upload&backgroundColor=ffdfbf",
  },
  {
    number: 2,
    title: "AI 智能识别",
    description: "我们的 AI 会自动识别面部特征和表情",
    icon: Sparkles,
    image: "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=ai-scan&backgroundColor=ffd5ff",
  },
  {
    number: 3,
    title: "3D 建模生成",
    description: "基于海岛风格，生成独特的 3D Emoji 贴纸",
    icon: CheckCircle,
    image: "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=3d-model&backgroundColor=c1ffc1",
  },
  {
    number: 4,
    title: "预览效果",
    description: "实时预览生成的 3D 贴纸效果，确保满意",
    icon: Download,
    image: "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=preview&backgroundColor=c5e1ff",
  },
  {
    number: 5,
    title: "保存分享",
    description: "一键保存到相册，或直接分享到社交平台",
    icon: Share2,
    image: "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=share&backgroundColor=ffc5d9",
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

                {step.number === 5 && (
                  <div className="flex items-center gap-2 text-green-600 font-semibold">
                    <CheckCircle className="w-5 h-5" />
                    <span>完成！开始享受你的专属 3D Emoji</span>
                  </div>
                )}
              </div>

              {/* Image */}
              <div className="flex-1">
                <div className="relative">
                  <img
                    src={step.image || "/placeholder.svg"}
                    alt={step.title}
                    className="w-full h-64 object-cover rounded-2xl shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
