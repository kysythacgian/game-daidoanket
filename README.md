# Đại Đoàn Kết – bản Cloudflare (thời gian thực bằng Durable Objects)

Thay Google Sheet + Apps Script + Ably bằng 1 Worker duy nhất. Không cần `config.js`, không cần khóa Ably.

## Chạy thử trên máy
```
npm install
npm run dev
```
Mở http://localhost:8787 (điện thoại), /tv.html (TV), /admin.html (mã admin trong `.dev.vars`).

## Đưa lên Cloudflare
```
npx wrangler login
npm run deploy
npx wrangler secret put ADMIN_KEY     # nhập mã admin mới, đủ mạnh
```
(Hoặc đẩy lên GitHub rồi kết nối ở Cloudflare Dashboard → Workers & Pages → Create → Import a repository.)

## Cấu trúc
- `public/` – giao diện (index, tv, admin, solo, ảnh, câu hỏi)
- `src/game.js` – luật chơi (chuyển từ Code_v1.gs)
- `src/worker.js` – Durable Object `Room` + WebSocket tại `/ws`

## Nên làm
- Thu hồi khóa Ably cũ (đã bị lộ trong rt.js) trên ably.com.
- Đổi mã admin 123456; không dùng lại mã cũ.
