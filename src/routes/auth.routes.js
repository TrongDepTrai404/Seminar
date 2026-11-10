const express = require('express');
const db = require('../db');

const router = express.Router();

// POST /api/auth/login  body: { mssv, matKhau }
router.post('/login', async (req, res) => {
  const { mssv, matKhau } = req.body || {};
  if (!mssv || !matKhau) {
    return res.status(400).json({ message: 'Vui lòng nhập MSSV và mật khẩu' });
  }

  try {
    const sv = await db.timSinhVien(mssv);
    // TODO: nếu nhóm lưu mật khẩu đã băm (bcrypt) thì đổi sang bcrypt.compare
    if (!sv || sv.matKhau !== matKhau) {
      return res.status(401).json({ message: 'Sai MSSV hoặc mật khẩu' });
    }
    return res.status(200).json({ mssv: sv.mssv, hoTen: sv.hoTen });
  } catch (err) {
    return res.status(500).json({ message: 'Lỗi máy chủ' });
  }
});

module.exports = router;
