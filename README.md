# VideoGen - Remotion SaaS 平台

AI 驱动的视频生成平台，基于 Remotion 和 Next.js。

## 功能特性

- 🎬 **4 款专业模板**：生日祝福、产品展示、数据报告、社交推广
- ⚡ **快速生成**：参数化视频，一键渲染
- 💳 **付费集成**：Stripe 支付，按视频付费
- 🌍 **出海就绪**：响应式设计，支持多语言

## 技术栈

- **前端**：Next.js 14 + Tailwind CSS
- **视频渲染**：Remotion 4.0
- **支付**：Stripe
- **部署**：Vercel / Railway

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 启动 Remotion Studio
npm run studio

# 渲染视频（命令行）
npm run render
```

## 模板说明

| 模板 | 用途 | 尺寸 | 价格 |
|------|------|------|------|
| 生日祝福 | 个人祝福视频 | 1080x1920 | $2.99 |
| 产品展示 | 电商营销视频 | 1920x1080 | $4.99 |
| 数据报告 | 数据可视化 | 1080x1080 | $3.99 |
| 社交推广 | 限时促销视频 | 1080x1350 | $1.99 |

## 部署

### 1. Vercel（前端）

```bash
npm i -g vercel
vercel --prod
```

### 2. 视频渲染服务

需要部署 Remotion Lambda 或自建渲染服务：

```bash
# 部署 Remotion Lambda
npx remotion lambda sites create
```

## 环境变量

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Stripe
STRIPE_PUBLIC_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Remotion
REMOTION_AWS_ACCESS_KEY_ID=
REMOTION_AWS_SECRET_ACCESS_KEY=
```

## 商业模式

- 按视频付费：$1.99 - $4.99 / 视频
- 订阅制：$9.99/月 无限生成
- API 调用：开发者集成

## 后续开发

- [ ] 更多模板
- [ ] 批量生成
- [ ] AI 文案生成
- [ ] 多语言支持
