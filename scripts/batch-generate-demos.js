const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');

// 配置
const INPUT_DIR = path.join(__dirname, '../demo-input'); // 输入图片目录
const OUTPUT_DIR = path.join(__dirname, '../public/demo-gallery'); // 输出目录
const API_URL = 'http://localhost:3000/api/generate';

// 确保目录存在
[INPUT_DIR, OUTPUT_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// 创建示例目录结构
const exampleStructure = `
${INPUT_DIR}/
├── person1.jpg
├── person2.jpg
├── person3.jpg
└── ... (更多图片)
`;

// 支持的图片格式
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png', '.webp'];

// 延迟函数
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// 下载并保存图片
async function downloadAndSaveImage(url, filename) {
  return new Promise((resolve, reject) => {
    if (url.startsWith('data:')) {
      // Base64 数据
      const base64Data = url.split(',')[1];
      const buffer = Buffer.from(base64Data, 'base64');
      fs.writeFileSync(filename, buffer);
      resolve();
    } else {
      // HTTP/HTTPS URL
      const client = url.startsWith('https:') ? https : http;
      client.get(url, (response) => {
        const chunks = [];
        response.on('data', chunk => chunks.push(chunk));
        response.on('end', () => {
          const buffer = Buffer.concat(chunks);
          fs.writeFileSync(filename, buffer);
          resolve();
        });
      }).on('error', reject);
    }
  });
}

// 调用 API 生成图片
async function generateImagesForPhoto(inputPath, outputBaseName) {
  console.log(`\n📸 处理: ${path.basename(inputPath)}`);
  
  // 读取图片
  const imageBuffer = fs.readFileSync(inputPath);
  
  // 创建 form data
  const boundary = '----WebKitFormBoundary' + Math.random().toString(36).substring(2);
  
  let formData = '';
  formData += `--${boundary}\r\n`;
  formData += `Content-Disposition: form-data; name="image"; filename="${path.basename(inputPath)}"\r\n`;
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
  
  return new Promise((resolve, reject) => {
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
            throw new Error(`API 错误: ${data}`);
          }
          
          // 创建输出文件夹
          const outputFolder = path.join(OUTPUT_DIR, outputBaseName);
          if (!fs.existsSync(outputFolder)) {
            fs.mkdirSync(outputFolder, { recursive: true });
          }
          
          // 保存原始图片
          fs.copyFileSync(inputPath, path.join(outputFolder, 'original.jpg'));
          console.log(`  ✅ 保存原图`);
          
          // 保存生成的图片
          if (result.model_3d_url) {
            await downloadAndSaveImage(result.model_3d_url, 
              path.join(outputFolder, '3d-model.png'));
            console.log(`  ✅ 保存 3D 模型`);
          }
          
          if (result.bg_removed_url) {
            await downloadAndSaveImage(result.bg_removed_url, 
              path.join(outputFolder, 'transparent-3d.png'));
            console.log(`  ✅ 保存透明 3D`);
          }
          
          if (result.composite_url) {
            await downloadAndSaveImage(result.composite_url, 
              path.join(outputFolder, 'composite.png'));
            console.log(`  ✅ 保存合成效果`);
          }
          
          // 创建元数据
          const metadata = {
            name: outputBaseName,
            originalFile: path.basename(inputPath),
            generatedAt: new Date().toISOString(),
            files: {
              original: 'original.jpg',
              model3d: '3d-model.png',
              transparent: 'transparent-3d.png',
              composite: 'composite.png'
            }
          };
          
          fs.writeFileSync(
            path.join(outputFolder, 'metadata.json'),
            JSON.stringify(metadata, null, 2)
          );
          
          resolve(metadata);
        } catch (error) {
          reject(error);
        }
      });
    });
    
    req.on('error', reject);
    req.write(formDataBuffer);
    req.end();
  });
}

