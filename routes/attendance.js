const express = require("express");

const router = express.Router();

const pool = require("../db");

const authMiddleware =
require("../middleware/authMiddleware");

// ================= POINTAGE ENTREE =================

router.post(
  "/check-in/:employee_id",
  authMiddleware,
  async (req, res) => {

    try {

      const { employee_id } =
      req.params;

      const now = new Date();

      // retard après 08h00

      const retard =
      now.getHours() >= 8;

      const result =
      await pool.query(
        `
        INSERT INTO attendances
        (
          employee_id,
          check_in,
          status,
          retard
        )
        VALUES($1,$2,$3,$4)
        RETURNING *
        `,
        [
          employee_id,
          now,
          "present",
          retard
        ]
      );

      res.json(result.rows[0]);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: err.message
      });
    }
  }
);

// ================= SORTIE =================

router.put(
  "/check-out/:employee_id",
  authMiddleware,
  async (req, res) => {

    try {

      const { employee_id } =
      req.params;

      const result =
      await pool.query(
        `
        UPDATE attendances
        SET check_out = NOW()
        WHERE employee_id = $1
        AND date = CURRENT_DATE
        RETURNING *
        `,
        [employee_id]
      );

      res.json(result.rows[0]);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: err.message
      });
    }
  }
);

// ================= HISTORIQUE =================

router.get(
  "/history/:employee_id",
  authMiddleware,
  async (req, res) => {

    try {

      const result =
      await pool.query(
        `
        SELECT *
        FROM attendances
        WHERE employee_id = $1
        ORDER BY id DESC
        `,
        [req.params.employee_id]
      );

      res.json(result.rows);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: err.message
      });
    }
  }
);

// ================= TABLEAU RH =================

router.get(
  "/dashboard",
  authMiddleware,
  async (req, res) => {

    try {

      const present =
      await pool.query(
        `
        SELECT COUNT(*)
        FROM attendances
        WHERE date = CURRENT_DATE
        AND status='present'
        `
      );

      const retard =
      await pool.query(
        `
        SELECT COUNT(*)
        FROM attendances
        WHERE retard = true
        AND date = CURRENT_DATE
        `
      );

      const absent =
      await pool.query(
        `
        SELECT COUNT(*)
        FROM employees
        WHERE id NOT IN (
          SELECT employee_id
          FROM attendances
          WHERE date = CURRENT_DATE
        )
        `
      );

      res.json({

        presents:
        present.rows[0].count,

        retards:
        retard.rows[0].count,

        absents:
        absent.rows[0].count
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: err.message
      });
    }
  }
);

module.exports = router;