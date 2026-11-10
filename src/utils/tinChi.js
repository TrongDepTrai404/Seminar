// TODO: đổi 2 số này theo quy chế đào tạo của trường
const TIN_CHI_TOI_THIEU = 14;
const TIN_CHI_TOI_DA = 25;

// Trả về kết quả kiểm tra tổng tín chỉ SAU khi đăng ký thêm.
//  - 'VUOT_TOI_DA'    : không cho đăng ký
//  - 'DUOI_TOI_THIEU' : vẫn cho đăng ký nhưng cảnh báo
//  - 'HOP_LE'
function kiemTraTinChi(tongHienTai, soTinChiMoi) {
  const tongSau = tongHienTai + soTinChiMoi;
  if (tongSau > TIN_CHI_TOI_DA) return 'VUOT_TOI_DA';
  if (tongSau < TIN_CHI_TOI_THIEU) return 'DUOI_TOI_THIEU';
  return 'HOP_LE';
}

module.exports = { kiemTraTinChi, TIN_CHI_TOI_THIEU, TIN_CHI_TOI_DA };
