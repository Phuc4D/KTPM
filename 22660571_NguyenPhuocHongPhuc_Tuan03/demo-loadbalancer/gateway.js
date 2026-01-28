const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 9000;

// Danh sách các Product Server đang chạy (Mô phỏng Availability)
const servers = ['http://127.0.0.1:3001', 'http://127.0.0.1:3002', 'http://127.0.0.1:3003'];
let current = 0;

app.get('/product', async (req, res) => {
    // Thuật toán Round Robin (Xoay vòng)
    const serverUrl = servers[current];
    current = (current + 1) % servers.length; // Tăng lên 1, nếu hết thì quay về 0

    try {
        console.log(`[Gateway] Đang điều hướng sang: ${serverUrl}`);
        const response = await axios.get(`${serverUrl}/products`);
        res.json(response.data);
    } catch (error) {
        // Đây là minh chứng cho việc xử lý lỗi (nếu server chết)
        console.log(`[Lỗi] Server ${serverUrl} bị chết! Thử server khác...`);
        // Trong thực tế sẽ code tự động gọi server khác, ở đây mình báo lỗi để dễ hiểu
        res.status(500).json({ error: `Server ${serverUrl} không phản hồi.` });
    }
});

app.get('/user', async (req, res) => {
    // User service chỉ có 1 cái, không load balance
    try {
        const response = await axios.get('http://localhost:4000/users');
        res.json(response.data);
    } catch (error) {
        res.status(500).send("User Service lỗi");
    }
});

app.listen(PORT, () => {
    console.log(`Gateway Load Balancer chạy tại http://localhost:${PORT}`);
});