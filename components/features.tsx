"use client"

import { Zap, Shield, Palette, Download, Sparkles, Globe } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "极速生成",
    description: "30-60秒内完成从照片到3D Emoji的全部转换",
    gradient: "from-yellow-400 to-orange-500"
  },
  {
    icon: Palette,
    title: "多样风格",
    description: "8种预设风格任你选择，从粘土到动漫，总有一款适合你",
    gradient: "from-purple-400 to-pink-500"
  },
  {
    icon: Shield,
    title: "隐私安全",
    description: "照片仅用于生成，处理后立即删除，保护你的隐私",
    gradient: "from-green-400 to-blue-500"
  },
  {
    icon: Download,
    title: "高清输出",
    description: "支持透明背景PNG格式，适合各种创意用途",
    gradient: "from-blue-400 to-indigo-500"
  },
  {
    icon: Sparkles,
    title: "AI 智能",
    description: "先进的AI技术，精准识别面部特征，保留个人特色",
    gradient: "from-pink-400 to-red-500"
  },
  {
    icon: Globe,
    title: "跨平台使用",
    description: "生成的3D Emoji可用于社交媒体、聊天软件等各种场景",
    gradient: "from-indigo-400 to-purple-500"
  }
]

export default function Features() {
  return (
    <section id="features" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            为什么选择我们的 3D Emoji？
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            强大的功能，简单的操作，让每个人都能轻松创建专属的 3D 形象
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* 背景装饰 */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white rounded-2xl opacity-50"></div>
              
              <div className="relative z-10">
                {/* 图标 */}
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                {/* 内容 */}
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
                
                {/* 悬停效果装饰 */}
                <div className={`absolute -top-2 -right-2 w-24 h-24 bg-gradient-to-br ${feature.gradient} rounded-full opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-300`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* 统计数据 */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              10K+
            </div>
            <p className="text-gray-600 mt-2">用户创建</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
              30秒
            </div>
            <p className="text-gray-600 mt-2">平均生成时间</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
              8种
            </div>
            <p className="text-gray-600 mt-2">风格选择</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              100%
            </div>
            <p className="text-gray-600 mt-2">隐私保护</p>
          </div>
        </div>
      </div>
    </section>
  )
}