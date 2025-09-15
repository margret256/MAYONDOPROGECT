const express = require("express");
const router = express.Router();

router.get("/inventory", (req, res) => {
  res.render("inventory", { title: "Inventory" });
});

router.post("/inventory", (req, res) => {
  res.send("Inventory POST route");
});

router.get('/add-product', (req, res) => {
    res.render('add-product'); // your add inventory page
});

router.post("/add-product", (req, res) => {
  res.send("Inventory POST route");
});

// Redirect root to dashboard
router.get('/add-product', (req, res) => {
    res.redirect('/inventory');
});

module.exports = router;
