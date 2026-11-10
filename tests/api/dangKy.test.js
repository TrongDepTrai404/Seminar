// Người 3: API test cho đăng ký học phần (Supertest + mock DB)
const request = require('supertest');

// Thay "database" bằng hàm giả để tự quyết định dữ liệu trả về trong từng test
jest.mock('../../src/db');
const db = require('../../src/db');
const app = require('../../src/app');

const lop = (ghiDe = {}) => ({
  maLop: 'CSDL01', soTinChi: 3, siSo: 10, siSoToiDa: 50,
  thu: 2, tietBatDau: 1, tietKetThuc: 3,
  ...ghiDe,
});

const dangKy = (maLop = 'CSDL01') =>
  request(app).post('/api/dang-ky').send({ mssv: 'SV001', maLop });

beforeEach(() => {
  jest.resetAllMocks();
  db.layLopDaDangKy.mockResolvedValue([]);
  db.themDangKy.mockResolvedValue();
});

describe('POST /api/dang-ky', () => {
  test('lớp hợp lệ → 201 và lưu vào DB', async () => {
    db.timLop.mockResolvedValue(lop());
    db.layLopDaDangKy.mockResolvedValue([lop({ maLop: 'X', soTinChi: 12, thu: 5 })]);

    const res = await dangKy();

    expect(res.status).toBe(201);
    expect(db.themDangKy).toHaveBeenCalledWith('SV001', 'CSDL01');
  });

  test('thiếu mã lớp → 400', async () => {
    const res = await request(app).post('/api/dang-ky').send({ mssv: 'SV001' });
    expect(res.status).toBe(400);
  });

  test('lớp không tồn tại → 404', async () => {
    db.timLop.mockResolvedValue(null);
    const res = await dangKy('KHONGCO');
    expect(res.status).toBe(404);
  });

  test('lớp đã đầy → 409, không lưu', async () => {
    db.timLop.mockResolvedValue(lop({ siSo: 50, siSoToiDa: 50 }));

    const res = await dangKy();

    expect(res.status).toBe(409);
    expect(res.body.message).toBe('Lớp đã đầy');
    expect(db.themDangKy).not.toHaveBeenCalled();
  });

  test('đăng ký trùng lớp đã có → 409', async () => {
    db.timLop.mockResolvedValue(lop());
    db.layLopDaDangKy.mockResolvedValue([lop()]);

    const res = await dangKy();

    expect(res.status).toBe(409);
  });

  test('trùng lịch với lớp khác → 409 và báo tên lớp', async () => {
    db.timLop.mockResolvedValue(lop());
    db.layLopDaDangKy.mockResolvedValue([lop({ maLop: 'HDH01', tietBatDau: 2, tietKetThuc: 4 })]);

    const res = await dangKy();

    expect(res.status).toBe(409);
    expect(res.body.message).toContain('HDH01');
    expect(db.themDangKy).not.toHaveBeenCalled();
  });

  test('vượt số tín chỉ tối đa → 400', async () => {
    db.timLop.mockResolvedValue(lop());
    db.layLopDaDangKy.mockResolvedValue([lop({ maLop: 'X', soTinChi: 23, thu: 7 })]);

    const res = await dangKy();

    expect(res.status).toBe(400);
  });

  test('chưa đủ tín chỉ tối thiểu → vẫn 201 nhưng có cảnh báo', async () => {
    db.timLop.mockResolvedValue(lop());

    const res = await dangKy();

    expect(res.status).toBe(201);
    expect(res.body.canhBao).toBeTruthy();
  });
});
