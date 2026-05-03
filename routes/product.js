const express = require("express");
const router = express.Router();
const pool = require("../db");

// 🔥 Ajouter produit
router.post("/", async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const { shop_id, name, price, stock } = req.body;

    if (!shop_id || !name) {
      return res.status(400).json({
        error: "shop_id et name sont obligatoires ❌"
      });
    }

    const result = await pool.query(
      "INSERT INTO products (shop_id, name, price, stock) VALUES ($1, $2, $3, $4) RETURNING *",
      [shop_id, name, Number(price), Number(stock)]
    );

    res.json(result.rows[0]);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔥 Voir produits d’une boutique
router.get("/:shop_id", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM products WHERE shop_id = $1 ORDER BY id DESC",
      [req.params.shop_id]
    );

    res.json(result.rows);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✏️ Modifier produit
router.put("/:id", async (req, res) => {
  try {
    const { name, price, stock } = req.body;

    const result = await pool.query(
      "UPDATE products SET name=$1, price=$2, stock=$3 WHERE id=$4 RETURNING *",
      [name, Number(price), Number(stock), req.params.id]
    );

    res.json(result.rows[0]);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🗑️ Supprimer produit
router.delete("/:id", async (req, res) => {
  try {
    await pool.query(
      "DELETE FROM products WHERE id = $1",
      [req.params.id]
    );

    res.json({ message: "Produit supprimé ✅" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;