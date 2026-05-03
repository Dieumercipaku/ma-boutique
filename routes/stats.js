const express = require("express");
const router = express.Router();
const pool = require("../db");

// 📊 ventes par jour
router.get("/:shop_id", async (req, res) => {
  try {
    const { shop_id } = req.params;

    const result = await pool.query(
      `SELECT DATE(created_at) as date, SUM(total) as total
       FROM sales
       WHERE shop_id = $1
       GROUP BY DATE(created_at)
       ORDER BY date ASC`,
      [shop_id]
    );

    res.json(result.rows);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;