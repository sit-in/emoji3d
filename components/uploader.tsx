"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload, ImageIcon, Loader2, Download, AlertCircle, Info } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface GeneratedResult {
  url: string
  originalImage: string
  demoMode?: boolean
}

export default function Uploader() {
  const [isUploading, setIsUploading] = useState(false)
  const [result, setResult] = useState<GeneratedResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [selectedStyle, setSelectedStyle] = useState("Clay")
  const [customPrompt, setCustomPrompt] = useState("")

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    // Clear previous error
    setError(null)

    // Validate file type and size
    if (!file.type.match(/^image\/(jpeg|jpg|png)$/)) {
      setError("请上传 JPG 或 PNG 格式的图片")
      return
    }

    if (file.size > 4 * 1024 * 1024) {
      setError("图片大小不能超过 4MB")
      return
    }

    setIsUploading(true)

    try {
      // Create preview URL for original image
      const originalImageUrl = URL.createObjectURL(file)

      // Call the API with timeout
      const formData = new FormData()
      formData.append("image", file)
      formData.append("style", selectedStyle)
      if (customPrompt.trim()) {
        formData.append("prompt", customPrompt.trim())
      }

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 120000) // 2 minute timeout

      const response = await fetch("/api/generate", {
        method: "POST",
        body: formData,
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}: 生成失败`)
      }

      setResult({
        url: data.output_url,
        originalImage: originalImageUrl,
        demoMode: data.demo_mode || false,
      })

      // Track upload event
      if (typeof window !== "undefined" && (window as any).va) {
        ;(window as any).va.track("upload_success", { demo_mode: data.demo_mode })
      }
    } catch (error) {
      console.error("Upload error:", error)

      let errorMessage = "生成失败，请重试"

      if (error instanceof Error) {
        if (error.name === "AbortError") {
          errorMessage = "请求超时，请重试"
        } else {
          errorMessage = error.message
        }
      }

      setError(errorMessage)

      // Track error event
      if (typeof window !== "undefined" && (window as any).va) {
        ;(window as any).va.track("upload_error", { error: errorMessage })
      }
    } finally {
      setIsUploading(false)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
    maxFiles: 1,
    disabled: isUploading,
  })

  const handleSaveToAlbum = () => {
    if (result?.url) {
      const link = document.createElement("a")
      link.href = result.url
      link.download = "3d-emoji-sticker.png"
      link.click()
    }
  }


  const handleRetry = () => {
    setError(null)
    setResult(null)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-pink-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">开始制作你的 3D Emoji</h2>
          <p className="text-xl text-gray-600">上传一张照片，让 AI 为你创造独特的 3D 海岛风格贴纸</p>
        </div>


        {/* Error Alert */}
        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              {error}
              <Button variant="link" className="ml-2 p-0 h-auto text-red-600 underline" onClick={handleRetry}>
                重试
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Style Selection */}
        {!isUploading && !result && (
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="style-select">选择 3D 风格</Label>
                  <Select value={selectedStyle} onValueChange={setSelectedStyle}>
                    <SelectTrigger id="style-select" className="w-full mt-2">
                      <SelectValue placeholder="选择风格" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Clay">粘土风格 (Clay)</SelectItem>
                      <SelectItem value="3D Cartoon">3D 卡通风格</SelectItem>
                      <SelectItem value="Realistic">写实风格</SelectItem>
                      <SelectItem value="Watercolor">水彩风格</SelectItem>
                      <SelectItem value="Oil Painting">油画风格</SelectItem>
                      <SelectItem value="Line Drawing">线条素描</SelectItem>
                      <SelectItem value="Anime">动漫风格</SelectItem>
                      <SelectItem value="Pixel Art">像素风格</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="custom-prompt">自定义描述（可选）</Label>
                  <Input
                    id="custom-prompt"
                    type="text"
                    placeholder="例如：可爱的海岛风格，明亮的色彩"
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    className="mt-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">留空将使用默认的热带岛屿风格</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {!result ? (
          <Card className="border-2 border-dashed border-gray-300 hover:border-orange-400 transition-colors">
            <CardContent className="p-12">
              <div
                {...getRootProps()}
                className={`text-center cursor-pointer transition-all duration-300 ${
                  isDragActive ? "scale-105" : ""
                } ${isUploading ? "pointer-events-none opacity-50" : ""}`}
              >
                <input {...getInputProps()} />

                {isUploading ? (
                  <div className="space-y-6">
                    <Loader2 className="w-16 h-16 text-orange-500 mx-auto animate-spin" />
                    <div className="space-y-2">
                      <h3 className="text-2xl font-semibold text-gray-800">AI 正在生成你的 3D Emoji...</h3>
                      <p className="text-gray-600">演示模式：模拟生成过程，请稍候</p>
                      <p className="text-sm text-gray-500">实际部署时将使用真实的 3D 建模技术</p>
                    </div>

                    {/* Loading animation */}
                    <div className="flex justify-center space-x-2">
                      <div
                        className="w-3 h-3 bg-orange-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0s" }}
                      ></div>
                      <div
                        className="w-3 h-3 bg-pink-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="w-24 h-24 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center mx-auto">
                      <Upload className="w-12 h-12 text-white" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-2xl font-semibold text-gray-800">
                        {isDragActive ? "放开文件开始上传" : "拖拽图片到这里，或点击选择"}
                      </h3>
                      <p className="text-gray-600">支持 JPG、PNG 格式，文件大小不超过 4MB</p>
                    </div>

                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 py-3"
                    >
                      <ImageIcon className="w-5 h-5 mr-2" />
                      选择图片
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">

            {/* Result Display */}
            <Card className="overflow-hidden shadow-2xl">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2">
                  <div className="relative">
                    <img
                      src={result.originalImage || "/placeholder.svg"}
                      alt="原图"
                      className="w-full h-80 object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                      原图
                    </div>
                  </div>

                  <div className="relative">
                    <img
                      src={result.url || "/placeholder.svg"}
                      alt="3D Emoji 效果"
                      className="w-full h-80 object-cover"
                      onError={(e) => {
                        console.error("Failed to load generated image")
                        if (!result.demoMode) {
                          setError("生成的图片加载失败，请重试")
                        }
                      }}
                    />
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm">
                      3D 效果
                    </div>
                  </div>
                </div>

                <div className="p-8 text-center bg-gradient-to-r from-orange-50 to-pink-50">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    🎉 你的专属 3D Emoji 已生成！
                  </h3>
                  <p className="text-gray-600 mb-6">
                    喜欢这个效果吗？保存到相册或分享给朋友吧！
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      onClick={handleSaveToAlbum}
                      size="lg"
                      className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      保存到相册
                    </Button>

                    <Button
                      onClick={() => setResult(null)}
                      variant="outline"
                      size="lg"
                      className="border-orange-300 text-orange-600 hover:bg-orange-50 px-8"
                    >
                      <Upload className="w-5 h-5 mr-2" />
                      制作新的
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

      </div>
    </section>
  )
}
