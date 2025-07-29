"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function TestUpload() {
  const [status, setStatus] = useState('')
  const [result, setResult] = useState<any>(null)

  const testUpload = async () => {
    setStatus('开始测试...')
    
    try {
      // 使用一个测试图片URL
      const testImageUrl = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400'
      
      // 下载图片
      setStatus('下载测试图片...')
      const response = await fetch(testImageUrl)
      const blob = await response.blob()
      const file = new File([blob], 'test-portrait.jpg', { type: 'image/jpeg' })
      
      // 创建FormData
      const formData = new FormData()
      formData.append('image', file)
      formData.append('style', 'Clay')
      formData.append('position', 'bottom-right')
      
      // 发送请求
      setStatus('发送请求到API...')
      const apiResponse = await fetch('/api/generate', {
        method: 'POST',
        body: formData
      })
      
      const data = await apiResponse.json()
      setResult(data)
      
      if (apiResponse.ok) {
        setStatus('✅ 测试成功！')
      } else {
        setStatus('❌ 测试失败: ' + (data.error || '未知错误'))
      }
    } catch (error) {
      setStatus('❌ 错误: ' + error.message)
    }
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">API 测试页面</h1>
      
      <Button onClick={testUpload} className="mb-4">
        测试上传功能
      </Button>
      
      <div className="space-y-4">
        <div>
          <h2 className="font-semibold">状态:</h2>
          <p>{status}</p>
        </div>
        
        {result && (
          <div>
            <h2 className="font-semibold">结果:</h2>
            <pre className="bg-gray-100 p-4 rounded overflow-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
            
            {result.composite_url && (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">合成效果:</h3>
                <img 
                  src={result.composite_url} 
                  alt="合成效果" 
                  className="max-w-md border rounded"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}