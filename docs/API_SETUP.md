# 3D Emoji API 设置指南

## 概述
本项目使用 Replicate API 来生成 3D Emoji。要启用真实的 API 调用，您需要配置 Replicate API Token。

## 步骤

### 1. 获取 Replicate API Token

1. 访问 [Replicate](https://replicate.com) 并创建账号
2. 登录后访问 [API Tokens 页面](https://replicate.com/account/api-tokens)
3. 点击 "Create token" 创建新的 API token
4. 复制生成的 token（格式类似：`r8_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`）

### 2. 配置环境变量

1. 打开项目根目录的 `.env.local` 文件
2. 将您的 API token 添加到 `REPLICATE_API_TOKEN=` 后面：

```env
REPLICATE_API_TOKEN=r8_your_actual_token_here
```

### 3. 重启开发服务器

```bash
# 停止当前服务器 (Ctrl+C)
# 重新启动
npm run dev
```

## API 使用说明

### 模型信息
- **模型**: InstantID
- **版本**: a07f252abbbd832009640b27f063ea52d87d7a23a185ca165bec23b5adc8deaf
- **功能**: 将人脸照片转换为 3D 风格的 emoji

### 支持的风格
- Clay（粘土风格）
- 3D Cartoon（3D 卡通风格）
- Realistic（写实风格）
- Watercolor（水彩风格）
- Oil Painting（油画风格）
- Line Drawing（线条素描）
- Anime（动漫风格）
- Pixel Art（像素风格）

### API 调用流程
1. 用户上传图片
2. 图片转换为 base64 格式
3. 调用 Replicate API 创建预测任务
4. 轮询检查任务状态
5. 返回生成的 3D emoji 图片 URL

## 费用说明
- Replicate 按使用量收费
- 每次生成大约需要 $0.00055 - $0.0011
- 新用户有免费额度
- 详见 [Replicate 定价页面](https://replicate.com/pricing)

## 故障排除

### 常见问题

1. **"API authentication failed"**
   - 检查 API token 是否正确
   - 确保 token 没有过期

2. **"Generation timeout"**
   - 生成过程通常需要 10-30 秒
   - 高峰期可能需要更长时间

3. **"No output generated"**
   - 确保上传的是清晰的人脸照片
   - 图片大小不要超过 4MB

### Demo 模式
如果没有配置 API token，系统会自动运行在 demo 模式下：
- 返回占位符图片
- 模拟 3 秒的处理时间
- 适合开发和测试使用

## 安全提示
- 不要将 `.env.local` 文件提交到版本控制
- 不要在前端代码中暴露 API token
- 定期轮换 API token