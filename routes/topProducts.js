const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/:shop_id", async (req, res) => {
  try {
    const { shop_id } = req.params;

    const result = await pool.query(
      `SELECT p.name, SUM(si.quantity) as total_sold
       FROM sale_items si
       JOIN products p ON p.id = si.product_id
       JOIN sales s ON s.id = si.sale_id
       WHERE s.shop_id = $1
       GROUP BY p.name
       ORDER BY total_sold DESC
       LIMIT 5`,
      [shop_id]
    );

    res.json(result.rows);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;