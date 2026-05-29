const express = require("express");
const router = express.Router();
const pool = require("../db");

// ===============================
// AJOUT PRODUIT
// ===============================

router.post("/", async (req, res) => {
  try {
    const {
      shop_id,
      name,
      price,
      stock
    } = req.body;

    const newProduct = await pool.query(
      `
      INSERT INTO products
      (shop_id, name, price, stock)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [shop_id, name, price, stock]
    );

    res.json(newProduct.rows[0]);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: "Erreur serveur"
    });
  }
});

// ===============================
// TOUS LES PRODUITS
// ===============================

router.get("/", async (req, res) => {
  try {

    const products = await pool.query(`
      SELECT *
      FROM products
      ORDER BY id DESC
    `);

    res.json(products.rows);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: "Erreur serveur"
    });
  }
});

// ===============================
// PRODUITS PAR BOUTIQUE
// ===============================

router.get("/:shopId", async (req, res) => {
  try {

    const { shopId } = req.params;

    const products = await pool.query(
      `
      SELECT *
      FROM products
      WHERE shop_id = $1
      ORDER BY id DESC
      `,
      [shopId]
    );

    res.json(products.rows);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: "Erreur serveur"
    });
  }
});

// ===============================
// MODIFIER PRODUIT
// ===============================

router.put("/:id", async (req, res) => {

  try {

    const { id } = req.params;

    const {
      name,
      price,
      stock
    } = req.body;

    const result = await pool.query(
      `
      UPDATE products
      SET
        name = $1,
        price = $2,
        stock = $3
      WHERE id = $4
      RETURNING *
      `,
      [
        name,
        price,
        stock,
        id
      ]
    );

    res.json(result.rows[0]);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: "Erreur serveur"
    });
  }
});

// ===============================
// SUPPRIMER PRODUIT
// ===============================

router.delete("/:id", async (req, res) => {

  try {

    const { id } = req.params;

    await pool.query(
      `
      DELETE FROM products
      WHERE id = $1
      `,
      [id]
    );

    res.json({
      success: true,
      message: "Produit supprimé"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: "Erreur serveur"
    });
  }
});

module.exports = router;