const express = require('express');
const app = express();
const cache = {}; // Bộ nhớ đệm (RAM)

// Giả lập Database chậm
function databaseQuery() {
    return new Promise(resolve => setTimeout(() => resolve("Laptop Gaming Xịn"), 3000));
}

app.get('/san-pham', async (req, res) => {
    const start = Date.now();

    // 1. Kiểm tra Cache
    if (cache['laptop']) {
        const end = Date.now();
        console.log(`⚡ [FAST] Lấy từ Cache mất: ${end - start}ms`);
        return res.send(`Sản phẩm: ${cache['laptop']} (Cache)`);
    }

    // 2. Nếu không có, gọi DB (Chậm)
    console.log("🐢 [SLOW] Đang gọi DB...");
    const data = await databaseQuery();
    cache['laptop'] = data; // Lưu vào cache

    const end = Date.now();
    console.log(`🐢 [SLOW] Lấy từ DB mất: ${end - start}ms`);
    res.send(`Sản phẩm: ${data} (DB)`);
});

app.listen(3005, () => console.log("Demo Performance chạy port 3005"));