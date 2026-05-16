const express = require("express");
const router = express.Router();
const pool = require("../db");

// 🏆 top produits vendus
router.get("/", async (req, res) => {
  try {

    const result = await pool.query(`
      SELECT 
        p.id,
        p.name,
        SUM(si.quantity) AS total_sold
      FROM sale_items si
      JOIN products p ON p.id = si.product_id
      GROUP BY p.id, p.name
      ORDER BY total_sold DESC
      LIMIT 5
    `);

    res.json(result.rows);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

module.exports = router;