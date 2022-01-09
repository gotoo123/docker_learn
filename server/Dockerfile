FROM node

ENV NODE_ENV=docker

# 指定工作目录
RUN mkdir -p /app/sever
WORKDIR /app/server

# 复制 package.json 相关文件
COPY ["package.json", "package-lock.json*", "./"]

# 安装依赖
RUN npm install

# 复制工程
COPY . .

EXPOSE 4200

# 入口
CMD ["npm", "run", "start"]