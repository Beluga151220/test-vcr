const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('<h1>Chào Longnn7! Website đã chạy thành công qua Docker và VCR.</h1>');
});

app.listen(port, () => {
  console.log(`Web đang chạy tại http://localhost:${port}`);
});
