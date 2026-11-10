module.exports = {
  testEnvironment: 'node',
  testMatch: ['<rootDir>/tests/**/*.test.js'],
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/server.js',       // chỉ gọi listen
    '!src/db.js',           // dữ liệu giả: được mock khi test API
  ],
  coverageReporters: ['text', 'html'],
};
