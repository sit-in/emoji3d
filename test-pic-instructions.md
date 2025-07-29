# 使用说明

请将你的照片保存为 `test-pic.jpg` 并放在项目根目录。

然后运行以下命令生成演示图片：

```bash
# 确保开发服务器正在运行
npm run dev

# 在另一个终端运行脚本
node scripts/generate-demo-from-api.js
```

脚本将：
1. 读取你的照片 (test-pic.jpg)
2. 调用 API 生成 3D 模型
3. 生成透明背景版本
4. 创建合成效果
5. 保存所有图片到 public/demo 目录

生成的文件：
- lady-original.jpg - 原始照片
- lady-3d-model.png - AI 生成的 3D 模型
- lady-transparent-3d.png - 透明背景的 3D 模型
- lady-composite.png - 合成效果