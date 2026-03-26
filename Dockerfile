# Sử dụng image node nhẹ
FROM node:18-alpine

# Tạo thư mục làm việc trong container
WORKDIR /app

# Copy file quản lý thư viện trước
COPY package*.json ./
RUN npm install

# Copy toàn bộ code vào
COPY . .

# Web chạy port 3000
EXPOSE 3000

# Lệnh khởi chạy
CMD ["node", "index.js"]
