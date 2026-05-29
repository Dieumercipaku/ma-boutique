const express = require("express");

const router = express.Router();

const pool = require("../db");

// ================= DASHBOARD =================

router.get("/", async (req, res) => {

  try {

    // ================= JOUR =================

    const dailySales = await pool.query(`
      SELECT COALESCE(SUM(total),0) AS total
      FROM sales
      WHERE DATE(created_at) = CURRENT_DATE
    `);

    // ================= SEMAINE =================

    const weeklySales = await pool.query(`
      SELECT COALESCE(SUM(total),0) AS total
      FROM sales
      WHERE created_at >= NOW() - INTERVAL '7 days'
    `);

    // ================= MOIS =================

    const monthlySales = await pool.query(`
      SELECT COALESCE(SUM(total),0) AS total
      FROM sales
      WHERE DATE_TRUNC('month', created_at)
      =
      DATE_TRUNC('month', CURRENT_DATE)
    `);

    // ================= ANNEE =================

    const yearlySales = await pool.query(`
      SELECT COALESCE(SUM(total),0) AS total
      FROM sales
      WHERE DATE_TRUNC('year', created_at)
      =
      DATE_TRUNC('year', CURRENT_DATE)
    `);

    // ================= PRODUITS =================

    const productsResult = await pool.query(`
      SELECT COUNT(*) AS total_products
      FROM products
    `);

    // ================= COMMANDES JOUR =================

    const ordersResult = await pool.query(`
      SELECT COUNT(*) AS total_orders
      FROM sales
      WHERE DATE(created_at)=CURRENT_DATE
    `);

    // ================= STOCK FAIBLE =================

    const stockResult = await pool.query(`
      SELECT COUNT(*) AS low_stock
      FROM products
      WHERE stock <= 5
    `);

    res.json({

      daily_sales:
        Number(dailySales.rows[0].total),

      weekly_sales:
        Number(weeklySales.rows[0].total),

      monthly_sales:
        Number(monthlySales.rows[0].total),

      yearly_sales:
        Number(yearlySales.rows[0].total),

      total_products:
        Number(productsResult.rows[0].total_products),

      total_orders:
        Number(ordersResult.rows[0].total_orders),

      low_stock:
        Number(stockResult.rows[0].low_stock)

    });

  } catch (err) {

    console.log("Erreur Dashboard ❌");

    console.log(err);

    res.status(500).json({
      error: "Erreur serveur"
    });

  }

});

module.exports = router;