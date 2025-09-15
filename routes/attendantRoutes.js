const express = require("express");
const router = express.Router();

router.get("/attendant-dashboard", (req, res) => {
  res.render("attendant-dashboard", { title: "Attendant Dashboard" });
});

router.post("/attendant-dashboard", (req, res) => {
  res.send("Attendant POST route");
});

router.get('/add-attendant', (req, res) => {
    res.render('add-attendant'); // your add attendant page
});

router.post("/add-attendant", (req, res) => {
  res.send("Attendant POST route");
});

// Redirect root to dashboard
router.get('/add-attendant', (req, res) => {
    res.redirect('/attendants-dashboard');
});


module.exports = router;
