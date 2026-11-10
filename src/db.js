// "Cơ sở dữ liệu" giả lưu trong bộ nhớ (mỗi lần bật server là dữ liệu mới).
// Route chỉ gọi các hàm ở đây -> khi test API chỉ cần mock file này.
// Tài khoản mẫu: SV001 / 123456
// CSDL01: còn chỗ | CNPM01: đã đầy | HDH01: trùng lịch với CSDL01
const sinhVien = [
  { mssv: 'SV001', hoTen: 'Nguyễn Văn A', matKhau: '123456' },
];

const lopHocPhan = [
  { maLop: 'CSDL01', soTinChi: 3, siSo: 10, siSoToiDa: 50, thu: 2, tietBatDau: 1, tietKetThuc: 3 },
  { maLop: 'CNPM01', soTinChi: 3, siSo: 50, siSoToiDa: 50, thu: 3, tietBatDau: 1, tietKetThuc: 3 },
  { maLop: 'HDH01', soTinChi: 3, siSo: 5, siSoToiDa: 50, thu: 2, tietBatDau: 2, tietKetThuc: 4 },
];

let dangKy = []; // { mssv, maLop }

async function timSinhVien(mssv) {
  return sinhVien.find((s) => s.mssv === mssv) || null;
}

async function timLop(maLop) {
  return lopHocPhan.find((l) => l.maLop === maLop) || null;
}

async function layLopDaDangKy(mssv) {
  return dangKy
    .filter((d) => d.mssv === mssv)
    .map((d) => lopHocPhan.find((l) => l.maLop === d.maLop));
}

async function themDangKy(mssv, maLop) {
  dangKy.push({ mssv, maLop });
  lopHocPhan.find((l) => l.maLop === maLop).siSo += 1;
}

module.exports = { timSinhVien, timLop, layLopDaDangKy, themDangKy };
