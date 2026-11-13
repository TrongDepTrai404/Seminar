const express = require('express');
const db = require('../db');

const router = express.Router();

// GET /api/lop-hoc-phan  -> danh sách lớp để hiện bảng trên trang chủ
router.get('/', async (req, res) => {
  try {
    const ds = await db.layDanhSachLop();
    return res.status(200).json(ds);
  } catch (err) {
    return res.status(500).json({ message: 'Lỗi máy chủ' });
  }
});

module.exports = router;
