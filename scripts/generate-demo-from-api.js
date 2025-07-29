const fs = require('fs');
const path = require('path');

// 配置
const API_URL = 'http://localhost:3000/api/generate';
const DEMO_DIR = path.join(__dirname, '../public/demo');
const INPUT_IMAGE = path.join(__dirname, '../test-pic.jpg'); // 用户提供的照片

// 确保 demo 目录存在
if (!fs.existsSync(DEMO_DIR)) {
  fs.mkdirSync(DEMO_DIR, { recursive: true });
}

// 下载图片并保存
async function downloadAndSaveImage(url, filename) {
  try {
    // 如果是 base64 数据 URL
    if (url.startsWith('data:')) {
      const base64Data = url.split(',')[1];
      const buffer = Buffer.from(base64Data, 'base64');
      const filePath = path.join(DEMO_DIR, filename);
      fs.writeFileSync(filePath, buffer);
      console.log(`✅ 保存成功: ${filename}`);
      return;
    }

    // 如果是 HTTP URL
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const buffer = await response.arrayBuffer();
    const filePath = path.join(DEMO_DIR, filename);
    fs.writeFileSync(filePath, Buffer.from(buffer));
    console.log(`✅ 保存成功: ${filename}`);
  } catch (error) {
    console.error(`❌ 保存失败 ${filename}:`, error.message);
  }
}

// 主函数
async function generateDemoImages() {
  console.log('🚀 开始生成演示图片...\n');

  // 检查输入图片是否存在
  if (!fs.existsSync(INPUT_IMAGE)) {
    console.error('❌ 输入图片不存在:', INPUT_IMAGE);
    console.log('请确保 test-pic.jpg 文件存在于项目根目录');
    return;
  }

  try {
    // 1. 读取并保存原始图片
    console.log('📸 保存原始图片...');
    const originalBuffer = fs.readFileSync(INPUT_IMAGE);
    fs.writeFileSync(path.join(DEMO_DIR, 'lady-original.jpg'), originalBuffer);
    console.log('✅ 原始图片保存成功\n');

    // 2. 准备 FormData (使用浏览器风格的 FormData)
    const formData = new FormData();
    
    // 读取文件内容
    const fileBuffer = fs.readFileSync(INPUT_IMAGE);
    const blob = new Blob([fileBuffer], { type: 'image/jpeg' });
    
    formData.append('image', blob, 'test-pic.jpg');
    formData.append('style', 'Clay'); // 使用粘土风格
    formData.append('prompt', 'a cute 3D emoji character in island tropical style with vibrant colors');
    formData.append('position', 'bottom-right');

    // 3. 调用 API
    console.log('🎨 调用 API 生成 3D 模型...');
    console.log('这可能需要 30-60 秒，请耐心等待...\n');

    const response = await fetch(API_URL, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`API 错误 (${response.status}): ${error}`);
    }

    const result = await response.json();
    console.log('✅ API 调用成功\n');

    // 检查是否在演示模式
    if (result.demo_mode) {
      console.log('⚠️  API 正在演示模式下运行（未配置 REPLICATE_API_TOKEN）');
      console.log('要生成真实的 AI 效果，请在 .env.local 中配置 REPLICATE_API_TOKEN\n');
    }

    // 4. 保存生成的图片
    console.log('💾 保存生成的图片...\n');

    // 保存 3D 模型
    if (result.model_3d_url) {
      console.log('保存 3D 模型...');
      await downloadAndSaveImage(result.model_3d_url, 'lady-3d-model.png');
    }

    // 保存透明背景的 3D 模型
    if (result.bg_removed_url) {
      console.log('保存透明 3D...');
      await downloadAndSaveImage(result.bg_removed_url, 'lady-transparent-3d.png');
    } else if (result.model_3d_url) {
      // 如果没有背景去除版本，使用原始 3D 模型
      console.log('使用原始 3D 模型作为透明版本...');
      await downloadAndSaveImage(result.model_3d_url, 'lady-transparent-3d.png');
    }

    // 保存合成效果
    if (result.composite_url) {
      console.log('保存合成效果...');
      await downloadAndSaveImage(result.composite_url, 'lady-composite.png');
    }

    console.log('\n✨ 所有图片生成完成！');
    console.log('📁 图片保存在:', DEMO_DIR);

    // 5. 转换为真实图片格式（不是 SVG）
    console.log('\n🔄 删除旧的 SVG 文件...');
    const svgFiles = ['lady-original.svg', 'lady-3d-model.svg', 'lady-transparent-3d.svg', 'lady-composite.svg'];
    svgFiles.forEach(file => {
      const filePath = path.join(DEMO_DIR, file);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`删除: ${file}`);
      }
    });

    console.log('\n🎉 演示图片更新完成！');
    console.log('现在网站将显示真实的 AI 生成效果。');

  } catch (error) {
    console.error('\n❌ 发生错误:', error.message);
    if (error.message.includes('ECONNREFUSED')) {
      console.log('\n💡 提示: 请确保开发服务器正在运行 (npm run dev)');
    }
  }
}

// 运行脚本
generateDemoImages();