const express = require("express");
const router = express.Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// 🔐 LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (user.rows.length === 0) {
      return res.status(400).json({ error: "Utilisateur introuvable ❌" });
    }

    const valid = await bcrypt.compare(password, user.rows[0].password);

    if (!valid) {
      return res.status(400).json({ error: "Mot de passe incorrect ❌" });
    }

    // 🎟️ TOKEN
    const token = jwt.sign(
      { id: user.rows[0].id, role: user.rows[0].role },
      "SECRET_KEY",
      { expiresIn: "8h" }
    );

    res.json({
      message: "Connexion réussie ✅",
      token
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;