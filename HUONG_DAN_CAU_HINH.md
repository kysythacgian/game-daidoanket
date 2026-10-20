# Hướng dẫn cấu hình từ đầu – Game "Đại Đoàn Kết" trên Cloudflare

Hướng dẫn này đi từ máy trống đến khi game chạy trực tuyến. Bạn không cần Google Sheet, Apps Script hay Ably nữa.

## 0. Bạn sẽ có gì sau khi làm xong

Một địa chỉ dạng `https://dai-doan-ket.<tên-của-bạn>.workers.dev` với các trang:

| Đường dẫn | Dùng cho |
|---|---|
| `/` | Điện thoại người chơi |
| `/tv.html` | Màn hình TV / máy chiếu |
| `/admin.html` | Quản trò (cần mã admin) |
| `/solo.html` | Chơi một mình, không cần máy chủ |

---

## 1. Chuẩn bị (làm một lần)

### 1.1 Tài khoản Cloudflare
1. Vào https://dash.cloudflare.com/sign-up và đăng ký (miễn phí).
2. Xác nhận email.

### 1.2 Cài Node.js
1. Tải bản **LTS** tại https://nodejs.org và cài đặt.
2. Mở Terminal (Windows: PowerShell hoặc Command Prompt) và kiểm tra:
   ```
   node -v
   npm -v
   ```
   Cả hai lệnh phải in ra số phiên bản. Nên dùng Node 20 trở lên.

---

## 2. Chuẩn bị mã nguồn

1. Giải nén `GameDaiDoanKet_Cloudflare.zip` ra một thư mục, ví dụ `GameDaiDoanKet`.
2. Mở Terminal tại thư mục đó (Windows: giữ Shift, chuột phải vào vùng trống → *Open in Terminal*; hoặc dùng `cd đường-dẫn-thư-mục`).
3. Cài thư viện:
   ```
   npm install
   ```

Cấu trúc thư mục:

```
GameDaiDoanKet/
├── public/          ← giao diện: index, tv, admin, solo, ảnh, câu hỏi
├── src/
│   ├── game.js      ← luật chơi
│   └── worker.js    ← máy chủ thời gian thực (WebSocket)
├── wrangler.toml    ← cấu hình Cloudflare
├── package.json
└── .dev.vars        ← mã admin khi chạy thử trên máy (KHÔNG đưa lên mạng)
```

---

## 3. Chạy thử trên máy

1. Mở file `.dev.vars` và đặt mã admin thử nghiệm:
   ```
   ADMIN_KEY=ma-admin-thu-nghiem
   ```
2. Chạy:
   ```
   npm run dev
   ```
3. Mở trình duyệt:
   - http://localhost:8787 → điện thoại (mở thêm vài tab để giả lập nhiều người)
   - http://localhost:8787/tv.html → TV
   - http://localhost:8787/admin.html → nhập mã ở bước 1
4. Thử một vòng: vào vài người chơi → admin bấm **BẮT ĐẦU** → xem TV có cập nhật ngay không.
5. Dừng bằng `Ctrl + C`.

> Muốn thử bằng điện thoại thật trong cùng Wi-Fi, bạn nên bỏ qua bước này và deploy luôn (mục 4) cho đơn giản.

---

## 4. Đưa lên Cloudflare

### 4.1 Đăng nhập
```
npx wrangler login
```
Trình duyệt mở ra, bấm **Allow** để cấp quyền. Quay lại Terminal khi thấy báo thành công.

### 4.2 Deploy
```
npm run deploy
```
- Lần đầu, Cloudflare có thể hỏi bạn đặt **tên miền con workers.dev** (ví dụ `ten-cua-ban`). Cứ nhập một tên tùy ý.
- Khi xong, Terminal in ra địa chỉ dạng:
  ```
  https://dai-doan-ket.ten-cua-ban.workers.dev
  ```
  Hãy lưu lại địa chỉ này.

### 4.3 Đặt mã admin thật (bắt buộc)
```
npx wrangler secret put ADMIN_KEY
```
Nhập mã admin mới khi được hỏi (ký tự bạn gõ sẽ không hiện ra, đó là bình thường), rồi nhấn Enter.

- Chưa đặt bước này thì **không ai đăng nhập admin được**.
- Mã này nằm trên Cloudflare, không nằm trong mã nguồn. Đừng dùng lại mã cũ `123456`.
- Muốn đổi mã sau này: chạy lại đúng lệnh trên.

### 4.4 Kiểm tra
Mở `https://…workers.dev/admin.html`, đăng nhập bằng mã vừa đặt. Mở `/tv.html` trên máy tính và `/` trên điện thoại để thử.

---

## 5. Cách tổ chức một buổi chơi

