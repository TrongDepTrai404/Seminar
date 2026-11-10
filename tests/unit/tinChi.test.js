// Người 2: unit test theo kỹ thuật PHÂN TÍCH GIÁ TRỊ BIÊN
// Giới hạn mẫu: tối thiểu 14, tối đa 25 tín chỉ (đổi trong src/utils/tinChi.js)
const { kiemTraTinChi } = require('../../src/utils/tinChi');

describe('kiemTraTinChi() – giá trị biên', () => {
  test.each([
    // [tổng hiện tại, tín chỉ lớp mới, kết quả mong đợi]
    [10, 3, 'DUOI_TOI_THIEU'], // 13: ngay dưới biên dưới
    [11, 3, 'HOP_LE'],         // 14: đúng biên dưới
    [12, 3, 'HOP_LE'],         // 15: ngay trên biên dưới
    [21, 3, 'HOP_LE'],         // 24: ngay dưới biên trên
    [22, 3, 'HOP_LE'],         // 25: đúng biên trên
    [23, 3, 'VUOT_TOI_DA'],    // 26: ngay trên biên trên
  ])('đang có %i TC + lớp %i TC → %s', (tongHienTai, soTinChiMoi, mongDoi) => {
    expect(kiemTraTinChi(tongHienTai, soTinChiMoi)).toBe(mongDoi);
  });
});
