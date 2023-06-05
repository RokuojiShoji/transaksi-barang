const express = require("express");
const router = express.Router();
const { Payments } = require("../models");
const { where } = require("sequelize");

router.get("/tunai", async (req, res) => {
  const Tunai = await Payments.findOne({ where: { paymentCode: "p1" } });
  res.json(Tunai);
});

router.get("/hutang", async (req, res) => {
  const Hutang = await Payments.findOne({ where: { paymentCode: "p2" } });
  res.json(Hutang);
});

router.put("/update/:paymentCode", async (req, res) => {
  try {
    const paymentCode = req.params.paymentCode;
    console.log(`paymentCode: ${paymentCode}`);
    const data = req.body;
    const [affectedCount] = await Payments.update(data, { where: { paymentCode } });
    console.log(`Number of rows affected: ${affectedCount}`);
    res.json({ message: "Index Updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while updating the index" });
  }
});

module.exports = router;
