const express = require("express");
const router = express.Router();

router.get("/manager-dashboard", (req, res) => {
  res.render("manager-dashboard", { title: "Manager Dashboard" });
});

router.post("/manager-dashboard", (req, res) => {
  res.send("Manager POST route");
});

module.exports = router;
