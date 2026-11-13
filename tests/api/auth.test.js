// Người 3: API test cho đăng nhập (Supertest + mock DB)
const request = require('supertest');

// Thay "database" bằng hàm giả để tự quyết định dữ liệu trả về trong từng test
jest.mock('../../src/db');
const db = require('../../src/db');
const app = require('../../src/app');

beforeEach(() => jest.resetAllMocks());

describe('POST /api/auth/login', () => {
  test('đúng MSSV và mật khẩu → 200 + thông tin sinh viên', async () => {
    db.timSinhVien.mockResolvedValue({ mssv: 'SV001', hoTen: 'Nguyễn Văn A', matKhau: '123456' });

    const res = await request(app)
      .post('/api/auth/login')
      .send({ mssv: 'SV001', matKhau: '123456' });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ mssv: 'SV001', hoTen: 'Nguyễn Văn A' });
  });

  test('sai mật khẩu → 401', async () => {
    db.timSinhVien.mockResolvedValue({ mssv: 'SV001', hoTen: 'Nguyễn Văn A', matKhau: '123456' });

    const res = await request(app)
      .post('/api/auth/login')
      .send({ mssv: 'SV001', matKhau: 'sai' });

    expect(res.status).toBe(401);
  });

  test('MSSV không tồn tại → 401', async () => {
    db.timSinhVien.mockResolvedValue(null);

    const res = await request(app)
      .post('/api/auth/login')
      .send({ mssv: 'KHONGCO', matKhau: '123456' });

    expect(res.status).toBe(401);
  });

  test('bỏ trống trường → 400, không gọi DB', async () => {
    const res = await request(app).post('/api/auth/login').send({ mssv: 'SV001' });

    expect(res.status).toBe(400);
    expect(db.timSinhVien).not.toHaveBeenCalled();
  });

  test('DB lỗi → 500', async () => {
    db.timSinhVien.mockRejectedValue(new Error('mất kết nối'));

    const res = await request(app)
      .post('/api/auth/login')
      .send({ mssv: 'SV001', matKhau: '123456' });

    expect(res.status).toBe(500);
  });
});

// ---- Test bổ sung (mở rộng) ----
describe('POST /api/auth/login - bổ sung', () => {
  test('thiếu MSSV (chỉ có mật khẩu) → 400, không gọi DB', async () => {
    const res = await request(app).post('/api/auth/login').send({ matKhau: '123456' });

    expect(res.status).toBe(400);
    expect(db.timSinhVien).not.toHaveBeenCalled();
  });

  test('chuỗi rỗng → 400, không gọi DB', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ mssv: '', matKhau: '' });

    expect(res.status).toBe(400);
    expect(db.timSinhVien).not.toHaveBeenCalled();
  });

  test('không gửi body → 400, không gọi DB', async () => {
    const res = await request(app).post('/api/auth/login');

    expect(res.status).toBe(400);
    expect(db.timSinhVien).not.toHaveBeenCalled();
  });

  test('đăng nhập thành công → hỏi DB đúng MSSV và KHÔNG trả mật khẩu về', async () => {
    db.timSinhVien.mockResolvedValue({ mssv: 'SV001', hoTen: 'Nguyễn Văn A', matKhau: '123456' });

    const res = await request(app)
      .post('/api/auth/login')
      .send({ mssv: 'SV001', matKhau: '123456' });

    expect(db.timSinhVien).toHaveBeenCalledWith('SV001');
    expect(res.body).not.toHaveProperty('matKhau');
  });
});
