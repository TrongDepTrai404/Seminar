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

// ---- Test bổ sung (mở rộng) ----
describe('POST /api/dang-ky - bổ sung', () => {
  test('thiếu MSSV → 400, không gọi DB', async () => {
    const res = await request(app).post('/api/dang-ky').send({ maLop: 'CSDL01' });

    expect(res.status).toBe(400);
    expect(db.timLop).not.toHaveBeenCalled();
  });

    test('không gửi body → 400, không gọi DB', async () => {
        const res = await request(app).post('/api/dang-ky');

        expect(res.status).toBe(400);
        expect(db.timLop).not.toHaveBeenCalled();
    });

  test('DB lỗi khi tìm lớp → 500, không lưu', async () => {
    db.timLop.mockRejectedValue(new Error('mất kết nối'));

    const res = await dangKy();

    expect(res.status).toBe(500);
    expect(db.themDangKy).not.toHaveBeenCalled();
  });

  test('DB lỗi khi lưu đăng ký → 500', async () => {
    db.timLop.mockResolvedValue(lop());
    db.themDangKy.mockRejectedValue(new Error('ghi thất bại'));

    const res = await dangKy();

    expect(res.status).toBe(500);
  });

  test('truyền đúng MSSV và mã lớp xuống DB', async () => {
    db.timLop.mockResolvedValue(lop());

    await dangKy();

    expect(db.timLop).toHaveBeenCalledWith('CSDL01');
    expect(db.layLopDaDangKy).toHaveBeenCalledWith('SV001');
  });

  test('biên sĩ số: còn đúng 1 chỗ (49/50) → vẫn đăng ký được', async () => {
    db.timLop.mockResolvedValue(lop({ siSo: 49, siSoToiDa: 50 }));

    const res = await dangKy();

    expect(res.status).toBe(201);
  });

  test('biên tín chỉ trên: tổng đúng 25 → 201, không cảnh báo', async () => {
    db.timLop.mockResolvedValue(lop()); // 3 tín chỉ
    db.layLopDaDangKy.mockResolvedValue([lop({ maLop: 'X', soTinChi: 22, thu: 5 })]);

    const res = await dangKy();

    expect(res.status).toBe(201);
    expect(res.body.canhBao).toBeNull();
  });

  test('biên tín chỉ dưới: tổng đúng 14 → 201, không cảnh báo', async () => {
    db.timLop.mockResolvedValue(lop()); // 3 tín chỉ
    db.layLopDaDangKy.mockResolvedValue([lop({ maLop: 'X', soTinChi: 11, thu: 5 })]);

    const res = await dangKy();

    expect(res.status).toBe(201);
    expect(res.body.canhBao).toBeNull();
  });

  test('cùng thứ nhưng tiết liền kề, không giao nhau (1-3 và 4-6) → không trùng', async () => {
    db.timLop.mockResolvedValue(lop()); // thứ 2, tiết 1-3
    db.layLopDaDangKy.mockResolvedValue([
      lop({ maLop: 'Y', soTinChi: 12, tietBatDau: 4, tietKetThuc: 6 }),
    ]);

    const res = await dangKy();

    expect(res.status).toBe(201);
  });
});
