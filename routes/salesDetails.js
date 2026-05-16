const express = require("express");
const router = express.Router();
const pool = require("../db");

// 📄 détails ventes
router.get("/", async (req, res) => {
  try {

    const result = await pool.query(`
      SELECT 
        s.id AS sale_id,
        p.name AS product_name,
        si.quantity,
        si.price,
        s.total,
        s.created_at
      FROM sales s
      JOIN sale_items si ON si.sale_id = s.id
      JOIN products p ON p.id = si.product_id
      ORDER BY s.created_at DESC
    `);

    res.json(result.rows);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

module.exports = router;