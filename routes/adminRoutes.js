const express = require("express");
const router = express.Router();

router.get("/admin-dashboard", (req, res) => {
  res.render("admin-dashboard", { title: "Admin Dashboard" });
});

router.post("/admin-dashboard", (req, res) => {
  res.send("Admin POST route");
});

module.exports = router;
