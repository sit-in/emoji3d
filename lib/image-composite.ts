import sharp from 'sharp'

export interface CompositeOptions {
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right' | 'auto'
  scale?: number // 0.1 - 0.5
  padding?: number // pixels from edge
}

export async function compositeImages(
  originalImageBuffer: Buffer,
  model3DImageBuffer: Buffer,
  options: CompositeOptions = {}
): Promise<Buffer> {
  try {
    // 获取原图尺寸
    const originalMetadata = await sharp(originalImageBuffer).metadata()
    const { width: originalWidth = 800, height: originalHeight = 800 } = originalMetadata

    // 计算3D图像的目标尺寸
    const scale = options.scale || 0.25 // 默认改为1/4，减少遮挡
    const padding = options.padding || 20 // 边缘间距
    const position = options.position || 'bottom-right' // 默认右下角
    
    // 3D图像尺寸：更小以避免遮挡
    const model3DTargetHeight = Math.round(originalHeight * scale * 1.5) // 高度
    const model3DTargetWidth = Math.round(originalWidth * scale * 1.5)   // 宽度

    // 调整3D图像大小，保持透明背景
    const resized3DImage = await sharp(model3DImageBuffer)
      .resize(model3DTargetWidth, model3DTargetHeight, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 } // 完全透明
      })
      .png() // 确保输出为PNG格式以保持透明度
      .toBuffer()

    // 根据位置参数计算放置坐标
    let left = padding
    let top = padding
    
    switch (position) {
      case 'bottom-right':
        left = originalWidth - model3DTargetWidth - padding
        top = originalHeight - model3DTargetHeight - padding
        break
      case 'bottom-left':
        left = padding
        top = originalHeight - model3DTargetHeight - padding
        break
      case 'top-right':
        left = originalWidth - model3DTargetWidth - padding
        top = padding
        break
      case 'top-left':
        left = padding
        top = padding
        break
      case 'auto':
        // 智能定位：默认右下角，之后可以加入人脸检测
        left = originalWidth - model3DTargetWidth - padding
        top = originalHeight - model3DTargetHeight - padding
        break
    }
    
    // 合成图像，确保保持透明度
    const compositeImage = await sharp(originalImageBuffer)
      .composite([{
        input: resized3DImage,
        left: Math.round(left),
        top: Math.round(top),
        blend: 'over' // 使用over模式保持透明度
      }])
      .png() // 输出为PNG格式
      .toBuffer()

    return compositeImage
  } catch (error) {
    console.error('图像合成失败:', error)
    throw new Error('Failed to composite images')
  }
}

// 从URL下载图像
export async function downloadImage(url: string): Promise<Buffer> {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to download image: ${response.status}`)
    }
    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    
    // 确保图像是PNG格式以保持透明度
    // 如果不是PNG，转换为PNG
    const processedBuffer = await sharp(buffer)
      .png() // 转换为PNG以保持透明度
      .toBuffer()
    
    return processedBuffer
  } catch (error) {
    console.error('下载图像失败:', error)
    throw new Error('Failed to download image')
  }
}