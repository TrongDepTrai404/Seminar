// Kiểm tra trùng lịch giữa 2 buổi học.
// Mỗi buổi có dạng: { thu: 2..8, tietBatDau: số, tietKetThuc: số }
// Hai buổi trùng khi cùng thứ VÀ khoảng tiết giao nhau.
function trungLich(a, b) {
  return (
    a.thu === b.thu &&
    a.tietBatDau <= b.tietKetThuc &&
    b.tietBatDau <= a.tietKetThuc
  );
}

// Tìm buổi học (trong danh sách đã đăng ký) bị trùng với lớp mới.
// Trả về buổi bị trùng, hoặc null nếu không trùng.
function timLichTrung(lopMoi, danhSachDaDangKy) {
  return danhSachDaDangKy.find((lop) => trungLich(lopMoi, lop)) || null;
}

module.exports = { trungLich, timLichTrung };
