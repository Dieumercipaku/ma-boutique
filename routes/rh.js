const express = require("express");

const router = express.Router();

router.get("/dashboard", async (req, res) => {

  try {

    res.json({
      presents: 0,
      absents: 0,
      retards: 0,
      worked_hours: []
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: "Erreur serveur"
    });
  }
});

module.exports = router;