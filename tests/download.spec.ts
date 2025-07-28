import { test, expect } from '@playwright/test'
import path from 'path'

test.describe('Direct Download Feature', () => {
  test('should download image directly without requiring email/wechat', async ({ page }) => {
    // Start the dev server or use existing URL
    // Try port 3000 first, then 3001 if that's in use
    try {
      await page.goto('http://localhost:3000')
    } catch {
      await page.goto('http://localhost:3001')
    }
    
    // Wait for page to load
    await page.waitForLoadState('networkidle')
    
    // Find and click the file input through the dropzone
    const fileInput = page.locator('input[type="file"]')
    
    // Create a test image file path
    const testImagePath = path.join(__dirname, 'test-image.jpg')
    
    // Set up download promise before triggering download
    const downloadPromise = page.waitForEvent('download')
    
    // Upload a test image
    await fileInput.setInputFiles(testImagePath)
    
    // Wait for the upload and generation to complete
    // In demo mode, this should take about 3 seconds
    await page.waitForTimeout(4000)
    
    // Check that the result is displayed
    await expect(page.locator('text=你的专属 3D Emoji 已生成！')).toBeVisible()
    
    // Find and click the save button
    const saveButton = page.locator('button:has-text("保存到相册")')
    await expect(saveButton).toBeVisible()
    
    // Click the save button
    await saveButton.click()
    
    // Verify no modal appears (no email/wechat form)
    await expect(page.locator('text=获取你的 3D Emoji')).not.toBeVisible()
    await expect(page.locator('input[placeholder="your@email.com"]')).not.toBeVisible()
    await expect(page.locator('input[placeholder="你的微信号"]')).not.toBeVisible()
    
    // Wait for download to complete
    const download = await downloadPromise
    
    // Verify download filename
    expect(download.suggestedFilename()).toBe('3d-emoji-sticker.png')
    
    // Optionally save the download to verify it works
    const downloadPath = path.join(__dirname, 'downloads', download.suggestedFilename())
    await download.saveAs(downloadPath)
    
    console.log('Download completed successfully without requiring user information!')
  })
  
  test('should show placeholder image in demo mode', async ({ page }) => {
    try {
      await page.goto('http://localhost:3000')
    } catch {
      await page.goto('http://localhost:3001')
    }
    
    // Upload a test image
    const fileInput = page.locator('input[type="file"]')
    const testImagePath = path.join(__dirname, 'test-image.jpg')
    await fileInput.setInputFiles(testImagePath)
    
    // Wait for demo mode processing
    await page.waitForTimeout(4000)
    
    // Check that result contains placeholder URL (demo mode)
    const resultImage = page.locator('img[alt="3D Emoji 效果"]')
    await expect(resultImage).toBeVisible()
    
    const imageSrc = await resultImage.getAttribute('src')
    expect(imageSrc).toContain('placeholder.svg')
  })
})