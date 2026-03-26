const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static('public'));

// Dữ liệu tài liệu (Data Source)
const documents = [
    {
        id: "k8s-ingress",
        title: "Mastering K8s Ingress",
        category: "K8s",
        img: "https://raw.githubusercontent.com/kubernetes/kubernetes/master/logo/logo.png",
        desc: "Cách cấu hình Ingress Controller để quản lý traffic cho ứng dụng.",
        content: "<b>Lệnh kiểm tra log:</b> <br><code class='text-blue-400'>kubectl logs -f deployment/ingress-nginx -n ingress-nginx</code><br><br>Ingress giúp lộ trình hóa các request từ bên ngoài vào các Service bên trong Cluster thông qua các quy tắc (rules) Hostname hoặc Path."
    },
    {
        id: "vcr-deploy",
        title: "VNG Cloud Registry (VCR) Sync",
        category: "Cloud",
        img: "https://vngcloud.vn/documents/20126/0/logo-vng-cloud.png",
        desc: "Hướng dẫn đẩy và kéo Image từ VCR về VM nội bộ.",
        content: "Để sử dụng VCR trên VM khác, bạn cần login:<br><code class='text-blue-400'>docker login vcr.vngcloud.vn</code><br>Sau đó dùng lệnh <b>docker pull</b> để tải image về triển khai."
    },
    {
        id: "docker-optimize",
        title: "Optimize Docker Images",
        category: "Docker",
        img: "https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png",
        desc: "Giảm kích thước Image để deploy nhanh hơn lên Cloud.",
        content: "Sử dụng <b>Multi-stage build</b> trong Dockerfile để loại bỏ các dependencies dư thừa, giúp image nhẹ hơn đến 80%."
    }
];

// API Endpoints
app.get('/api/docs', (req, res) => res.json(documents));
app.get('/api/docs/:id', (req, res) => {
    const doc = documents.find(d => d.id === req.params.id);
    res.json(doc || { error: "Not found" });
});

// Routing
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));
app.get('/detail', (req, res) => res.sendFile(path.join(__dirname, 'public/detail.html')));

app.listen(port, () => {
    console.log(`🚀 v5 System đang chạy tại: http://localhost:${port}`);
});
