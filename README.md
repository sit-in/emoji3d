# 3D Emoji Generator 🏝️

一个基于 AI 的 3D 表情包生成器，可以将照片转换为独特的 3D 岛屿风格表情贴纸。

## 🌟 功能特点

- **AI 驱动**：使用 Replicate API 生成高质量 3D 表情
- **拖拽上传**：简单易用的文件上传界面
- **实时预览**：即时查看生成结果
- **响应式设计**：完美适配移动端和桌面端
- **演示模式**：无需 API 密钥即可体验

## 🚀 快速开始

### 环境要求

- Node.js 18+
- npm 或 pnpm

### 安装

```bash
# 克隆项目
git clone git@github.com:sit-in/emoji3d.git
cd emoji3d

# 安装依赖
npm install
# 或
pnpm install
```

### 配置

创建 `.env.local` 文件：

```env
REPLICATE_API_TOKEN=your_replicate_api_token_here
```

获取 Replicate API Token：
1. 访问 [Replicate](https://replicate.com/)
2. 注册/登录账号
3. 在设置中获取 API Token

### 开发

```bash
# 启动开发服务器
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建

```bash
# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

## 🛠️ 技术栈

- **框架**: [Next.js 14](https://nextjs.org/) (App Router)
- **语言**: [TypeScript](https://www.typescriptlang.org/)
- **样式**: [Tailwind CSS](https://tailwindcss.com/)
- **UI 组件**: [Radix UI](https://www.radix-ui.com/)
- **表单**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **AI 生成**: [Replicate API](https://replicate.com/)

## 📁 项目结构

```
emoji3d/
├── app/                  # Next.js App Router
│   ├── api/             # API 路由
│   │   ├── generate/    # 3D 表情生成接口
│   │   └── leads/       # 线索收集接口
│   ├── layout.tsx       # 根布局
│   └── page.tsx         # 首页
├── components/          # React 组件
│   ├── ui/             # 基础 UI 组件
│   └── ...             # 页面组件
├── lib/                # 工具函数
├── hooks/              # 自定义 React Hooks
├── public/             # 静态资源
└── styles/             # 全局样式
```

## 🎨 主题定制

项目使用岛屿/热带主题，主要颜色定义在 `tailwind.config.ts` 中：

- 主色调：青色/蓝绿色系
- 强调色：珊瑚色/橙色系
- 背景：沙滩色调

## 🔧 API 接口

### POST /api/generate

生成 3D 表情接口。

**请求体**:
```json
{
  "image": "base64_encoded_image_data"
}
```

**响应**:
```json
{
  "output": "generated_3d_emoji_url"
}
```

## 📝 开发指南

### 命令

```bash
# 开发
npm run dev

# 构建
npm run build

# 生产运行
npm start

# 代码检查
npm run lint
```

### 环境变量

- `REPLICATE_API_TOKEN` - Replicate API 密钥（生产环境必需）

### 注意事项

- 演示模式：未配置 API 密钥时自动启用
- TypeScript：使用严格模式
- 图片优化：开发环境已禁用以提高构建速度

## 🤝 贡献

欢迎提交 Pull Request 或创建 Issue！

## 📄 许可证

MIT License

## 🙏 致谢

- [Replicate](https://replicate.com/) - AI 模型托管
- [shadcn/ui](https://ui.shadcn.com/) - UI 组件设计
- [Next.js](https://nextjs.org/) - React 框架