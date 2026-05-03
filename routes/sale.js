const express = require("express");
const router = express.Router();
const pool = require("../db");
const auth = require("../middleware/authMiddleware");


// 💰 créer une vente
router.post("/", async (req, res) => {
  try {
    const { shop_id, items } = req.body;

    if (!shop_id || !items || items.length === 0) {
      return res.status(400).json({ error: "Données invalides ❌" });
    }

    let total = 0;

    // 🧮 calcul total + vérification stock
    for (let item of items) {
      const product = await pool.query(
        "SELECT * FROM products WHERE id = $1",
        [item.product_id]
      );

      if (product.rows.length === 0) {
        return res.status(400).json({ error: "Produit introuvable ❌" });
      }

      const prod = product.rows[0];

      if (prod.stock < item.quantity) {
        return res.status(400).json({
          error: `Stock insuffisant pour ${prod.name} ❌`
        });
      }
total += Number(prod.price) * item.quantity;
    }

    // 🧾 créer vente
    const sale = await pool.query(
      "INSERT INTO sales (shop_id, total) VALUES ($1, $2) RETURNING *",
      [shop_id, total]
    );

    const sale_id = sale.rows[0].id;

    // 📦 enregistrer produits + réduire stock
    for (let item of items) {
      const product = await pool.query(
        "SELECT * FROM products WHERE id = $1",
        [item.product_id]
      );

      const prod = product.rows[0];

      await pool.query(
        "INSERT INTO sale_items (sale_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)",
        [sale_id, item.product_id, item.quantity, prod.price]
      );

      await pool.query(
        "UPDATE products SET stock = stock - $1 WHERE id = $2",
        [item.quantity, item.product_id]
      );
    }

    res.json({
      message: "Vente enregistrée 💰",
      total: total
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;