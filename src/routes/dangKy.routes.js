const express = require('express');
const db = require('../db');
const { timLichTrung } = require('../utils/lichHoc');
const { kiemTraTinChi } = require('../utils/tinChi');

const router = express.Router();

// POST /api/dang-ky  body: { mssv, maLop }
router.post('/', async (req, res) => {
  const { mssv, maLop } = req.body || {};
  if (!mssv || !maLop) {
    return res.status(400).json({ message: 'Thiếu MSSV hoặc mã lớp' });
  }

  try {
    const lop = await db.timLop(maLop);
    if (!lop) return res.status(404).json({ message: 'Không tìm thấy lớp học phần' });

    const daDangKy = await db.layLopDaDangKy(mssv);

    if (daDangKy.some((l) => l.maLop === maLop)) {
      return res.status(409).json({ message: 'Bạn đã đăng ký lớp này rồi' });
    }
    if (lop.siSo >= lop.siSoToiDa) {
      return res.status(409).json({ message: 'Lớp đã đầy' });
    }

    const lopTrung = timLichTrung(lop, daDangKy);
    if (lopTrung) {
      return res.status(409).json({ message: `Trùng lịch với lớp ${lopTrung.maLop}` });
    }

    const tongHienTai = daDangKy.reduce((tong, l) => tong + l.soTinChi, 0);
    const ketQua = kiemTraTinChi(tongHienTai, lop.soTinChi);
    if (ketQua === 'VUOT_TOI_DA') {
      return res.status(400).json({ message: 'Vượt quá số tín chỉ tối đa' });
    }

    await db.themDangKy(mssv, maLop);
    return res.status(201).json({
      message: 'Đăng ký thành công',
      canhBao: ketQua === 'DUOI_TOI_THIEU' ? 'Chưa đủ số tín chỉ tối thiểu' : null,
    });
  } catch (err) {
    return res.status(500).json({ message: 'Lỗi máy chủ' });
  }
});

module.exports = router;
