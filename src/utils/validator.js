// Kiểm tra dữ liệu nhập ở form (email, mật khẩu).
// Ghi chú: giới hạn tín chỉ và trùng lịch đã có ở tinChi.js và lichHoc.js
// (là code hệ thống thật đang dùng), nên không viết lại ở đây.

// Kiểm tra email
function isValidEmail(email) {
  if (email.includes("@")) {
    return true;
  } else {
    return false;
  }
}

// Kiểm tra mật khẩu
function validatePassword(password) {
  var length = password.length;
  if (length >= 6 && length <= 20) {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  isValidEmail,
  validatePassword,
};
