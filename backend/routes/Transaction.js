const express = require("express");
const router = express.Router();
const { Transactions, sequelize } = require("../models");

router.get("/show", async (req, res) => {
  const listOfTransactions = await Transactions.findAll();
  res.json(listOfTransactions);
});

router.get("/status/:id", async (req, res) => {
  const status = req.params.id;
  const transactions = await Transactions.findAll({
    where: {
      statusCode: status,
    },
  });
  res.json(transactions);
});

router.post("/add", async (req, res) => {
  const transaction = req.body;
  await Transactions.create(transaction);
  res.json(transaction);
});

router.put("/status/:id", async (req, res) => {
  const transactionCode = req.params.id;
  const data = req.body;

  const transactions = await Transactions.findAll({
    where: {
      statusCode: "s2",
    },
  });

  const transaction = await Transactions.update(data, {
    where: { transactionCode },
  });

  res.json(transactions);
});

router.get("/daily/:date/:status", async (req, res) => {
  const datePar = req.params.date
  const status = req.params.status
  const date = await Transactions.findAll({where: {
    updatedAt: sequelize.where(sequelize.fn('date', sequelize.col('updatedAt')), '=', datePar),
    statusCode: status
  }})
  res.json(date)
})

router.get("/monthly/:month/:status", async (req, res) => {
  const monthPar = req.params.month
  const status = req.params.status
  const month = await Transactions.findAll({where: {
    updatedAt: sequelize.where(sequelize.fn('month', sequelize.col('updatedAt')), '=', monthPar),
    statusCode: status
  }})
  res.json(month)
})

module.exports = router;
