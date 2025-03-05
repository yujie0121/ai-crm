# AI-Powered CRM System

## 项目介绍
本项目是一个基于AI技术的现代化客户关系管理系统，集成了客户管理、销售跟踪、任务管理和智能分析等功能。

## 技术栈

### 前端技术
- **核心框架**：React 18 + TypeScript
- **UI框架**：Material-UI (MUI)
- **状态管理**：Redux Toolkit
- **路由管理**：React Router
- **表单处理**：React Hook Form
- **数据可视化**：Recharts
- **AI集成**：TensorFlow.js

### 后端技术
- **运行环境**：Node.js
- **Web框架**：Express.js
- **数据库**：MongoDB
- **身份认证**：JWT
- **API文档**：Swagger

### 开发工具
- **构建工具**：Vite
- **代码规范**：ESLint + Prettier
- **测试框架**：Jest + React Testing Library
- **版本控制**：Git
- **CI/CD**：GitHub Actions

## 系统要求
- Node.js >= 16.0.0
- npm >= 8.0.0
- MongoDB >= 5.0

## 部署指南

### 1. 环境准备
```bash
# 安装 Node.js 和 npm
# Windows: 从 https://nodejs.org 下载安装包
# Linux:
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# 安装 MongoDB
# Windows: 从 https://www.mongodb.com/try/download/community 下载安装包
# Linux:
sudo apt-get install -y mongodb
```

### 2. 获取代码
```bash
# 克隆项目仓库
git clone [repository-url]
cd crm
```

### 3. 安装依赖
```bash
# 安装项目依赖
npm install
```

### 4. 环境配置
```bash
# 复制环境变量配置文件
cp .env.example .env

# 编辑.env文件，配置以下必要的环境变量：
# MONGODB_URI=mongodb://localhost:27017/crm
# JWT_SECRET=your-secret-key
# API_PORT=3000
# NODE_ENV=production
```

### 5. 数据库初始化
```bash
# 启动 MongoDB 服务
# Windows:
net start MongoDB
# Linux:
sudo service mongodb start

# 初始化数据库（如果有初始化脚本）
npm run db:init
```

### 6. 构建和启动
```bash
# 构建生产环境代码
npm run build

# 启动服务
npm start
```

### 7. 访问系统
- 前端访问地址：http://localhost:3000
- API文档地址：http://localhost:3000/api-docs

## 开发指南

### 开发环境启动
```bash
# 启动开发服务器（支持热更新）
npm run dev
```

### 代码规范检查
```bash
# 运行代码检查
npm run lint

# 自动修复代码格式
npm run lint:fix
```

### 运行测试
```bash
# 运行单元测试
npm test

# 生成测试覆盖率报告
npm run test:coverage
```

## 项目结构
```
src/
  ├── components/     # 通用组件
  │   ├── common/     # 基础UI组件
  │   ├── forms/      # 表单组件
  │   └── layout/     # 布局组件
  ├── features/       # 功能模块
  │   ├── customers/  # 客户管理
  │   ├── sales/      # 销售管理
  │   ├── tasks/      # 任务管理
  │   └── reports/    # 报告管理
  ├── pages/         # 页面组件
  ├── services/      # API服务
  │   ├── api/       # API请求
  │   └── auth/      # 认证服务
  ├── store/         # Redux store
  │   ├── slices/    # Redux切片
  │   └── hooks/     # 自定义Hooks
  ├── utils/         # 工具函数
  │   ├── helpers/   # 辅助函数
  │   └── constants/ # 常量定义
  └── ai/            # AI相关功能
      ├── models/    # AI模型
      └── services/  # AI服务
```

## 功能模块

### 客户管理
- 客户信息管理
- 客户分类标签
- 联系历史记录
- 客户画像分析

### 销售管理
- 销售机会跟踪
- 报价管理
- 合同管理
- 销售预测

### 任务管理
- 待办事项
- 日程安排
- 任务分配
- 进度追踪

### 报告分析
- 销售报表
- 业绩分析
- 客户统计
- 预测报告

## 常见问题

### 1. 启动失败
- 检查 MongoDB 服务是否正常运行
- 确认环境变量配置是否正确
- 检查端口是否被占用

### 2. 热更新不生效
- 检查 vite.config.ts 配置
- 清除浏览器缓存
- 重启开发服务器

## 维护团队
- 前端开发团队
- 后端开发团队
- UI/UX设计团队
- DevOps团队

## 版本历史
- v1.0.0 - 初始版本发布
- v1.1.0 - 添加AI功能
- v1.2.0 - 优化性能和UI

## 许可证
MIT License
