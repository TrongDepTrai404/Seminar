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

// Kiểm tra số tín chỉ
function isValidCreditLimit(credits) {
  if (credits >= 12 && credits <= 24) {
    return true;
  } else {
    return false;
  }
}

// Kiểm tra trùng lịch học
function hasScheduleConflict(newCourse, registeredCourses) {
  // Nếu chưa đăng ký môn nào thì không trùng
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

  return false; // Duyệt hết không trùng
}

module.exports = {
  isValidEmail,
  validatePassword,
  isValidCreditLimit,
  hasScheduleConflict,
};