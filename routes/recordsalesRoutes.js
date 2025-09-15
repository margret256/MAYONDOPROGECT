const express = require("express");
const router = express.Router();
const Sale = require("../models/recordsalesModel"); // Make sure this points to your model

// GET all sales
router.get("/sales", async (req, res) => {
  try {
    const sales = await Sale.find().sort({ createdAt: -1 });
    res.render("sales", { title: "Sales Records", sales });
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to fetch sales.");
  }
});

// GET Add Sale page
router.get("/add-sales", (req, res) => {
  res.render("add-sales", { title: "Add Sale" });
});

// POST Add Sale
router.post("/add-sales", async (req, res) => {
  try {
    const { customer, product, qty, price, payment, agent, date, transport } = req.body;

    const total = Number(qty) * Number(price) * (transport === "yes" ? 1.05 : 1);

    const sale = new Sale({
      customer,
      product,
      qty: Number(qty),
      price: Number(price),
      payment,
      agent,
      date,
      transport,
      total
    });

    await sale.save();
    res.redirect("/sales"); // Redirect after save
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to add sale.");
  }
});

// GET Edit Sale page
router.get("/sales/edit/:id", async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id);
    if (!sale) return res.status(404).send("Sale not found.");
    res.render("edit-sale", { title: "Edit Sale", sale });
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to load sale.");
  }
});

// POST Edit Sale
router.post("/sales/edit/:id", async (req, res) => {
  try {
    const { customer, product, qty, price, payment, agent, date, transport } = req.body;
    const total = Number(qty) * Number(price) * (transport === "yes" ? 1.05 : 1);

    await Sale.findByIdAndUpdate(req.params.id, {
      customer,
      product,
      qty: Number(qty),
      price: Number(price),
      payment,
      agent,
      date,
      transport,
      total
    });

    res.redirect("/sales");
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to update sale.");
  }
});

// DELETE Sale
router.post("/sales/delete/:id", async (req, res) => {
  try {
    await Sale.findByIdAndDelete(req.params.id);
    res.redirect("/sales");
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to delete sale.");
  }
});

module.exports = router;
