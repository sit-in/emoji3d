const { chromium } = require('@playwright/test');
const { spawn } = require('child_process');

async function waitForServer(url, timeout = 30000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    try {
      const response = await fetch(url);
      if (response.ok) return true;
    } catch (e) {
      // Server not ready yet
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  throw new Error('Server failed to start');
}

(async () => {
  console.log('启动开发服务器...');
  const server = spawn('npm', ['run', 'dev'], { 
    stdio: 'pipe',
    shell: true 
  });
  
  try {
    // 等待服务器启动
    await waitForServer('http://localhost:3003');
    console.log('✓ 服务器已启动');
    
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();
    
    console.log('\n开始测试...\n');
    
    // 基础测试
    await page.goto('http://localhost:3003');
    console.log('✓ 页面加载成功');
    
    // 检查主要元素
    const title = await page.locator('h2:text("开始制作你的 3D Emoji")').isVisible();
    console.log('✓ 标题显示:', title ? '正确' : '错误');
    
    const styleLabel = await page.locator('text=选择 3D 风格').isVisible();
    console.log('✓ 风格选择器:', styleLabel ? '存在' : '不存在');
    
    const uploadArea = await page.locator('text=拖拽图片到这里，或点击选择').isVisible();
    console.log('✓ 上传区域:', uploadArea ? '正常' : '异常');
    
    // 测试风格选择
    await page.click('[id="style-select"]');
    await page.waitForTimeout(500);
    
    const styleOptions = await page.locator('text=动漫风格').count();
    console.log('✓ 风格选项:', styleOptions > 0 ? '可用' : '不可用');
    
    if (styleOptions > 0) {
      await page.click('text=动漫风格');
      const selectedStyle = await page.locator('[id="style-select"]').textContent();
      console.log('✓ 选择风格:', selectedStyle);
    }
    
    // 测试自定义描述输入
    await page.fill('[id="custom-prompt"]', '测试描述');
    const customValue = await page.locator('[id="custom-prompt"]').inputValue();
    console.log('✓ 自定义描述:', customValue === '测试描述' ? '输入成功' : '输入失败');
    
    // 测试文件上传
    console.log('\n测试文件上传...');
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles({
      name: 'test.jpg',
      mimeType: 'image/jpeg',
      buffer: Buffer.from('test-image-data')
    });
    
    // 等待上传响应
    try {
      await page.waitForSelector('text=AI 正在生成你的 3D Emoji...', { timeout: 5000 });
      console.log('✓ 上传成功，开始生成');
      
      await page.waitForSelector('text=演示 3D Emoji 已生成！', { timeout: 15000 });
      console.log('✓ 生成完成！');
      
      // 检查结果
      const saveButton = await page.locator('button:has-text("体验保存功能")').isVisible();
      console.log('✓ 保存按钮:', saveButton ? '显示' : '未显示');
      
      const newButton = await page.locator('button:has-text("制作新的")').isVisible();
      console.log('✓ 重做按钮:', newButton ? '显示' : '未显示');
      
    } catch (e) {
      console.log('✗ 上传或生成失败:', e.message);
    }
    
    // 保存截图
    await page.screenshot({ path: 'test-screenshot.png', fullPage: true });
    console.log('\n✓ 测试截图已保存: test-screenshot.png');
    
    await browser.close();
    console.log('\n测试完成！');
    
  } catch (error) {
    console.error('\n测试过程中出错:', error.message);
  } finally {
    // 关闭服务器
    server.kill();
    process.exit(0);
  }
})();