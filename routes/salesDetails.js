const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/:shop_id", async (req, res) => {
  try {
    const { shop_id } = req.params;

    const result = await pool.query(
      `SELECT s.id as sale_id, s.total, s.created_at,
              p.name, si.quantity, si.price
       FROM sales s
       JOIN sale_items si ON si.sale_id = s.id
       JOIN products p ON p.id = si.product_id
       WHERE s.shop_id = $1
       ORDER BY s.created_at DESC`,
      [shop_id]
    );

    res.json(result.rows);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;