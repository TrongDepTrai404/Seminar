// Import các hàm từ file validator.js sang để test
const { 
  isValidEmail, 
  validatePassword, 
  isValidCreditLimit, 
  hasScheduleConflict 
} = require('../../src/utils/validator');

// 1. Test hàm kiểm tra email
test('Kiem tra email hop le', () => {
  let ketQua = isValidEmail("sinhvien@gmail.com");
  expect(ketQua).toBe(true);
});

test('Kiem tra email khong hop le', () => {
  let ketQua = isValidEmail("abcxyz");
  expect(ketQua).toBe(false);
});


// 2. Test hàm kiểm tra mật khẩu (giá trị biên: 6 đến 20 ký tự)
test('Mat khau duoi 6 ky tu phai la sai', () => {
  let ketQua = validatePassword("12345"); // 5 ký tự
  expect(ketQua).toBe(false);
});

test('Mat khau dung 6 ky tu phai la dung', () => {
  let ketQua = validatePassword("123456"); // 6 ký tự
  expect(ketQua).toBe(true);
});

test('Mat khau dung 20 ky tu phai la dung', () => {
  let matKhau20 = "12345678901234567890"; // 20 ký tự
  let ketQua = validatePassword(matKhau20);
  expect(ketQua).toBe(true);
});

test('Mat khau tren 20 ky tu phai la sai', () => {
  let matKhau21 = "123456789012345678901"; // 21 ký tự
  let ketQua = validatePassword(matKhau21);
  expect(ketQua).toBe(false);
});


// 3. Test hàm kiểm tra số tín chỉ (giá trị biên: 12 đến 24 tín chỉ)
test('Dang ky 11 tin chi la sai', () => {
  let ketQua = isValidCreditLimit(11);
  expect(ketQua).toBe(false);
});

test('Dang ky 12 tin chi la dung', () => {
  let ketQua = isValidCreditLimit(12);
  expect(ketQua).toBe(true);
});

test('Dang ky 24 tin chi la dung', () => {
  let ketQua = isValidCreditLimit(24);
  expect(ketQua).toBe(true);
});

test('Dang ky 25 tin chi la sai', () => {
  let ketQua = isValidCreditLimit(25);
  expect(ketQua).toBe(false);
});


// 4. Test hàm kiểm tra trùng lịch học
test('Kiem tra trung lich hoc khi cung thu va tiet', () => {
  let danhSachCu = [
    { day: 2, period: "1-3" }
  ];
  
  let monMoi = { day: 2, period: "1-3" }; // Trùng lịch

  let ketQua = hasScheduleConflict(monMoi, danhSachCu);
  expect(ketQua).toBe(true);
});