// Người 4: E2E test – Playwright tự mở trình duyệt và thao tác như người dùng.
// Server được Playwright tự bật (xem playwright.config.js).
const { test, expect } = require('@playwright/test');

test('đăng nhập đúng → vào trang chủ', async ({ page }) => {
  await page.goto('/login.html');
  await page.fill('#mssv', 'SV001');
  await page.fill('#matKhau', '123456');
  await page.click('#btnDangNhap');

  await expect(page).toHaveURL(/trang-chu/);
  await expect(page.locator('#chao')).toContainText('SV001');
});

test('sai mật khẩu → hiện thông báo lỗi', async ({ page }) => {
  await page.goto('/login.html');
  await page.fill('#mssv', 'SV001');
  await page.fill('#matKhau', 'sai');
  await page.click('#btnDangNhap');

  await expect(page.locator('#loi')).toHaveText('Sai MSSV hoặc mật khẩu');
  await expect(page).toHaveURL(/login/);
});
