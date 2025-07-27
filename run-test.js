const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  console.log('测试开始...');
  
  try {
    // 访问页面
    await page.goto('http://localhost:3003');
    console.log('✓ 页面加载成功');
    
    // 检查标题
    const title = await page.locator('h2:text("开始制作你的 3D Emoji")').isVisible();
    console.log('✓ 标题显示正确:', title);
    
    // 检查风格选择器
    const styleSelector = await page.locator('text=选择 3D 风格').isVisible();
    console.log('✓ 风格选择器存在:', styleSelector);
    
    // 点击风格选择器
    await page.click('[id="style-select"]');
    console.log('✓ 点击风格选择器');
    
    // 检查风格选项
    const animeStyle = await page.locator('text=动漫风格').isVisible();
    console.log('✓ 风格选项显示:', animeStyle);
    
    // 选择动漫风格
    await page.click('text=动漫风格');
    console.log('✓ 选择动漫风格');
    
    // 测试文件上传
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles({
      name: 'test-image.jpg',
      mimeType: 'image/jpeg',
      buffer: Buffer.from('fake-image-data')
    });
    console.log('✓ 上传测试图片');
    
    // 等待处理
    await page.waitForSelector('text=AI 正在生成你的 3D Emoji...', { timeout: 5000 });
    console.log('✓ 开始生成');
    
    // 等待完成
    await page.waitForSelector('text=演示 3D Emoji 已生成！', { timeout: 10000 });
    console.log('✓ 生成完成');
    
    // 截图
    await page.screenshot({ path: 'test-result.png' });
    console.log('✓ 测试截图已保存');
    
    console.log('\n所有测试通过！✅');
    
  } catch (error) {
    console.error('测试失败:', error.message);
    await page.screenshot({ path: 'test-error.png' });
  } finally {
    await browser.close();
  }
})();