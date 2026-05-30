const express = require("express");
const router = express.Router();
const pool = require("../db");

// ===============================
// AJOUT PRODUIT
// ===============================

router.post("/", async (req, res) => {

  try {

    console.log("===== AJOUT PRODUIT =====");
    console.log(req.body);

    const {
      shop_id,
      name,
      price,
      stock
    } = req.body;

    if (!shop_id) {
      return res.status(400).json({
        error: "shop_id manquant"
      });
    }

    if (!name) {
      return res.status(400).json({
        error: "name manquant"
      });
    }

    const result = await pool.query(
      `
      INSERT INTO products
      (
        shop_id,
        name,
        price,
        stock
      )
      VALUES
      (
        $1,
        $2,
        $3,
        $4
      )
      RETURNING *
      `,
      [
        Number(shop_id),
        name,
        Number(price || 0),
        Number(stock || 0)
      ]
    );

    console.log("PRODUIT AJOUTE");
    console.log(result.rows[0]);

    res.json(result.rows[0]);

  } catch (err) {

    console.log("ERREUR PRODUIT");
    console.log(err);

    res.status(500).json({
      error: err.message
    });
  }
});

// ===============================
// LISTE PRODUITS
// ===============================

router.get("/", async (req, res) => {

  try {

    const result = await pool.query(
      "SELECT * FROM products ORDER BY id DESC"
    );

    res.json(result.rows);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: err.message
    });
  }
});

module.exports = router;