const express = require("express");

const router = express.Router();

const pool = require("../db");

// ================= ADD SALE =================

router.post("/", async (req, res) => {

  try {

    const {
      total,
      items,
      seller
    } = req.body;

    // ================= INSERT SALE =================

    const saleResult = await pool.query(
      `
      INSERT INTO sales(
        total,
        seller
      )
      VALUES($1,$2)
      RETURNING id
      `,
      [
        total,
        seller || "Caissier"
      ]
    );

    const saleId =
      saleResult.rows[0].id;

    // ================= UPDATE STOCK =================

    if (items && items.length > 0) {

      for (const item of items) {

        await pool.query(
          `
          UPDATE products
          SET stock = stock - $1
          WHERE id = $2
          `,
          [
            item.quantity,
            item.id
          ]
        );
      }
    }

    res.json({
      success: true,
      saleId
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: "Erreur serveur ❌"
    });
  }
});

// ================= DAILY =================

router.get("/daily", async (req, res) => {

  try {

    const result = await pool.query(`
      SELECT COALESCE(
        SUM(total),0
      ) AS total
      FROM sales
      WHERE DATE(created_at)
      =
      CURRENT_DATE
    `);

    res.json(result.rows[0]);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: "Erreur serveur"
    });
  }
});

// ================= WEEKLY =================

router.get("/weekly", async (req, res) => {

  try {

    const result = await pool.query(`
      SELECT COALESCE(
        SUM(total),0
      ) AS total
      FROM sales
      WHERE created_at >=
      NOW() - INTERVAL '7 days'
    `);

    res.json(result.rows[0]);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: "Erreur serveur"
    });
  }
});

// ================= MONTHLY =================

router.get("/monthly", async (req, res) => {

  try {

    const result = await pool.query(`
      SELECT COALESCE(
        SUM(total),0
      ) AS total
      FROM sales
      WHERE DATE_TRUNC(
        'month',
        created_at
      )
      =
      DATE_TRUNC(
        'month',
        CURRENT_DATE
      )
    `);

    res.json(result.rows[0]);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: "Erreur serveur"
    });
  }
});

// ================= YEARLY =================

router.get("/yearly", async (req, res) => {

  try {

    const result = await pool.query(`
      SELECT COALESCE(
        SUM(total),0
      ) AS total
      FROM sales
      WHERE DATE_TRUNC(
        'year',
        created_at
      )
      =
      DATE_TRUNC(
        'year',
        CURRENT_DATE
      )
    `);

    res.json(result.rows[0]);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: "Erreur serveur"
    });
  }
});

// ================= HISTORY =================

router.get("/history", async (req, res) => {

  try {

    const result = await pool.query(`
      SELECT *
      FROM sales
      ORDER BY created_at DESC
    `);

    res.json(result.rows);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: "Erreur serveur"
    });
  }
});

module.exports = router;