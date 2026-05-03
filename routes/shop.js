const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post("/", async (req, res) => {
  try {
    const { shop_name, country, currency } = req.body;

    if (!shop_name) {
      return res.status(400).json({ error: "Nom de boutique requis ❌" });
    }

    const result = await pool.query(
      "INSERT INTO shops (shop_name, country, currency) VALUES ($1, $2, $3) RETURNING *",
      [shop_name, country, currency]
    );

    res.json(result.rows[0]);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;