module.exports = {
    apps: [
      {
        name: "Frontend Barang",
        script: "index.js",
        watch: true,
        merge_logs: true,
        cwd: "/var/www/transaksi-barang/frontend",
      },
      {
        name: "Backend Barang",
        script: "index.js",
        watch: true,
        merge_logs: true,
        cwd: "/var/www/transaksi-barang/backend",
      },
    ],
  };