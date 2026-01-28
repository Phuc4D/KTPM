const express = require('express');
const app = express();
const port = 3005;

app.get('/product-detail', (req, res) => {
    console.log("[Kho] Đang chui xuống hầm tìm sách... (Đợi 3s)");
    
    // Giả lập độ trễ 3 giây (3000ms)
    setTimeout(() => {
        console.log("[Kho] Đã tìm thấy!");
        res.json({
            id: 1,
            name: "Laptop Gaming Xịn",
            price: 25000000,
            description: "Dữ liệu này lấy rất khó khăn mới có được"
        });
    }, 3000); 
});

app.listen(port, () => {
    console.log(`Slow Backend đang chạy tại port ${port}`);
});