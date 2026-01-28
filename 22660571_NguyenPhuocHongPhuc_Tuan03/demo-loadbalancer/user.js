const express = require('express');
const app = express();
const port = 4000;

app.get('/users', (req, res) => {
    console.log(`[User Service] Có người gọi vào Port ${port}`);
    res.json({
        message: "Đây là thông tin User",
        server_port: port
    });
});

app.listen(port, () => {
    console.log(`User Service đang chạy ở cổng ${port}`);
});