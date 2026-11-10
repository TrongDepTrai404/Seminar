# Demo kiểm thử tự động – Hệ thống đăng ký học phần thu nhỏ

Project demo cho seminar **"Kiểm thử tự động"**. Đây là một hệ thống đăng ký học phần thu nhỏ (đăng nhập + đăng ký lớp), xây dựng để minh họa đủ 3 tầng của kim tự tháp kiểm thử. Không cần cài database: dữ liệu được giả lập trong bộ nhớ.

| Tầng | Công cụ | Thư mục | Số test |
|---|---|---|---|
| Unit test | Jest | `tests/unit/` | 13 |
| API (integration) test | Jest + Supertest | `tests/api/` | 13 |
| E2E test | Playwright | `e2e/` | 5 |
| Tự chạy khi push | GitHub Actions | `.github/workflows/ci.yml` | |

## 1. Cài đặt và chạy

Cần Node.js 20 trở lên.

```bash
npm install                  # cài thư viện
npx playwright install       # tải trình duyệt cho Playwright (chỉ làm 1 lần)

npm test                     # chạy unit test + API test
npm run test:coverage        # như trên + báo cáo độ phủ (mở coverage/index.html)
npm run test:e2e             # chạy E2E test (Playwright tự bật server)
npm run test:e2e:headed      # E2E nhưng HIỆN trình duyệt -> dùng khi demo
npx playwright show-report   # xem báo cáo E2E dạng web
```

Chạy thử web bằng tay:

```bash
npm start                    # mở http://localhost:3000/login.html
```

Dữ liệu mẫu (mỗi lần bật server là dữ liệu mới):
- Tài khoản: **SV001 / 123456**
- Lớp **CSDL01**: còn chỗ · **CNPM01**: đã đầy · **HDH01**: trùng lịch với CSDL01

## 2. Cấu trúc

```
src/
  app.js              tạo app + gắn route (KHÔNG listen) -> Supertest dùng cái này
  server.js           chỉ gọi app.listen
  db.js               "database" giả trong bộ nhớ
  routes/             API đăng nhập, đăng ký học phần
  utils/              logic thuần: trùng lịch, giới hạn tín chỉ -> unit test
public/               login.html, trang-chu.html
tests/unit/           unit test
tests/api/            API test
e2e/                  E2E test
.github/workflows/    GitHub Actions
```

Hai điểm thiết kế để test được, nên nhắc trong báo cáo:
- **Tách `app.js` khỏi `server.js`:** Supertest gọi thẳng vào app mà không cần bật server.
- **Route không tự đọc dữ liệu mà gọi qua `db.js`:** API test chỉ cần `jest.mock('../../src/db')` là tự quyết định được dữ liệu cho từng tình huống (lớp đầy, trùng lịch, lỗi DB…).

## 3. Phân công theo file

| Người | Việc | File |
|---|---|---|
| 1 | Lý thuyết, mục 1–2 báo cáo | (báo cáo) |
| 2 | Bảng test case giá trị biên, unit test | `src/utils/`, `tests/unit/` |
| 3 | API test, giải thích mock | `src/app.js`, `src/db.js`, `tests/api/` |
| 4 | E2E test, quay video dự phòng | `e2e/`, `playwright.config.js` |
| 5 (nhóm trưởng) | GitHub Actions, coverage, ráp báo cáo + slide | `.github/workflows/ci.yml` |

Mỗi người: chạy được phần của mình, hiểu từng test để giải thích, chụp ảnh kết quả cho báo cáo. Muốn thêm điểm thì viết thêm vài test case.

## 4. Bảng test case giá trị biên (cho báo cáo)

Giới hạn mẫu 14–25 tín chỉ, đổi trong `src/utils/tinChi.js` nếu muốn.

| Tổng tín chỉ sau khi đăng ký | Kết quả mong đợi |
|---|---|
| 13 | Cho đăng ký, cảnh báo dưới mức tối thiểu |
| 14 | Hợp lệ (biên dưới) |
| 15 | Hợp lệ |
| 24 | Hợp lệ |
| 25 | Hợp lệ (biên trên) |
| 26 | Từ chối |

## 5. Kịch bản demo khoảng 5 phút

1. `npm test` → 26 test xanh.
2. Mở `src/utils/lichHoc.js`, cố ý sửa dòng
   `b.tietBatDau <= a.tietKetThuc` thành `b.tietBatDau < a.tietKetThuc`.
3. `npm test` → **1 test đỏ**: "cùng thứ, chạm nhau đúng 1 tiết (biên) → trùng". Ý cần nói: test bắt được lỗi biên mà test tay rất dễ bỏ sót.
4. Sửa lại → xanh.
5. `npm run test:e2e:headed` → trình duyệt tự đăng nhập, đăng ký lớp, bị chặn khi lớp đầy và khi trùng lịch.
6. `npm run test:coverage` → mở `coverage/index.html` cho xem độ phủ (~98%).
7. Mở tab **Actions** trên GitHub cho xem pipeline tự chạy.
