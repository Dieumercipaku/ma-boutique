const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/:shop_id", async (req, res) => {
  try {
    const { shop_id } = req.params;

    // 💰 total ventes
    const totalSales = await pool.query(
      "SELECT COALESCE(SUM(total),0) FROM sales WHERE shop_id = $1",
      [shop_id]
    );

    // 📦 nombre produits
    const totalProducts = await pool.query(
      "SELECT COUNT(*) FROM products WHERE shop_id = $1",
      [shop_id]
    );

    // 🧾 nombre ventes
    const totalOrders = await pool.query(
      "SELECT COUNT(*) FROM sales WHERE shop_id = $1",
      [shop_id]
    );

    // 📉 stock total
    const totalStock = await pool.query(
      "SELECT COALESCE(SUM(stock),0) FROM products WHERE shop_id = $1",
      [shop_id]
    );

    res.json({
      total_sales: totalSales.rows[0].coalesce,
      total_products: totalProducts.rows[0].count,
      total_orders: totalOrders.rows[0].count,
      total_stock: totalStock.rows[0].coalesce
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;