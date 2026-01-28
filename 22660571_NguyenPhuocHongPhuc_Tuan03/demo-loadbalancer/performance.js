const express = require('express');
const app = express();

// Đây là Cache (Bộ nhớ tạm trên RAM)
const cache = {}; 

// Hàm giả vờ Database siêu chậm (phải đợi 3 giây mới xong)
function databaseQuery() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("MacBook Pro M3 Max"); // Dữ liệu lấy được
        }, 3000); // Giả lập độ trễ 3000ms (3 giây)
    });
}

app.get('/san-pham', async (req, res) => {
    // BẮT ĐẦU BẤM GIỜ
    const start = Date.now(); 

    // 1. Kiểm tra xem trong Cache có hàng chưa?
    if (cache['macbook']) {
        const end = Date.now(); // Dừng bấm giờ
        
        // In ra dòng này để chụp ảnh minh chứng
        console.log(`⚡ [SIÊU NHANH] Lấy từ Cache chỉ mất: ${end - start}ms`);
        
        return res.json({
            sanpham: cache['macbook'],
            nguon: "Lấy từ Cache (RAM) - Nhanh như điện"
        });
    }

    // 2. Nếu chưa có, phải chui vào Database lấy (Rất lâu)
    console.log("🐢 [RẤT CHẬM] Đang chui vào Database tìm dữ liệu...");
    const data = await databaseQuery();

    // 3. Lấy xong thì nhớ LƯU VÀO CACHE để lần sau dùng
    cache['macbook'] = data;

    const end = Date.now(); // Dừng bấm giờ
    
    // In ra dòng này để chụp ảnh minh chứng
    console.log(`🐢 [RẤT CHẬM] Lấy từ Database mất: ${end - start}ms`);

    res.json({
        sanpham: data,
        nguon: "Lấy từ Database - Chậm như rùa"
    });
});

app.listen(3005, () => console.log("Demo Performance đang chạy ở port 3005..."));