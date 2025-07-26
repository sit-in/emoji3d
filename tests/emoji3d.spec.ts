import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('3D Emoji Generator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3003');
  });

  test('应该正确显示页面标题和说明', async ({ page }) => {
    // 检查主标题
    await expect(page.locator('h2:text("开始制作你的 3D Emoji")')).toBeVisible();
    
    // 检查说明文字
    await expect(page.locator('text=上传一张照片，让 AI 为你创造独特的 3D 风格贴纸')).toBeVisible();
  });

  test('应该显示演示模式提示', async ({ page }) => {
    // 检查演示模式提示
    await expect(page.locator('text=演示模式：')).toBeVisible();
  });

  test('应该显示风格选择器', async ({ page }) => {
    // 检查风格选择标签
    await expect(page.locator('text=选择 3D 风格')).toBeVisible();
    
    // 点击风格选择器
    await page.click('[id="style-select"]');
    
    // 验证风格选项
    const styles = [
      '粘土风格 (Clay)',
      '3D 卡通风格',
      '写实风格',
      '水彩风格',
      '油画风格',
      '线条素描',
      '动漫风格',
      '像素风格'
    ];
    
    for (const style of styles) {
      await expect(page.locator(`text="${style}"`)).toBeVisible();
    }
  });

  test('应该能够选择不同的风格', async ({ page }) => {
    // 点击风格选择器
    await page.click('[id="style-select"]');
    
    // 选择动漫风格
    await page.click('text=动漫风格');
    
    // 验证选择已更新
    await expect(page.locator('[id="style-select"]')).toContainText('动漫风格');
  });

  test('应该能够输入自定义描述', async ({ page }) => {
    // 找到自定义描述输入框
    const customPromptInput = page.locator('[id="custom-prompt"]');
    
    // 输入自定义描述
    await customPromptInput.fill('可爱的卡通形象，明亮的色彩');
    
    // 验证输入内容
    await expect(customPromptInput).toHaveValue('可爱的卡通形象，明亮的色彩');
  });

  test('应该显示上传区域', async ({ page }) => {
    // 检查上传提示文字
    await expect(page.locator('text=拖拽图片到这里，或点击选择')).toBeVisible();
    
    // 检查文件格式说明
    await expect(page.locator('text=支持 JPG、PNG 格式，文件大小不超过 4MB')).toBeVisible();
    
    // 检查上传按钮
    await expect(page.locator('button:has-text("选择图片")')).toBeVisible();
  });

  test('应该能够上传图片', async ({ page }) => {
    // 创建一个测试图片文件路径
    const testImagePath = path.join(__dirname, 'test-image.jpg');
    
    // 获取文件输入元素
    const fileInput = page.locator('input[type="file"]');
    
    // 设置测试图片（使用 placeholder 图片进行测试）
    await fileInput.setInputFiles({
      name: 'test-image.jpg',
      mimeType: 'image/jpeg',
      buffer: Buffer.from('fake-image-data')
    });
    
    // 等待上传开始
    await expect(page.locator('text=AI 正在生成你的 3D Emoji...')).toBeVisible({ timeout: 5000 });
    
    // 等待生成完成（演示模式下会在3秒后完成）
    await expect(page.locator('text=演示 3D Emoji 已生成！')).toBeVisible({ timeout: 10000 });
  });

  test('应该在生成完成后显示结果', async ({ page }) => {
    // 先上传一张图片
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles({
      name: 'test-image.jpg',
      mimeType: 'image/jpeg',
      buffer: Buffer.from('fake-image-data')
    });
    
    // 等待生成完成
    await expect(page.locator('text=演示 3D Emoji 已生成！')).toBeVisible({ timeout: 10000 });
    
    // 检查结果展示
    await expect(page.locator('text=原图')).toBeVisible();
    await expect(page.locator('text=演示效果')).toBeVisible();
    
    // 检查操作按钮
    await expect(page.locator('button:has-text("体验保存功能")')).toBeVisible();
    await expect(page.locator('button:has-text("制作新的")')).toBeVisible();
  });

  test('应该能够点击保存按钮并显示表单', async ({ page }) => {
    // 先上传图片并等待生成
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles({
      name: 'test-image.jpg',
      mimeType: 'image/jpeg',
      buffer: Buffer.from('fake-image-data')
    });
    
    await expect(page.locator('text=演示 3D Emoji 已生成！')).toBeVisible({ timeout: 10000 });
    
    // 点击保存按钮
    await page.click('button:has-text("体验保存功能")');
    
    // 验证弹窗出现
    await expect(page.locator('text=获取你的 3D Emoji')).toBeVisible();
    await expect(page.locator('text=留下联系方式，我们会第一时间通知你产品更新')).toBeVisible();
    
    // 验证表单字段
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[placeholder="你的微信号"]')).toBeVisible();
  });

  test('应该能够重新制作', async ({ page }) => {
    // 先上传图片并等待生成
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles({
      name: 'test-image.jpg',
      mimeType: 'image/jpeg',
      buffer: Buffer.from('fake-image-data')
    });
    
    await expect(page.locator('text=演示 3D Emoji 已生成！')).toBeVisible({ timeout: 10000 });
    
    // 点击制作新的
    await page.click('button:has-text("制作新的")');
    
    // 验证返回到上传界面
    await expect(page.locator('text=拖拽图片到这里，或点击选择')).toBeVisible();
  });

  test('应该正确处理错误的文件类型', async ({ page }) => {
    // 上传错误的文件类型
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles({
      name: 'test.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from('text-file-content')
    });
    
    // 验证错误提示
    await expect(page.locator('text=请上传 JPG 或 PNG 格式的图片')).toBeVisible();
  });

  test('应该正确处理超大文件', async ({ page }) => {
    // 创建一个超过4MB的假文件
    const largeBuffer = Buffer.alloc(5 * 1024 * 1024); // 5MB
    
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles({
      name: 'large-image.jpg',
      mimeType: 'image/jpeg',
      buffer: largeBuffer
    });
    
    // 验证错误提示
    await expect(page.locator('text=图片大小不能超过 4MB')).toBeVisible();
  });
});

test.describe('页面其他部分', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3003');
  });

  test('应该显示制作步骤', async ({ page }) => {
    await expect(page.locator('text=制作步骤')).toBeVisible();
    await expect(page.locator('text=上传照片')).toBeVisible();
    await expect(page.locator('text=AI 生成')).toBeVisible();
    await expect(page.locator('text=下载使用')).toBeVisible();
  });

  test('应该显示作品展示', async ({ page }) => {
    await expect(page.locator('text=精选作品展示')).toBeVisible();
  });

  test('应该显示FAQ部分', async ({ page }) => {
    await expect(page.locator('text=常见问题')).toBeVisible();
    
    // 点击第一个FAQ项
    await page.click('text=什么是 3D Emoji 生成器？');
    
    // 验证答案显示
    await expect(page.locator('text=3D Emoji 生成器是一个使用人工智能技术')).toBeVisible();
  });

  test('应该显示页脚信息', async ({ page }) => {
    // 滚动到页脚
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    await expect(page.locator('text=© 2024 3D Emoji Generator.')).toBeVisible();
  });
});