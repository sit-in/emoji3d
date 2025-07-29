/**
 * 生成演示图片的脚本
 * 使用您的原始照片通过API生成3D效果
 */

const fs = require('fs');
const path = require('path');
const FormData = require('form-data');

// 配置
const API_URL = 'http://localhost:3003/api/generate';
const ORIGINAL_IMAGE_PATH = path.join(__dirname, '../public/demo/original.jpg');
const OUTPUT_DIR = path.join(__dirname, '../public/demo');

async function generateDemoImages() {
  console.log('开始生成演示图片...\n');

  // 检查原始图片是否存在
  if (!fs.existsSync(ORIGINAL_IMAGE_PATH)) {
    console.error('❌ 请先将您的照片保存为: public/demo/original.jpg');
    return;
  }

  try {
    // 准备表单数据
    const formData = new FormData();
    formData.append('image', fs.createReadStream(ORIGINAL_IMAGE_PATH));
    formData.append('style', 'Clay'); // 可以改为其他风格
    formData.append('position', 'bottom-right');

    console.log('📤 正在调用API生成3D效果...');
    
    // 调用API
    const response = await fetch(API_URL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`API调用失败: ${response.status}`);
    }

    const result = await response.json();
    console.log('✅ API调用成功！');

    // 下载并保存图片
    console.log('\n📥 正在下载生成的图片...');

    // 1. 保存3D模型
    if (result.model_3d_url) {
      await downloadImage(result.model_3d_url, path.join(OUTPUT_DIR, '3d-model.png'));
      console.log('✅ 3D模型已保存');
    }

    // 2. 保存透明3D
    if (result.bg_removed_url) {
      await downloadImage(result.bg_removed_url, path.join(OUTPUT_DIR, 'transparent-3d.png'));
      console.log('✅ 透明3D已保存');
    }

    // 3. 保存合成效果
    if (result.composite_url) {
      // 如果是base64格式
      if (result.composite_url.startsWith('data:')) {
        const base64Data = result.composite_url.replace(/^data:image\/\w+;base64,/, '');
        fs.writeFileSync(path.join(OUTPUT_DIR, 'composite.png'), Buffer.from(base64Data, 'base64'));
      } else {
        await downloadImage(result.composite_url, path.join(OUTPUT_DIR, 'composite.png'));
      }
      console.log('✅ 合成效果已保存');
    }

    console.log('\n🎉 所有演示图片已生成完成！');
    console.log('📁 图片保存在: public/demo/');

  } catch (error) {
    console.error('❌ 生成失败:', error.message);
  }
}

// 下载图片的辅助函数
async function downloadImage(url, filepath) {
  const response = await fetch(url);
  const buffer = await response.buffer();
  fs.writeFileSync(filepath, buffer);
}

// 执行脚本
generateDemoImages();