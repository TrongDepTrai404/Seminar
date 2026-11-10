// Người 4: E2E test cho luồng đăng nhập → đăng ký học phần
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('/login.html');
  await page.fill('#mssv', 'SV001');
  await page.fill('#matKhau', '123456');
  await page.click('#btnDangNhap');
  await expect(page).toHaveURL(/trang-chu/);
});

// Lưu ý: dữ liệu memory dùng chung trong suốt lần chạy, nên các test chạy theo thứ tự
test.describe.configure({ mode: 'serial' });

test('đăng ký lớp CSDL01 → thành công', async ({ page }) => {
  await page.fill('#maLop', 'CSDL01');
  await page.click('#btnDangKy');
  await expect(page.locator('#thongBao')).toHaveText('Đăng ký thành công');
});

test('đăng ký lớp đã đầy CNPM01 → bị từ chối', async ({ page }) => {
  await page.fill('#maLop', 'CNPM01');
  await page.click('#btnDangKy');
  await expect(page.locator('#thongBao')).toHaveText('Lớp đã đầy');
});

test('đăng ký HDH01 trùng lịch với CSDL01 → bị từ chối', async ({ page }) => {
  await page.fill('#maLop', 'HDH01');
  await page.click('#btnDangKy');
  await expect(page.locator('#thongBao')).toHaveText('Trùng lịch với lớp CSDL01');
});
