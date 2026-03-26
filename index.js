const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static('public'));

// Dữ liệu tài liệu mẫu (Bạn có thể thêm bớt ở đây)
const documents = [
    { title: "Cài đặt Ubuntu trên VMware", category: "Ảo hóa", link: "#", desc: "Hướng dẫn chi tiết cài đặt Ubuntu 22.04 LTS." },
    { title: "Docker Cơ Bản cho người mới", category: "Docker", link: "#", desc: "Cách viết Dockerfile và quản lý Container." },
    { title: "Kubernetes Architecture", category: "K8s", link: "#", desc: "Tìm hiểu về Control Plane và Worker Node." },
    { title: "Triển khai Ingress Controller", category: "K8s", link: "#", desc: "Cấu hình Load Balancer cho cụm K8s." },
    { title: "Tối ưu hóa tài nguyên VM", category: "Ảo hóa", link: "#", desc: "Cách cấu hình vCPU và RAM hiệu quả." },
    { title: "CI/CD với GitHub Actions", category: "DevOps", link: "#", desc: "Tự động build và push image lên VCR." }
];

// API để web lấy dữ liệu tài liệu
app.get('/api/docs', (req, res) => {
    res.json(documents);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, () => {
    console.log(`Thư viện tài liệu chạy tại http://localhost:${port}`);
});
