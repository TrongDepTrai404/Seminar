// Gọi các hàm từ file validator.js sang để kiểm tra
const { 
  isValidEmail, 
  validatePassword 
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
