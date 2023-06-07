module.exports = {
  apps: [
    {
     name: 'Frontend Barang',
      script: 'serve',
      env: {
        PM2_SERVE_PATH: '/var/www/transaksi-barang/frontend/build',
        PM2_SERVE_PORT: 3000,
        PM2_SERVE_SPA: 'true'
      },
      watch: true,
      merge_logs: true
    },
    {
      name: 'Backend Barang',
      script: 'index.js',
      watch: true,
      merge_logs: true,
      cwd: '/var/www/transaksi-barang/backend',
      env: {
        PORT: 3001
      },
    }
  ]
};
