// API test cho danh sách lớp học phần (Supertest + mock DB)
const request = require('supertest');

jest.mock('../../src/db');
const db = require('../../src/db');
const app = require('../../src/app');

beforeEach(() => jest.resetAllMocks());

describe('GET /api/lop-hoc-phan', () => {
  test('trả về danh sách lớp → 200', async () => {
    db.layDanhSachLop.mockResolvedValue([
      { maLop: 'CSDL01', tenMon: 'Cơ sở dữ liệu', siSo: 10, siSoToiDa: 50 },
    ]);

    const res = await request(app).get('/api/lop-hoc-phan');

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].maLop).toBe('CSDL01');
  });

  test('DB lỗi → 500', async () => {
    db.layDanhSachLop.mockRejectedValue(new Error('mất kết nối'));

    const res = await request(app).get('/api/lop-hoc-phan');

    expect(res.status).toBe(500);
  });
});
