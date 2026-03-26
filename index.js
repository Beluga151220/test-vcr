const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static('public'));

// KHO DỮ LIỆU TÀI LIỆU ĐA NGÀNH
const documents = [
    // --- LĨNH VỰC KUBERNETES (K8s) ---
    { 
        id: "k8s-arch", 
        title: "Kubernetes Architecture Deep Dive", 
        category: "K8s", 
        img: "https://raw.githubusercontent.com/kubernetes/kubernetes/master/logo/logo.png",
        desc: "Phân tích chi tiết các thành phần Control Plane và Worker Node.",
        content: "Kubernetes là một hệ thống điều phối container... <br><b>Các thành phần chính:</b> <ul><li>kube-apiserver</li><li>etcd</li><li>kube-scheduler</li><li>kube-controller-manager</li></ul>"
    },
    { 
        id: "k8s-helm", 
        title: "Quản lý Package với Helm Chart", 
        category: "K8s", 
        img: "https://helm.sh/img/helm.svg",
        desc: "Cách đóng gói và triển khai ứng dụng K8s bằng Helm.",
        content: "Helm giúp bạn quản lý các tài nguyên K8s một cách tập trung thông qua các template..."
    },

    // --- LĨNH VỰC DOCKER ---
    { 
        id: "docker-sec", 
        title: "Bảo mật Docker Container", 
        category: "Docker", 
        img: "https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png",
        desc: "10 quy tắc vàng để bảo mật Image và Runtime.",
        content: "Đừng bao giờ chạy container với quyền root. Hãy sử dụng lệnh USER trong Dockerfile..."
    },
    { 
        id: "docker-compose", 
        title: "Docker Compose cho Microservices", 
        category: "Docker", 
        img: "https://www.docker.com/wp-content/uploads/2022/03/vertical-logo-monochrome.png",
        desc: "Cách kết nối nhiều container (Web, DB, Redis) chỉ với 1 file YAML.",
        content: "Docker Compose giúp định nghĩa và chạy các ứng dụng đa container..."
    },

    // --- LĨNH VỰC TRÍ TUỆ NHÂN TẠO (AI) ---
    { 
        id: "ai-llm", 
        title: "Tổng quan về Large Language Models (LLM)", 
        category: "AI", 
        img: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
        desc: "Tìm hiểu cách ChatGPT và các mô hình ngôn ngữ lớn vận hành.",
        content: "LLM dựa trên kiến trúc Transformer... <br><b>Ứng dụng:</b> Dịch thuật, viết code, tóm tắt văn bản."
    },
    { 
        id: "ai-python", 
        title: "Python cho Data Science", 
        category: "AI", 
        img: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
        desc: "Sử dụng Pandas, Numpy và Scikit-learn để phân tích dữ liệu.",
        content: "Python là ngôn ngữ số 1 trong AI nhờ hệ sinh thái thư viện phong phú..."
    },

    // --- LĨNH VỰC CLOUD (VNG CLOUD) ---
    { 
        id: "cloud-vcr", 
        title: "Làm chủ VNG Cloud Registry (VCR)", 
        category: "Cloud", 
        img: "https://vngcloud.vn/documents/20126/0/logo-vng-cloud.png",
        desc: "Hướng dẫn quản lý Image Container trên hạ tầng Việt Nam.",
        content: "VCR cung cấp khả năng lưu trữ image bảo mật, tốc độ cao cho các cụm K8s tại VNG Cloud."
    },

    // --- LĨNH VỰC DEVOPS ---
    { 
        id: "devops-cicd", 
        title: "Xây dựng Pipeline CI/CD hoàn chỉnh", 
        category: "DevOps", 
        img: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Git_icon.svg",
        desc: "Tự động hóa từ khâu Code -> Test -> Build -> Deploy.",
        content: "Sử dụng GitHub Actions kết hợp với Docker để đẩy code tự động lên production."
    }
];

// CÁC ĐƯỜNG DẪN API
app.get('/api/docs', (req, res) => res.json(documents));

app.get('/api/docs/:id', (req, res) => {
    const doc = documents.find(d => d.id === req.params.id);
    if (!doc) return res.status(404).send("Không tìm thấy tài liệu");
    res.json(doc);
});

// ROUTING GIAO DIỆN
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));
app.get('/detail', (req, res) => res.sendFile(path.join(__dirname, 'public/detail.html')));

app.listen(port, () => {
    console.log(`Server đa ngành đang chạy tại: http://localhost:${port}`);
});
