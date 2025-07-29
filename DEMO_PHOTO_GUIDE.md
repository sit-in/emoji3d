# 设置您的演示照片指南

## 当前状态
已经为"看看实际效果"栏目创建了占位图片，您可以立即查看效果。

## 替换为您的真实照片

### 步骤 1: 保存您的原始照片
将您提供的女士照片（白色上衣、红色裙子）保存为:
```
public/demo/original.jpg
```

### 步骤 2: 生成效果图片

#### 方法A: 使用自动脚本（推荐）
```bash
# 确保开发服务器正在运行
npm run dev

# 在新终端运行生成脚本
node scripts/generate-demo-images.js
```

#### 方法B: 手动上传生成
1. 访问 http://localhost:3003
2. 上传您的照片
3. 选择风格（建议使用 Clay 或 Cartoon）
4. 等待生成完成
5. 分别保存各个视图的图片:
   - 3D模型视图 → 保存为 `public/demo/3d-model.png`
   - 透明3D视图 → 保存为 `public/demo/transparent-3d.png`
   - 合成效果视图 → 保存为 `public/demo/composite.png`

### 步骤 3: 更新组件引用
编辑 `components/feature-demo.tsx`，将占位图路径改为真实图片:
```javascript
const demoImages = {
  original: "/demo/original.jpg",
  "3d": "/demo/3d-model.png",
  transparent: "/demo/transparent-3d.png",
  composite: "/demo/composite.png",
}
```

## 文件结构
```
public/demo/
├── placeholder.txt              # 说明文件
├── original-placeholder.jpg     # 原始照片占位图
├── 3d-model-placeholder.png    # 3D模型占位图
├── transparent-3d-placeholder.png # 透明3D占位图
├── composite-placeholder.png    # 合成效果占位图
├── original.jpg                # [待添加] 您的原始照片
├── 3d-model.png               # [待生成] AI生成的3D模型
├── transparent-3d.png          # [待生成] 去背景的3D模型
└── composite.png              # [待生成] 合成效果
```

## 注意事项
- 确保您的照片是清晰的正面照
- 建议使用正方形或4:3比例的图片
- 生成过程需要API密钥（REPLICATE_API_TOKEN）