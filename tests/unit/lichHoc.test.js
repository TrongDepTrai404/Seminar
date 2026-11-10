// Người 2: unit test cho logic trùng lịch
const { trungLich, timLichTrung } = require('../../src/utils/lichHoc');

const buoi = (thu, tietBatDau, tietKetThuc) => ({ thu, tietBatDau, tietKetThuc });

describe('trungLich()', () => {
  test('cùng thứ, tiết giao nhau → trùng', () => {
    expect(trungLich(buoi(2, 1, 3), buoi(2, 2, 4))).toBe(true);
  });

  test('cùng thứ, chạm nhau đúng 1 tiết (biên) → trùng', () => {
    expect(trungLich(buoi(2, 1, 3), buoi(2, 3, 5))).toBe(true);
  });

  test('cùng thứ, tiết nối tiếp nhau → không trùng', () => {
    expect(trungLich(buoi(2, 1, 3), buoi(2, 4, 6))).toBe(false);
  });

  test('khác thứ, cùng tiết → không trùng', () => {
    expect(trungLich(buoi(2, 1, 3), buoi(3, 1, 3))).toBe(false);
  });

  test('buổi này nằm trọn trong buổi kia → trùng', () => {
    expect(trungLich(buoi(4, 1, 6), buoi(4, 2, 3))).toBe(true);
  });
});

describe('timLichTrung()', () => {
  test('trả về lớp bị trùng', () => {
    const daDangKy = [
      { maLop: 'A', ...buoi(2, 1, 3) },
      { maLop: 'B', ...buoi(3, 1, 3) },
    ];
    expect(timLichTrung(buoi(3, 2, 4), daDangKy).maLop).toBe('B');
  });

  test('chưa đăng ký lớp nào → null', () => {
    expect(timLichTrung(buoi(2, 1, 3), [])).toBeNull();
  });
});
