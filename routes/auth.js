const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const db = require("../db");

// ================= LOGIN =================

router.post("/login", async (req, res) => {

  try {

    console.log("========== LOGIN RECU ==========");

    const { email, password } = req.body;

    console.log("EMAIL RECU =", email);

    const user = await db.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    console.log("RESULTAT SQL =", user.rows);

    if (user.rows.length === 0) {

      console.log("UTILISATEUR INTROUVABLE");

      return res.status(400).json({
        error: "Utilisateur introuvable"
      });
    }

    console.log("UTILISATEUR TROUVÉ");

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].password
    );

    console.log(
      "PASSWORD VALIDE =",
      validPassword
    );

    if (!validPassword) {

      return res.status(400).json({
        error: "Mot de passe incorrect"
      });
    }

    const token = jwt.sign(
      {
        id: user.rows[0].id,
        role: user.rows[0].role
      },
      "SECRET_KEY",
      {
        expiresIn: "7d"
      }
    );

    console.log("CONNEXION REUSSIE");

    res.json({

      token,

      user: {
  id: user.rows[0].id,
  shop_id: user.rows[0].shop_id,
  name: user.rows[0].name,
  role: user.rows[0].role
}

    });

  } catch (err) {

    console.log("ERREUR LOGIN =", err);

    res.status(500).json({
      error: err.message
    });
  }
});

// ================= REGISTER =================

router.post("/register", async (req, res) => {

  try {

    console.log("========== REGISTER RECU ==========");

    const {
      name,
      email,
      password
    } = req.body;

    console.log(
      "NOM =",
      name,
      "EMAIL =",
      email
    );

    const userExists = await db.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (userExists.rows.length > 0) {

      return res.status(400).json({
        error: "Email déjà utilisé"
      });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword =
      await bcrypt.hash(password, salt);

    const newUser = await db.query(
      `
      INSERT INTO users
      (
        name,
        email,
        password,
        role
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
        name,
        email,
        hashedPassword,
        "user"
      ]
    );

    const token = jwt.sign(
      {
        id: newUser.rows[0].id,
        role: newUser.rows[0].role
      },
      "SECRET_KEY",
      {
        expiresIn: "7d"
      }
    );

    console.log("INSCRIPTION REUSSIE");

    res.json({

      token,

      user: {
        id: newUser.rows[0].id,
        name: newUser.rows[0].name,
        role: newUser.rows[0].role
      }

    });

  } catch (err) {

    console.log("ERREUR REGISTER =", err);

    res.status(500).json({
      error: err.message
    });
  }
});

// ================= EXPORT =================

module.exports = router;