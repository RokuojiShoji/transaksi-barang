const express = require("express");
const router = express.Router();
const { Stocks } = require("../models");

router.get("/item/:id", async (req, res) => {
  const item = req.params.id;
  const data = await Stocks.findOne({ where: { itemCode: item } });
  res.json(data);
});

router.put("/item/:id", async (req, res) => {
  const itemCode = req.params.id;
  const data = req.body;

  const stocks = await Stocks.update(data, { where: { itemCode } });
  res.json("stock updated")
});

module.exports = router;
