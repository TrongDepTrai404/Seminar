// Code viết theo phong cách người mới học (dùng if-else và vòng lặp cơ bản)

// 1. Kiểm tra email: Người mới thường chỉ nghĩ đến việc kiểm tra xem có chứa ký tự '@' hay không
function isValidEmail(email) {
  if (email.includes("@")) {
    return true;
  } else {
    return false;
  }
}

// 2. Kiểm tra mật khẩu: Dùng if-else dài dòng thay vì return trực tiếp biểu thức logic
function validatePassword(password) {
  var length = password.length;
  if (length >= 6 && length <= 20) {
    return true;
  } else {
    return false;
  }
}

// 3. Kiểm tra số tín chỉ: Chỉ so sánh trực tiếp, chưa đề phòng người dùng nhập chữ cái hay giá trị rỗng
function isValidCreditLimit(credits) {
  if (credits >= 12 && credits <= 24) {
    return true;
  } else {
    return false;
  }
}

// 4. Kiểm tra trùng lịch học: Người mới thường dùng vòng lặp for truyền thống để duyệt mảng thủ công
function hasScheduleConflict(newCourse, registeredCourses) {
  // Nếu chưa đăng ký môn nào thì chắc chắn không trùng
  if (!registeredCourses) {
    return false;
  }

  for (let i = 0; i < registeredCourses.length; i++) {
    let course = registeredCourses[i];
    // Nếu trùng cả Thứ và Tiết học
    if (course.day === newCourse.day && course.period === newCourse.period) {
      return true; // Bị trùng lịch!
    }
  }

  return false; // Duyệt hết không thấy trùng
}

module.exports = {
  isValidEmail,
  validatePassword,
  isValidCreditLimit,
  hasScheduleConflict,
};