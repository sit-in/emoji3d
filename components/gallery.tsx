"use client"

import { useState } from "react"
import { X, ZoomIn } from "lucide-react"
import { Button } from "@/components/ui/button"

// 使用我们批量生成的真实AI效果 - 只显示合成效果
const galleryItems = [
  {
    id: 1,
    image: "/demo-gallery/demo-1/composite.png",
    title: "清新女孩风格",
  },
  {
    id: 2,
    image: "/demo-gallery/demo-2/composite.png",
    title: "阳光男孩风格",
  },
  {
    id: 3,
    image: "/demo-gallery/demo-3/composite.png",
    title: "时尚女性风格",
  },
  {
    id: 4,
    image: "/demo-gallery/demo-4/composite.png",
    title: "专业形象风格",
  },
  {
    id: 5,
    image: "/demo-gallery/demo-5/composite.png",
    title: "优雅女士风格",
  },
  {
    id: 6,
    image: "/demo-gallery/demo-6/composite.png",
    title: "自信女性风格",
  },
  {
    id: 7,
    image: "/demo-gallery/demo-7/composite.png",
    title: "魅力女郎风格",
  },
]

export default function Gallery() {
  const [selectedItem, setSelectedItem] = useState<(typeof galleryItems)[0] | null>(null)

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">效果展示</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            看看 AI 将普通照片转换成惊艳的 3D 海岛风格 Emoji 后的合成效果
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {galleryItems.map((item) => (
            <div key={item.id} className="break-inside-avoid">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative group cursor-pointer" onClick={() => setSelectedItem(item)}>
                  {/* Composite Image */}
                  <div className="relative">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={`${item.title}`}
                      className="w-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      AI 效果
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 text-center">{item.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white"
              onClick={() => setSelectedItem(null)}
            >
              <X className="w-6 h-6" />
            </Button>

            <div className="relative">
              <img
                src={selectedItem.image || "/placeholder.svg"}
                alt={selectedItem.title}
                className="w-full h-auto object-contain max-h-[80vh]"
              />
              <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-full font-medium">
                AI 生成效果
              </div>
            </div>

            <div className="p-6 text-center">
              <h3 className="text-2xl font-bold text-gray-800">{selectedItem.title}</h3>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
