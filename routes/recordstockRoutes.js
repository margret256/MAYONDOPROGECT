const express = require("express");
const router = express.Router();
const Stock = require("../models/recordstockModel"); // your Mongoose model

// GET Add Stock page
router.get("/add-stock", (req, res) => {
  res.render("add-stock"); // add-stock.pug
});

// POST Add Stock
router.post("/add-stock", async (req, res) => {
  try {
    const { productname, producttype, costprice, saleprice, quantity } = req.body;

    const newStock = new Stock({
      productName: productname,
      productType: producttype,
      costPrice: costprice,
      salePrice: saleprice,
      quantity: quantity
    });

    await newStock.save();
    console.log("✅ Stock saved:", newStock);
    res.redirect("/stock");
  } catch (err) {
    console.error("❌ Error saving stock:", err);
    res.status(500).send("Error saving stock data");
  }
});

// GET Stock page
router.get("/stock", async (req, res) => {
  try {
    const stockList = await Stock.find().sort({ _id: -1 });
    res.render("stock", { stock: stockList, title: "Record Stock" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching stock data");
  }
});

// GET Edit Stock page
router.get("/edit-stock/:id", async (req, res) => {
  try {
    const stockItem = await Stock.findById(req.params.id);
    if (!stockItem) return res.status(404).send("Stock item not found");
    res.render("edit-stock", { stock: stockItem }); // edit-stock.pug
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching stock data");
  }
});

// POST Update Stock
router.post("/edit-stock/:id", async (req, res) => {
  try {
    const { productname, producttype, costprice, saleprice, quantity } = req.body;

    await Stock.findByIdAndUpdate(req.params.id, {
      productName: productname,
      productType: producttype,
      costPrice: costprice,
      salePrice: saleprice,
      quantity: quantity
    });

    console.log("✅ Stock updated:", req.params.id);
    res.redirect("/stock");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating stock data");
  }
});

// DELETE Stock
router.post("/delete-stock/:id", async (req, res) => {
  try {
    await Stock.findByIdAndDelete(req.params.id);
    console.log("🗑 Stock deleted:", req.params.id);
    res.redirect("/stock");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting stock");
  }
});

module.exports = router;
