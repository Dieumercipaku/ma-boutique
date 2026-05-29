const express = require("express");

const router = express.Router();

const pool = require("../db");

const bcrypt = require("bcryptjs");

// =====================================
// RECUPERER EMPLOYES
// =====================================

router.get("/", async (req, res) => {

  try {

    const employees = await pool.query(`
      SELECT
      id,
      name,
      email,
      role,
      active,
      created_at

      FROM employees

      ORDER BY id DESC
    `);

    res.json(employees.rows);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: "Erreur serveur"
    });
  }
});

// =====================================
// AJOUTER EMPLOYE
// =====================================

router.post("/", async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      role
    } = req.body;

    // Vérification
    if (
      !name ||
      !email ||
      !password
    ) {
      return res.status(400).json({
        error: "Champs manquants"
      });
    }

    // Vérifier email
    const checkUser = await pool.query(
      `
      SELECT *
      FROM employees
      WHERE email = $1
      `,
      [email]
    );

    if (checkUser.rows.length > 0) {

      return res.status(400).json({
        error: "Email existe déjà"
      });
    }

    // Hash password
    const hashedPassword =
      await bcrypt.hash(password, 10);

    // Ajouter employé
    const newEmployee = await pool.query(
      `
      INSERT INTO employees
      (
        name,
        email,
        password,
        role,
        active
      )

      VALUES
      ($1, $2, $3, $4, $5)

      RETURNING
      id,
      name,
      email,
      role,
      active,
      created_at
      `,
      [
        name,
        email,
        hashedPassword,
        role || "employee",
        true
      ]
    );

    res.json(newEmployee.rows[0]);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: err.message
    });
  }
});

// =====================================
// SUPPRIMER EMPLOYE
// =====================================

router.delete("/:id", async (req, res) => {

  try {

    const { id } = req.params;

    await pool.query(
      `
      DELETE FROM employees
      WHERE id = $1
      `,
      [id]
    );

    res.json({
      success: true
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: "Erreur serveur"
    });
  }
});

module.exports = router;