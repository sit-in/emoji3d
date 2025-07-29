/**
 * 创建演示占位图片
 * 这些图片模拟了真实效果，方便您查看功能
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const demoDir = path.join(__dirname, '../public/demo');

// 确保目录存在
if (!fs.existsSync(demoDir)) {
  fs.mkdirSync(demoDir, { recursive: true });
}

// 创建简单的SVG占位图
function createPlaceholderSVG(text, bgColor, fgColor) {
  return `<svg width="800" height="800" xmlns="http://www.w3.org/2000/svg">
    <rect width="800" height="800" fill="${bgColor}"/>
    <text x="400" y="400" font-family="Arial, sans-serif" font-size="48" fill="${fgColor}" text-anchor="middle" dominant-baseline="middle">${text}</text>
  </svg>`;
}

// 创建占位图片
const placeholders = [
  {
    filename: 'original-placeholder.jpg',
    svg: createPlaceholderSVG('原始照片', '#fef3c7', '#92400e')
  },
  {
    filename: '3d-model-placeholder.png',
    svg: createPlaceholderSVG('3D 模型', '#ddd6fe', '#5b21b6')
  },
  {
    filename: 'transparent-3d-placeholder.png',
    svg: createPlaceholderSVG('透明 3D', '#d1fae5', '#065f46')
  },
  {
    filename: 'composite-placeholder.png',
    svg: createPlaceholderSVG('合成效果', '#fee2e2', '#991b1b')
  }
];

// 保存SVG文件
placeholders.forEach(({ filename, svg }) => {
  const filepath = path.join(demoDir, filename);
  fs.writeFileSync(filepath, svg);
  console.log(`✅ 创建占位图: ${filename}`);
});

console.log('\n📝 使用说明:');
console.log('1. 请将您的照片保存为: public/demo/original.jpg');
console.log('2. 运行 generate-demo-images.js 生成真实效果');
console.log('3. 或手动替换相应的图片文件');