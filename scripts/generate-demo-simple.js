const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');

// 配置
const DEMO_DIR = path.join(__dirname, '../public/demo');
const INPUT_IMAGE = path.join(__dirname, '../test-pic.jpg');

// 确保 demo 目录存在
if (!fs.existsSync(DEMO_DIR)) {
  fs.mkdirSync(DEMO_DIR, { recursive: true });
}

// 读取图片文件
const imageBuffer = fs.readFileSync(INPUT_IMAGE);

// 创建 multipart/form-data 边界
const boundary = '----WebKitFormBoundary' + Math.random().toString(36).substring(2);

// 构建 form data
let formData = '';
formData += `--${boundary}\r\n`;
formData += `Content-Disposition: form-data; name="image"; filename="test-pic.jpg"\r\n`;
formData += `Content-Type: image/jpeg\r\n\r\n`;

const formDataBuffer = Buffer.concat([
  Buffer.from(formData),
  imageBuffer,
  Buffer.from(`\r\n--${boundary}\r\n`),
  Buffer.from(`Content-Disposition: form-data; name="style"\r\n\r\nClay\r\n`),
  Buffer.from(`--${boundary}\r\n`),
  Buffer.from(`Content-Disposition: form-data; name="prompt"\r\n\r\na cute 3D emoji character in island tropical style with vibrant colors\r\n`),
  Buffer.from(`--${boundary}\r\n`),
  Buffer.from(`Content-Disposition: form-data; name="position"\r\n\r\nbottom-right\r\n`),
  Buffer.from(`--${boundary}--\r\n`)
]);

// 下载并保存图片
function downloadAndSaveImage(url, filename) {
  return new Promise((resolve, reject) => {
    if (url.startsWith('data:')) {
      // Base64 数据
      const base64Data = url.split(',')[1];
      const buffer = Buffer.from(base64Data, 'base64');
      fs.writeFileSync(path.join(DEMO_DIR, filename), buffer);
      console.log(`✅ 保存成功: ${filename}`);
      resolve();
    } else {
      // HTTP/HTTPS URL
      const client = url.startsWith('https:') ? https : http;
      client.get(url, (response) => {
        const chunks = [];
        response.on('data', chunk => chunks.push(chunk));
        response.on('end', () => {
          const buffer = Buffer.concat(chunks);
          fs.writeFileSync(path.join(DEMO_DIR, filename), buffer);
          console.log(`✅ 保存成功: ${filename}`);
          resolve();
        });
      }).on('error', reject);
    }
  });
}

console.log('🚀 开始生成演示图片...\n');

// 保存原始图片
console.log('📸 保存原始图片...');
fs.writeFileSync(path.join(DEMO_DIR, 'lady-original.jpg'), imageBuffer);
console.log('✅ 原始图片保存成功\n');

// 发送请求
console.log('🎨 调用 API 生成 3D 模型...');
console.log('这可能需要 30-60 秒，请耐心等待...\n');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/generate',
  method: 'POST',
  headers: {
    'Content-Type': `multipart/form-data; boundary=${boundary}`,
    'Content-Length': formDataBuffer.length
  }
};

const req = http.request(options, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', async () => {
    try {
      const result = JSON.parse(data);
      
      if (res.statusCode !== 200) {
        throw new Error(`API 错误 (${res.statusCode}): ${data}`);
      }
      
      console.log('✅ API 调用成功\n');
      
      // 检查是否在演示模式
      if (result.demo_mode) {
        console.log('⚠️  API 正在演示模式下运行（未配置 REPLICATE_API_TOKEN）');
        console.log('要生成真实的 AI 效果，请在 .env.local 中配置 REPLICATE_API_TOKEN\n');
      }
      
      // 保存生成的图片
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
      
      // 删除旧的 SVG 文件
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
    }
  });
});

req.on('error', (error) => {
  console.error('\n❌ 请求错误:', error.message);
  if (error.message.includes('ECONNREFUSED')) {
    console.log('\n💡 提示: 请确保开发服务器正在运行 (npm run dev)');
  }
});

req.write(formDataBuffer);
req.end();