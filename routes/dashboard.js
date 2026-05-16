const express = require("express");
const router = express.Router();
const pool = require("../db");

// 📊 dashboard stats
router.get("/", async (req, res) => {
  try {

    // 💰 total ventes
    const sales = await pool.query(
      "SELECT COALESCE(SUM(total),0) AS total_sales FROM sales"
    );

    // 📦 total produits
    const products = await pool.query(
      "SELECT COUNT(*) AS total_products FROM products"
    );

    // 🛒 total ventes count
    const orders = await pool.query(
      "SELECT COUNT(*) AS total_orders FROM sales"
    );

    // 📉 stock faible
    const lowStock = await pool.query(
      "SELECT COUNT(*) AS low_stock FROM products WHERE stock <= 5"
    );

    res.json({
      total_sales: sales.rows[0].total_sales,
      total_products: products.rows[0].total_products,
      total_orders: orders.rows[0].total_orders,
      low_stock: lowStock.rows[0].low_stock
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

module.exports = router;