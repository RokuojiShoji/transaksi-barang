const express = require("express")
const router = express.Router()
const {BuyerTypes} = require("../models")
const {where} = require("sequelize")

router.get("/type/", async (req, res) => {
    const buyerTypeCode = req.params.id
    const data = await BuyerTypes.findAll()
    res.json(data)
})

module.exports = router;