const express = require('express');
const app = express();
// Lấy port từ câu lệnh chạy (để chạy được nhiều cái giống nhau)
const port = process.argv[2] || 3001; 

app.get('/products', (req, res) => {
    // In ra màn hình console để chụp ảnh minh chứng
    console.log(`[Product Service] Có người gọi vào Port ${port}`);
    res.json({
        message: "Đây là danh sách sản phẩm",
        server_port: port // Trả về port để biết server nào đang phục vụ
    });
});

app.listen(port, () => {
    console.log(`Product Service đang chạy ở cổng ${port}`);
});