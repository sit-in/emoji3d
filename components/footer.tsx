"use client"

import { MessageCircle, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
              3D Emoji 生成器
            </h3>
            <p className="text-gray-400 leading-relaxed">
              用 AI 技术将你的照片转换成独特的 3D 海岛风格 Emoji 贴纸，让表达更有趣。
            </p>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">关注我们</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors"
                aria-label="微信"
              >
                <span suppressHydrationWarning><MessageCircle className="w-5 h-5" /></span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                aria-label="小红书"
              >
                <span suppressHydrationWarning><Instagram className="w-5 h-5" /></span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                aria-label="Twitter"
              >
                <span suppressHydrationWarning><Twitter className="w-5 h-5" /></span>
              </a>
            </div>
            <div className="space-y-2 text-sm text-gray-400">
              <p>微信：emoji3d_official</p>
              <p>小红书：@3D表情包生成器</p>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">法律信息</h4>
            <div className="space-y-2">
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                隐私政策
              </a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                服务条款
              </a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                用户协议
              </a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                联系我们
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Emoji 3D Sticker 项目组. 保留所有权利.</p>
          <p className="mt-2 text-sm">Powered by AI • Made with ❤️ in China</p>
        </div>
      </div>
    </footer>
  )
}
