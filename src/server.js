// server.js: chỉ có nhiệm vụ bật server.
const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server chạy tại http://localhost:${PORT}/login.html`);
});
