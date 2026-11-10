// app.js: TẠO app và gắn route, KHÔNG gọi listen.
// Supertest cần require được app này để test API mà không phải bật server.
const path = require('path');
const express = require('express');

const authRoutes = require('./routes/auth.routes');
const dangKyRoutes = require('./routes/dangKy.routes');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/api/auth', authRoutes);
app.use('/api/dang-ky', dangKyRoutes);

module.exports = app;
