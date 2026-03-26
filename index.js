const express = require('express');
const path = require('path');
const os = require('os');
const morgan = require('morgan'); // Cần chạy: npm install morgan

const app = express();
const PORT = process.env.PORT || 3000;

// --- MIDDLEWARE ---
// Log các request đến terminal (rất quan trọng khi check log pod trong K8s)
app.use(morgan('combined')); 
app.use(express.static('public'));
app.use(express.json());

// --- DỮ LIỆU TÀI LIỆU MỞ RỘNG (Dài hơn để khớp với giao diện) ---
const documents = [
    { 
        id: "vcr-mastery", 
        title: "VNG Cloud Registry v2", 
        category: "Cloud", 
        img: "https://vngcloud.vn/documents/20126/0/logo-vng-cloud.png", 
        desc: "Tối ưu hóa tốc độ pull/push image trên hạ tầng VCR mới nhất.", 
        content: "Sử dụng <b>Content Trust</b> để đảm bảo image không bị thay đổi. Lệnh login: <br><code class='text-blue-400'>docker login vcr.vngcloud.vn</code>" 
    },
    { 
        id: "k8s-ingress-advanced", 
        title: "Advanced Ingress Routing", 
        category: "K8s", 
        img: "https://raw.githubusercontent.com/kubernetes/kubernetes/master/logo/logo.png", 
        desc: "Cấu hình SSL/TLS tự động với Cert-Manager trên K8s.", 
        content: "Ingress Controller giúp chuyển hướng traffic thông minh. <br><b>Annotaions quan trọng:</b> <br><code>nginx.ingress.kubernetes.io/rewrite-target: /</code>" 
    },
    { 
        id: "docker-multi-stage", 
        title: "Multi-stage Build v5", 
        category: "Docker", 
        img: "https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png", 
        desc: "Giảm kích thước Image từ 1GB xuống còn 50MB.", 
        content: "Sử dụng <code>node:18-alpine</code> làm nền tảng để tối ưu bảo mật và dung lượng." 
    },
    { 
        id: "helm-charts", 
        title: "Helm Charts Deployment", 
        category: "DevOps", 
        img: "https://helm.sh/img/helm.svg", 
        desc: "Quản lý phiên bản triển khai (Releases) chuyên nghiệp.", 
        content: "Helm giúp bạn định nghĩa, cài đặt và nâng cấp các ứng dụng K8s phức tạp nhất." 
    },
    { 
        id: "terraform-vng", 
        title: "Terraform with VNG Cloud", 
        category: "IaC", 
        img: "https://www.terraform.io/img/logo-hashicorp.svg", 
        desc: "Khởi tạo VM và Network tự động bằng code.", 
        content: "Infrastructure as Code giúp bạn tái sử dụng hạ tầng trên nhiều vùng (Region) khác nhau." 
    }
];

// --- CÁC API MỚI (DÀNH CHO MONITORING) ---

// 1. API lấy danh sách tài liệu
app.get('/api/docs', (req, res) => res.json(documents));

// 2. API lấy chi tiết 1 tài liệu
app.get('/api/docs/:id', (req, res) => {
    const doc = documents.find(d => d.id === req.params.id);
    if (!doc) return res.status(404).json({ error: "Không thấy tài liệu" });
    res.json(doc);
});

// 3. API lấy thông tin hệ thống (Để hiện lên Dashboard cho "khủng")
app.get('/api/sysinfo', (req, res) => {
    res.json({
        hostname: os.hostname(),
        platform: os.platform(),
        uptime: Math.floor(os.uptime()) + "s",
        cpuModel: os.cpus()[0].model,
        totalMem: (os.totalmem() / 1024 / 1024 / 1024).toFixed(2) + " GB",
        freeMem: (os.freemem() / 1024 / 1024 / 1024).toFixed(2) + " GB"
    });
});

// 4. Health Check Endpoint (BẮT BUỘC cho Kubernetes Liveness/Readiness Probe)
app.get('/healthz', (req, res) => {
    res.status(200).send('Healthy');
});

// --- ROUTING GIAO DIỆN ---
app.get('/detail', (req, res) => res.sendFile(path.join(__dirname, 'public/detail.html')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

// --- KHỞI CHẠY ---
app.listen(PORT, () => {
    console.log(`
    =========================================
    🚀 CLOUDOPS V5 SERVER IS RUNNING
    -----------------------------------------
    🔗 URL: http://localhost:${PORT}
    🏠 Hostname: ${os.hostname()}
    🏥 Health: http://localhost:${PORT}/healthz
    =========================================
    `);
});
