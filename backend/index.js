//const cors = require("cors");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
const corsMiddleware = cors();
app.use((req, res, next) => {
  console.log("CORS middleware called");
  corsMiddleware(req, res, next);
});

const db = require("./models");

//  IMPORT MODEL
const BuyerTypes = require("./models/BuyerTypes");
const Payments = require("./models/Payments");
const Statuses = require("./models/Statuses");
const Stocks = require("./models/Stocks");

//  ROUTERS
const transactionRouter = require("./routes/Transaction");
const paymentRouter = require("./routes/Payment");
const buyerTypeRouter = require("./routes/BuyerType");
const stockRouter = require("./routes/Stock")

app.use("/transaction", transactionRouter);
app.use("/payment", paymentRouter);
app.use("/buyer", buyerTypeRouter);
app.use("/stock", stockRouter)

db.sequelize
  .sync()
  .then(() => {
    Promise.all([
      buyerType.bulkCreate(buyerTypes, {
        ignoreDuplicates: true,
      }),
      payment.bulkCreate(payments, {
        ignoreDuplicates: true,
      }),
      status.bulkCreate(statuses, {
        ignoreDuplicates: true,
      }),
      stock.bulkCreate(stocks, {
        ignoreDuplicates: true,
      }),
    ]);
  })
  .then(() => {
    app.listen(3001, () => {
      console.log("Server running on port 3001");
    });
  });

const { DataTypes } = require("sequelize");
//  ADD MODEL
const buyerType = BuyerTypes(db.sequelize, DataTypes);
const payment = Payments(db.sequelize, DataTypes);
const status = Statuses(db.sequelize, DataTypes);
const stock = Stocks(db.sequelize, DataTypes);

//  INITIAL DATA
const buyerTypes = [
  {
    buyerTypeCode: "b1",
    buyerType: "Anggota",
    price: "24000",
  },
  {
    buyerTypeCode: "b2",
    buyerType: "Non-Anggota",
    price: "26000",
  },
  {
    buyerTypeCode: "b3",
    buyerType: "Mitra",
    price: "23000",
  },
  {
    buyerTypeCode: "b4",
    buyerType: "Koperasi",
    price: "20000",
  },
];

const payments = [
  {
    paymentCode: "p1",
    paymentType: "Tunai",
    paymentIndex: 0,
  },
  {
    paymentCode: "p2",
    paymentType: "Hutang",
    paymentIndex: 0,
  },
];

const statuses = [
  {
    statusCode: "s1",
    statusType: "Lunas",
  },
  {
    statusCode: "s2",
    statusType: "Belum Lunas",
  },
  {
    statusCode: "s3",
    statusType: "Pembelian",
  },
];

const stocks = [
  {
    itemCode: "i1",
    itemName: "gas",
    itemAmount: 0,
  },
];

// app.get('/show-transaction', (req, res) => {

//    connection.query('SELECT buyerName as `nama pembeli`, DATE(buyDate) as `tanggal pembelian`, \
//    buyAmount as `jumlah`, buyer.buyerType as `pembeli`, payment.paymentType as `pembayaran`, \
//    status.statusType as status, buyer.price as `harga` \
//    FROM transaction JOIN buyer ON transactions.buyerCode = buyer.buyerCode \
//    JOIN payment ON transaction.paymentCode = payment.paymentCode \
//    JOIN status ON transaction.statusCode = status.statusCode', (err, rows, fields) => {
//      if (err) throw err

//      res.status(200).json({ success: true, data: rows})
//    })
// })

// app.post('/add-transaction', (req, res) => {(

//    connection.query("INSERT INTO transaksi VALUES ('H2', 'FULANAS', curdate(), 2, 'b3','p2','h1')") , (err, rows, fields) => {
//      if (err) throw err

//      res.status(200).json({ success: true, data: rows})
//    })
// })

// app.get('/', function(req, res){
//    res.send("Hello world! if you're seeing this have a good day!");
// });
