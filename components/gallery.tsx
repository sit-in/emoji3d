"use client"

import { useState } from "react"
import { X, ZoomIn } from "lucide-react"
import { Button } from "@/components/ui/button"

const galleryItems = [
  {
    id: 1,
    before: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&q=80",
    after: "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=girl&backgroundColor=b6e3f4&hairColor=d2b48c",
    title: "清新女孩风格",
  },
  {
    id: 2,
    before: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&q=80",
    after: "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=boy&backgroundColor=c0aede&hairColor=5e4238",
    title: "阳光男孩风格",
  },
  {
    id: 3,
    before: "https://images.unsplash.com/photo-1609205807107-454f3de9c8c2?w=300&h=350&fit=crop&q=80",
    after: "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=kid&backgroundColor=ffdfba&hairColor=f9c9b6",
    title: "可爱儿童风格",
  },
  {
    id: 4,
    before: "https://images.unsplash.com/photo-1566616213894-2d4e1baee5d8?w=300&h=300&fit=crop&q=80",
    after: "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=elder&backgroundColor=d4f4dd&hairColor=d2d2d2",
    title: "温暖长者风格",
  },
  {
    id: 5,
    before: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=380&fit=crop&q=80",
    after: "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=student&backgroundColor=ffd5ff&hairColor=8b4513",
    title: "青春学生风格",
  },
  {
    id: 6,
    before: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=320&fit=crop&q=80",
    after: "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=curly&backgroundColor=ffc0cb&hairColor=4b0082",
    title: "自然卷发风格",
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
            看看其他用户是如何将普通照片转换成惊艳的 3D 海岛风格 Emoji
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {galleryItems.map((item) => (
            <div key={item.id} className="break-inside-avoid">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative group cursor-pointer" onClick={() => setSelectedItem(item)}>
                  {/* Before Image */}
                  <div className="relative">
                    <img
                      src={item.before || "/placeholder.svg"}
                      alt={`${item.title} - 原图`}
                      className="w-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                      原图
                    </div>
                  </div>

                  {/* After Image */}
                  <div className="relative">
                    <img
                      src={item.after || "/placeholder.svg"}
                      alt={`${item.title} - 3D效果`}
                      className="w-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      3D 效果
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

            <div className="grid md:grid-cols-2">
              <div className="relative">
                <img
                  src={selectedItem.before || "/placeholder.svg"}
                  alt="原图"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-black/70 text-white px-4 py-2 rounded-full font-medium">
                  原图
                </div>
              </div>

              <div className="relative">
                <img
                  src={selectedItem.after || "/placeholder.svg"}
                  alt="3D效果"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-full font-medium">
                  3D 效果
                </div>
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
