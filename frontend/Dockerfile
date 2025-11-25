# 多阶段构建 Dockerfile
# 阶段1: 构建 React 应用
FROM node:18-alpine AS builder

WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制所有文件
COPY . .

# 接收构建参数
ARG REACT_APP_API_HOST
ENV REACT_APP_API_HOST=$REACT_APP_API_HOST

# 调试：显示 API_HOST 值
RUN echo "🔍 Building with API_HOST: $REACT_APP_API_HOST"

# 构建生产版本
RUN npm run build

# 阶段2: 使用 Nginx 提供静态文件
FROM nginx:alpine

# 复制构建产物
COPY --from=builder /app/build /usr/share/nginx/html

# 复制 Nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]
