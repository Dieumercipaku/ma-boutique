const express = require("express");

const router = express.Router();

const pool = require("../db");


// ==============================
// 📊 RH DASHBOARD
// ==============================

router.get("/dashboard", async (req, res) => {

  try {

    // 👥 Nombre présents
    const presents = await pool.query(`
      SELECT COUNT(*) 
      FROM attendance
      WHERE status = 'present'
    `);

    // ❌ Nombre absents
    const absents = await pool.query(`
      SELECT COUNT(*) 
      FROM attendance
      WHERE status = 'absent'
    `);

    // ⏰ Nombre retards
    const retards = await pool.query(`
      SELECT COUNT(*) 
      FROM attendance
      WHERE retard = true
    `);

    // 🕒 Heures travaillées
    const hours = await pool.query(`
      SELECT
        employee_id,
        check_in,
        check_out
      FROM attendance
      WHERE check_out IS NOT NULL
    `);

    // ✅ Réponse finale
    res.json({

      presents:
        Number(presents.rows[0].count),

      absents:
        Number(absents.rows[0].count),

      retards:
        Number(retards.rows[0].count),

      worked_hours:
        hours.rows || []

    });

  } catch (err) {

    console.log("Erreur RH Dashboard ❌");

    console.log(err.message);

    res.status(500).json({

      error: err.message

    });
  }
});


// ==============================
// EXPORT ROUTER
// ==============================

module.exports = router;