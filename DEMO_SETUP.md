# 设置演示效果图片

## 步骤说明

### 1. 保存原始照片
将您提供的照片保存为: `public/demo/original.jpg`

### 2. 生成其他效果图片

#### 方法A：使用脚本自动生成（推荐）
```bash
# 确保服务器正在运行 (端口3003)
npm start

# 在另一个终端运行生成脚本
node scripts/generate-demo-images.js
```

#### 方法B：手动生成
1. 访问 http://localhost:3003
2. 上传您的照片
3. 等待生成完成
4. 分别切换到不同视图并保存：
   - 3D模型 → 保存为 `public/demo/3d-model.png`
   - 透明3D → 保存为 `public/demo/transparent-3d.png`
   - 合成效果 → 保存为 `public/demo/composite.png`

### 3. 检查效果
刷新页面，查看"看看实际效果"栏目是否正确显示您的照片效果。

## 文件结构
```
public/demo/
├── original.jpg      # 您的原始照片
├── 3d-model.png     # AI生成的3D模型
├── transparent-3d.png # 去背景的透明3D
└── composite.png     # 合成效果
```

## 注意事项
- 确保所有图片都是正方形或相近比例，以获得最佳显示效果
- 如果图片加载失败，组件会自动显示占位图
- 可以在 `components/feature-demo.tsx` 中调整图片路径