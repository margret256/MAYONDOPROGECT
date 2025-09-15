const express = require("express");
const router = express.Router();

// Homepage route
router.get("/welcome", (req, res) => {
  res.render("index", { title: "Welcome to Mayondo Project" });
});

router.post("/welcome", (req, res) => {
  res.send("index");
});


module.exports = router;