// 主函数
async function batchGenerate() {
  console.log('🚀 批量生成演示图片\n');
  
  // 检查输入目录
  if (!fs.existsSync(INPUT_DIR)) {
    console.log(`❌ 输入目录不存在: ${INPUT_DIR}`);
    console.log('\n请创建目录并添加图片:');
    console.log(exampleStructure);
    return;
  }
  
  // 获取所有图片文件
  const files = fs.readdirSync(INPUT_DIR)
    .filter(file => SUPPORTED_FORMATS.includes(path.extname(file).toLowerCase()));
  
  if (files.length === 0) {
    console.log(`❌ 在 ${INPUT_DIR} 中未找到图片文件`);
    console.log('\n支持的格式:', SUPPORTED_FORMATS.join(', '));
    return;
  }
  
  console.log(`📁 找到 ${files.length} 张图片\n`);
  
  // 检查开发服务器
  try {
    await new Promise((resolve, reject) => {
      http.get('http://localhost:3000', (res) => {
        if (res.statusCode === 200) resolve();
        else reject(new Error('服务器未就绪'));
      }).on('error', reject);
    });
  } catch (error) {
    console.log('❌ 开发服务器未运行');
    console.log('请先运行: npm run dev\n');
    return;
  }
  
  // 处理每张图片
  const results = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const inputPath = path.join(INPUT_DIR, file);
    const outputBaseName = `demo-${i + 1}`;
    
    try {
      console.log(`\n进度: ${i + 1}/${files.length}`);
      const metadata = await generateImagesForPhoto(inputPath, outputBaseName);
      results.push(metadata);
      
      // 延迟以避免过载
      if (i < files.length - 1) {
        console.log('\n⏳ 等待 3 秒...');
        await delay(3000);
      }
    } catch (error) {
      console.error(`\n❌ 处理失败: ${file}`);
      console.error(error.message);
    }
  }
  
  // 生成索引文件
  const indexPath = path.join(OUTPUT_DIR, 'index.json');
  fs.writeFileSync(indexPath, JSON.stringify({
    generatedAt: new Date().toISOString(),
    count: results.length,
    demos: results
  }, null, 2));
  
  console.log('\n\n✨ 批量生成完成！');
  console.log(`📁 输出目录: ${OUTPUT_DIR}`);
  console.log(`📊 成功生成: ${results.length} 组图片`);
  
  // 生成展示页面提示
  console.log('\n💡 下一步:');
  console.log('1. 查看生成的图片: public/demo-gallery/');
  console.log('2. 在网站中使用这些图片展示效果');
  console.log('3. 可以修改 Gallery 组件来展示这些批量生成的效果');
}

// 创建使用说明
function createReadme() {
  const readme = `# 批量生成演示图片

## 使用步骤

1. **准备图片**
   - 在项目根目录创建 \`demo-input\` 文件夹
   - 将所有要处理的图片放入该文件夹
   - 支持格式: .jpg, .jpeg, .png, .webp

2. **运行生成脚本**
   \`\`\`bash
   # 确保开发服务器正在运行
   npm run dev
   
   # 在另一个终端运行批量生成
   node scripts/batch-generate-demos.js
   \`\`\`

3. **查看结果**
   - 生成的图片保存在 \`public/demo-gallery/\`
   - 每组图片包含:
     - original.jpg - 原图
     - 3d-model.png - 3D 模型
     - transparent-3d.png - 透明背景
     - composite.png - 合成效果
     - metadata.json - 元数据

## 目录结构

\`\`\`
demo-input/              # 输入目录（放置原始图片）
├── photo1.jpg
├── photo2.jpg
└── photo3.jpg

public/demo-gallery/     # 输出目录（自动生成）
├── demo-1/
│   ├── original.jpg
│   ├── 3d-model.png
│   ├── transparent-3d.png
│   ├── composite.png
│   └── metadata.json
├── demo-2/
│   └── ...
└── index.json          # 所有演示的索引
\`\`\`

## 注意事项

- 每张图片处理需要 30-60 秒
- 脚本会自动在处理间隔添加延迟
- 确保有稳定的网络连接
- 配置好 REPLICATE_API_TOKEN
`;

  fs.writeFileSync(path.join(__dirname, 'BATCH_GENERATE_README.md'), readme);
}

// 创建说明文件
createReadme();

// 运行批量生成
batchGenerate();