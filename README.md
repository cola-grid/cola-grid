# Cola Grid 项目

## 项目结构
.
├── backend/           # Java 后端项目
│   ├── api           # API 模块：数据模型和接口定义
│   ├── core          # 核心模块：业务逻辑实现
│   └── web           # Web 模块：控制器和配置
└── frontend/         # React 前端项目
    └── packages/
        ├── api      # API 客户端
        ├── app      # 主应用
        └── shared   # 共享组件和工具

## 开发环境要求
- JDK 17+
- Node.js 18+
- pnpm 8+

## 启动说明

### 后端启动
```bash
cd backend
./mvnw spring-boot:run -pl web
```

### 前端启动
```bash
cd frontend
pnpm install
pnpm dev
```

## 技术栈
- 后端：Spring Boot 3.2.3
- 前端：React + Vite + TailwindCSS