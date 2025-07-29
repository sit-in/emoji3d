# 批量生成演示图片

## 使用步骤

1. **准备图片**
   - 在项目根目录创建 `demo-input` 文件夹
   - 将所有要处理的图片放入该文件夹
   - 支持格式: .jpg, .jpeg, .png, .webp

2. **运行生成脚本**
   ```bash
   # 确保开发服务器正在运行
   npm run dev
   
   # 在另一个终端运行批量生成
   node scripts/batch-generate-demos.js
   ```

3. **查看结果**
   - 生成的图片保存在 `public/demo-gallery/`
   - 每组图片包含:
     - original.jpg - 原图
     - 3d-model.png - 3D 模型
     - transparent-3d.png - 透明背景
     - composite.png - 合成效果
     - metadata.json - 元数据

## 目录结构

```
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
```

## 注意事项

- 每张图片处理需要 30-60 秒
- 脚本会自动在处理间隔添加延迟
- 确保有稳定的网络连接
- 配置好 REPLICATE_API_TOKEN
