const express = require("express");
const router = express.Router();

// 💳 paiement mobile simulé
router.post("/", async (req, res) => {
  try {
    const { amount, phone } = req.body;

    // simulation succès
    res.json({
      message: "Paiement réussi 💰",
      amount,
      phone,
      status: "success"
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;