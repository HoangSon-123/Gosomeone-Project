# Gosomeone-Project

## Cách cài đặt:
- Cần cài đặt trước Node.JS 18.12.1 và Git

- Clone repo và cài đặt các thư viện: Mở terminal, gõ
```
git clone https://github.com/HoangSon-123/Gosomeone-Project
cd Gosomeone-Project
npm install
```

- Cấu hình môi trường: Vào thư mục src, tạo file .env có nội dung sau:

```
MONGODB_URL = # Connection string đến Mongodb
RTOKEN_SECRET = # PrivateKey cho jsonwebtoken
```

- Chạy server: Trở về terminal, gõ
```
npm start
```

- Đợi đến khi có thông báo
```
Server running at http://127.0.0.1:3000/
Đã kết nối đến MongoDB
```
thì người dùng có thể truy cập được vào trang web.