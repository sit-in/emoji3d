import { test, expect } from '@playwright/test';

test.describe('3D Emoji Generator - Images', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load all images correctly', async ({ page }) => {
    // 等待页面加载
    await page.waitForLoadState('networkidle');

    // 测试Hero部分的装饰emoji是否显示
    const heroSection = page.locator('section').first();
    await expect(heroSection).toBeVisible();
    
    // 检查装饰emoji
    const decorativeEmojis = ['🏝️', '🌺', '🥥', '🌴'];
    for (const emoji of decorativeEmojis) {
      await expect(page.locator(`text=${emoji}`)).toBeVisible();
    }
  });

  test('should display all step images', async ({ page }) => {
    // 滚动到steps部分
    await page.locator('#steps').scrollIntoViewIfNeeded();
    
    // 检查所有5个步骤的图片
    const stepImages = await page.locator('#steps img').all();
    expect(stepImages).toHaveLength(5);
    
    for (const img of stepImages) {
      await expect(img).toBeVisible();
      
      // 验证图片已加载
      const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
      expect(naturalWidth).toBeGreaterThan(0);
      
      // 验证图片URL
      const src = await img.getAttribute('src');
      expect(src).toBeTruthy();
      expect(src).toMatch(/https:\/\/api\.dicebear\.com/);
    }
  });

  test('should display gallery before/after images', async ({ page }) => {
    // 滚动到Gallery部分
    await page.locator('text=效果展示').scrollIntoViewIfNeeded();
    
    // 等待图片加载
    await page.waitForTimeout(1000);
    
    // 检查gallery图片
    const galleryImages = await page.locator('section:has-text("效果展示") img').all();
    
    // 应该有12张图片（6组 x 2张）
    expect(galleryImages.length).toBeGreaterThanOrEqual(12);
    
    let beforeCount = 0;
    let afterCount = 0;
    
    for (const img of galleryImages) {
      await expect(img).toBeVisible();
      
      // 检查图片是否加载成功
      const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
      expect(naturalWidth).toBeGreaterThan(0);
      
      // 检查alt文本
      const alt = await img.getAttribute('alt');
      if (alt?.includes('原图')) beforeCount++;
      if (alt?.includes('3D效果')) afterCount++;
    }
    
    // 验证有相同数量的before和after图片
    expect(beforeCount).toBe(6);
    expect(afterCount).toBe(6);
  });

  test('should handle image click in gallery', async ({ page }) => {
    // 滚动到Gallery部分
    await page.locator('text=效果展示').scrollIntoViewIfNeeded();
    
    // 点击第一个gallery项目
    const firstGalleryItem = page.locator('.group').first();
    await firstGalleryItem.click();
    
    // 检查lightbox是否打开
    const lightbox = page.locator('.fixed.inset-0.bg-black\\/80');
    await expect(lightbox).toBeVisible();
    
    // 检查lightbox中的图片
    const lightboxImages = await lightbox.locator('img').all();
    expect(lightboxImages).toHaveLength(2);
    
    // 关闭lightbox
    await page.locator('button:has(svg)').first().click();
    await expect(lightbox).not.toBeVisible();
  });

  test('should have correct image styling', async ({ page }) => {
    // 检查Steps部分的图片样式
    await page.locator('#steps').scrollIntoViewIfNeeded();
    
    const stepImage = page.locator('#steps img').first();
    const className = await stepImage.getAttribute('class');
    expect(className).toContain('rounded-2xl');
    expect(className).toContain('shadow-2xl');
    
    // 检查Gallery部分的图片样式
    await page.locator('text=效果展示').scrollIntoViewIfNeeded();
    
    const galleryImage = page.locator('section:has-text("效果展示") img').first();
    const galleryClassName = await galleryImage.getAttribute('class');
    expect(galleryClassName).toContain('object-cover');
  });

  test('should display correct labels on images', async ({ page }) => {
    // 检查Gallery部分的标签
    await page.locator('text=效果展示').scrollIntoViewIfNeeded();
    
    // 检查"原图"标签
    const beforeLabels = page.locator('.bg-black\\/70:has-text("原图")');
    await expect(beforeLabels.first()).toBeVisible();
    
    // 检查"3D 效果"标签
    const afterLabels = page.locator('.bg-gradient-to-r:has-text("3D 效果")');
    await expect(afterLabels.first()).toBeVisible();
  });

  test('visual regression - check page layout', async ({ page }) => {
    // 等待所有图片加载
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // 截图整个页面
    await expect(page).toHaveScreenshot('homepage-full.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
    
    // 截图各个部分
    await expect(page.locator('#steps')).toHaveScreenshot('steps-section.png');
    await expect(page.locator('section:has-text("效果展示")')).toHaveScreenshot('gallery-section.png');
  });
});