# 更新演示图片指南

## 方法 1：手动保存图片

1. **保存你的照片**
   - 右键点击你提供的照片
   - 选择"保存图片为..."
   - 保存为 `test-pic.jpg` 到项目根目录
   - 确保替换现有的 test-pic.jpg 文件

2. **运行生成脚本**
   ```bash
   # 在项目目录下运行
   node scripts/generate-demo-simple.js
   ```

3. **等待生成完成**
   - 脚本会显示进度
   - 大约需要 30-60 秒
   - 完成后刷新网页查看效果

## 方法 2：使用在线图片 URL

如果你的图片有在线 URL，可以创建一个下载脚本：

```javascript
// download-and-generate.js
const https = require('https');
const fs = require('fs');
const { exec } = require('child_process');

const imageUrl = '你的图片URL'; // 替换为实际URL
const outputPath = './test-pic.jpg';

// 下载图片
const file = fs.createWriteStream(outputPath);
https.get(imageUrl, (response) => {
  response.pipe(file);
  file.on('finish', () => {
    file.close();
    console.log('✅ 图片下载完成');
    
    // 运行生成脚本
    exec('node scripts/generate-demo-simple.js', (error, stdout, stderr) => {
      if (error) {
        console.error(`执行错误: ${error}`);
        return;
      }
      console.log(stdout);
    });
  });
});
```

## 生成的文件说明

运行脚本后会生成以下文件：
- `public/demo/lady-original.jpg` - 你的原始照片
- `public/demo/lady-3d-model.png` - AI 生成的 3D 模型
- `public/demo/lady-transparent-3d.png` - 透明背景的 3D 效果
- `public/demo/lady-composite.png` - 合成效果

这些图片会自动在网站的"看看实际效果"栏目中显示。