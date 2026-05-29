const express = require("express");

const router = express.Router();

const pool = require("../db");

// ================= DASHBOARD =================

router.get("/", async (req, res) => {

  try {

    // TOTAL VENTES JOUR
    const salesResult = await pool.query(`
      SELECT COALESCE(SUM(total),0)
      AS total_sales
      FROM sales
      WHERE DATE(created_at)=CURRENT_DATE
    `);

    // TOTAL PRODUITS
    const productsResult = await pool.query(`
      SELECT COUNT(*) AS total_products
      FROM products
    `);

    // TOTAL COMMANDES
    const ordersResult = await pool.query(`
      SELECT COUNT(*) AS total_orders
      FROM sales
      WHERE DATE(created_at)=CURRENT_DATE
    `);

    // STOCK FAIBLE
    const stockResult = await pool.query(`
      SELECT COUNT(*) AS low_stock
      FROM products
      WHERE stock <= 5
    `);

    res.json({

      total_sales:
        salesResult.rows[0].total_sales,

      total_products:
        productsResult.rows[0].total_products,

      total_orders:
        ordersResult.rows[0].total_orders,

      low_stock:
        stockResult.rows[0].low_stock
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: "Erreur serveur"
    });
  }
});

module.exports = router;