// Gọi các hàm từ file validator.js sang để kiểm tra
const { 
  isValidEmail, 
  validatePassword, 
  isValidCreditLimit, 
  hasScheduleConflict 
} = require('../../src/utils/validator');


// test email
test('Email hop le (co chua chu @) phai tra ve true', () => {
  let ketQua = isValidEmail("sinhvien@gmail.com");
  expect(ketQua).toBe(true);
});

test('Email khong hop le (khong co chu @) phai tra ve false', () => {
  let ketQua = isValidEmail("sinhvien.gmail.com");
  expect(ketQua).toBe(false);
});


// test mật khẩu
test('Mat khau duoi 6 ky tu (5 ky tu) phai la false', () => {
  let ketQua = validatePassword("12345"); // 5 ký tự
  expect(ketQua).toBe(false);
});

test('Mat khau dung 6 ky tu phai la true', () => {
  let ketQua = validatePassword("123456"); // 6 ký tự
  expect(ketQua).toBe(true);
});

test('Mat khau dung 20 ky tu phai la true', () => {
  let matKhau20 = "12345678901234567890"; // 20 ký tự
  let ketQua = validatePassword(matKhau20);
  expect(ketQua).toBe(true);
});

test('Mat khau tren 20 ky tu (21 ky tu) phai la false', () => {
  let matKhau21 = "123456789012345678901"; // 21 ký tự
  let ketQua = validatePassword(matKhau21);
  expect(ketQua).toBe(false);
});


// test tín chỉ
test('Dang ky 11 tin chi (duoi 12) phai la false', () => {
  let ketQua = isValidCreditLimit(11);
  expect(ketQua).toBe(false);
});

test('Dang ky 12 tin chi (dung muc toi thieu) phai la true', () => {
  let ketQua = isValidCreditLimit(12);
  expect(ketQua).toBe(true);
});

test('Dang ky 24 tin chi (dung muc toi da) phai la true', () => {
  let ketQua = isValidCreditLimit(24);
  expect(ketQua).toBe(true);
});

test('Dang ky 25 tin chi (vuot qua 24) phai la false', () => {
  let ketQua = isValidCreditLimit(25);
  expect(ketQua).toBe(false);
});


// test trùng lịch học
test('Kiem tra khi bi trung ca Thu va Tiet hoc', () => {
  let danhSachDaDangKy = [
    { day: 2, period: "1-3" }
  ];
  
  let monHocMoi = { day: 2, period: "1-3" }; // Trùng lịch

  let ketQua = hasScheduleConflict(monHocMoi, danhSachDaDangKy);
  expect(ketQua).toBe(true);
});

test('Kiem tra khi khong bi trung lich hoc', () => {
  let danhSachDaDangKy = [
    { day: 2, period: "1-3" }
  ];
  
  let monHocMoi = { day: 3, period: "4-6" }; // Không trùng

  let ketQua = hasScheduleConflict(monHocMoi, danhSachDaDangKy);
  expect(ketQua).toBe(false);
});