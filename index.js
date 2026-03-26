const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Cấu hình để NodeJS hiểu các file tĩnh (hình ảnh, css)
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, () => {
  console.log(`Web đẹp đang chạy tại http://localhost:${port}`);
});
