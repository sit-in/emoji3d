# 🎨 最简单的批量生成图片方法

## 快速开始（3步完成）

### 第 1 步：准备图片
将你收集的所有图片放入 `demo-input` 文件夹：
```
demo-input/
├── 美女1.jpg
├── 美女2.jpg
├── 帅哥1.jpg
├── 小孩1.jpg
└── ... (更多图片)
```

### 第 2 步：运行脚本
```bash
# 确保开发服务器在运行
npm run dev

# 运行批量生成（在另一个终端）
node scripts/batch-generate-demos.js
```

### 第 3 步：查看结果
生成的图片在 `public/demo-gallery/` 文件夹：
```
public/demo-gallery/
├── demo-1/          # 第一组效果
│   ├── original.jpg      # 原图
│   ├── 3d-model.png      # 3D效果
│   ├── transparent-3d.png # 透明3D
│   └── composite.png     # 合成效果
├── demo-2/          # 第二组效果
│   └── ...
└── index.json       # 所有图片的索引
```

## 💡 使用技巧

1. **批量收集图片的方法**：
   - 从图片网站下载多张人物照片
   - 使用手机拍摄朋友/家人照片
   - 从社交媒体保存图片（注意版权）

2. **支持的格式**：
   - .jpg / .jpeg
   - .png
   - .webp

3. **处理时间**：
   - 每张图片需要 30-60 秒
   - 10 张图片大约需要 5-10 分钟

4. **自动功能**：
   - 自动按顺序处理所有图片
   - 自动创建文件夹组织
   - 自动生成索引文件
   - 处理间自动延迟，避免过载

## 🚀 进阶用法

### 在网站中展示批量生成的效果

生成完成后，可以修改 Gallery 组件来展示这些效果：

```javascript
// 读取生成的索引
import demoIndex from '/public/demo-gallery/index.json';

// 在 Gallery 组件中使用
{demoIndex.demos.map((demo, index) => (
  <div key={index}>
    <img src={`/demo-gallery/${demo.name}/composite.png`} />
  </div>
))}
```

### 自定义生成参数

编辑 `scripts/batch-generate-demos.js` 中的参数：
- `style`: 修改 3D 风格（Clay/Cartoon/Realistic）
- `position`: 修改合成位置（bottom-right/bottom-left等）

## ❓ 常见问题

**Q: 如何一次处理很多图片？**
A: 直接将所有图片放入 demo-input 文件夹，脚本会自动处理全部。

**Q: 生成失败怎么办？**
A: 检查：
- 开发服务器是否运行（npm run dev）
- 图片格式是否支持
- API Token 是否配置

**Q: 可以自定义输出位置吗？**
A: 可以修改脚本中的 OUTPUT_DIR 变量。

---

就是这么简单！将图片放入文件夹，运行一个命令，等待完成即可。