1. Mở `/tv.html` trên TV/máy chiếu. Màn hình chào mừng hiện địa chỉ để người chơi vào.
2. Người chơi mở địa chỉ trên điện thoại, nhập tên và bấm **THAM GIA** (tối đa 10 người).
3. Quản trò mở `/admin.html`, chọn chế độ rồi bấm **BẮT ĐẦU**:
   - **Tất cả cùng chơi:** ai cũng tự bấm QUAY trên điện thoại.
   - **Lần lượt từng người:** TV hiện câu hỏi của người đang chơi; có thể bật "Tự động chuyển lượt".
4. Muốn chơi lại: bấm **XOÁ TẤT CẢ** ở trang admin.
5. Người chơi bị mất kết nối chỉ cần nhập lại **đúng tên cũ** để khôi phục điểm và lượt.

---

## 6. Cập nhật sau khi sửa

| Muốn làm | Cách làm |
|---|---|
| Sửa câu hỏi | Sửa `public/questions.js` rồi chạy `npm run deploy` |
| Đổi giao diện / ảnh | Sửa trong `public/` rồi `npm run deploy` |
| Đổi số người tối đa, số câu mỗi lượt, thời gian xe chạy | Sửa `PER_TURN`, `DUR`, `MAX` ở đầu `src/game.js` rồi `npm run deploy` |
| Đổi mã admin | `npx wrangler secret put ADMIN_KEY` |

> Deploy lại **không** làm mất người chơi và điểm hiện tại. Nếu muốn bắt đầu sạch, dùng nút XOÁ TẤT CẢ ở admin.

---

## 7. (Tùy chọn) Tên miền riêng

1. Thêm tên miền của bạn vào Cloudflare (Dashboard → **Add a domain**).
2. Vào **Workers & Pages** → chọn `dai-doan-ket` → **Settings** → **Domains & Routes** → **Add** → **Custom domain**.
3. Nhập tên miền, ví dụ `game.tenmiencuaban.vn`.

---

## 8. (Tùy chọn) Tự động deploy từ GitHub

1. Đưa thư mục lên một kho GitHub (file `.gitignore` đã loại `.dev.vars`).
2. Vào Dashboard → **Workers & Pages** → **Create** → **Import a repository** và chọn kho.
3. Giữ nguyên lệnh build mặc định, lệnh deploy là `npx wrangler deploy`.
4. Sau đó vào **Settings** → **Variables and Secrets** → thêm secret `ADMIN_KEY`.

Từ đó, mỗi lần bạn đẩy mã lên GitHub, Cloudflare tự deploy.

---

## 9. Bảo mật

- **Thu hồi khóa Ably cũ** trên ably.com (khóa này từng nằm trong `rt.js` và đã bị lộ).
- Đổi mã admin, dùng mã dài và khó đoán.
- Không đưa file `.dev.vars` lên GitHub hay gửi cho người khác.
- Không chia sẻ trang `/admin.html` cho người chơi.

---

## 10. Xử lý sự cố

| Triệu chứng | Nguyên nhân thường gặp / cách xử lý |
|---|---|
| `npm` hoặc `node` không nhận lệnh | Chưa cài Node.js, hoặc cần mở lại Terminal sau khi cài |
| `wrangler login` không mở được trình duyệt | Sao chép đường link trong Terminal dán vào trình duyệt |
| Admin báo "Sai mã admin" | Chưa chạy `wrangler secret put ADMIN_KEY`, hoặc gõ sai mã |
| TV/điện thoại không cập nhật | Tải lại trang. Kiểm tra mạng. Nếu dùng tên miền riêng, hãy chắc chắn WebSockets không bị tắt (mặc định là bật) |
| Báo "Đã đủ 10 người chơi" | Admin bấm XOÁ TẤT CẢ hoặc ❌ Xoá từng người, hoặc tăng `MAX` trong `src/game.js` |
| Người chơi bị văng ra màn hình nhập tên | Admin vừa bấm XOÁ TẤT CẢ hoặc kick người đó; nhập lại tên để vào |
| Lỗi liên quan `new_sqlite_classes` khi deploy | Cập nhật wrangler: `npm install wrangler@latest` rồi deploy lại |
| Muốn xem nhật ký lỗi thời gian thực | `npx wrangler tail` |

---

## 11. Giới hạn cần biết

- Mỗi địa chỉ triển khai dùng **một phòng chơi duy nhất**. Muốn chơi nhiều phòng song song, hãy triển khai thêm một bản với tên khác (đổi `name` trong `wrangler.toml`).
- Gói miễn phí của Cloudflare có hạn mức số yêu cầu mỗi ngày. Với khoảng 10 người chơi thì dư dùng, nhưng bạn nên xem hạn mức hiện hành trong phần giá của Cloudflare Workers / Durable Objects trước các sự kiện lớn.
- Có thể xem trạng thái sử dụng tại Dashboard → **Workers & Pages** → `dai-doan-ket` → **Metrics**.
