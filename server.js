const express = require("express");
const cors = require("cors");

const app = express();

// 🔐 middlewares
app.use(cors());
app.use(express.json());

// 📦 DB
const pool = require("./db");

// ✅ test connexion DB (safe)
pool.connect()
  .then(client => {
    console.log("Connexion DB OK ✅");
    client.release();
  })
  .catch(err => {
    console.error("ERREUR DB ❌", err.message);
  });

// 🔐 Middleware auth
const authMiddleware = require("./middleware/authMiddleware");

// 🧪 ROUTE TEST
app.get("/", (req, res) => {
  res.send("API Boutique fonctionne 🚀");
});

// 🔐 ROUTES PROTÉGÉES
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "Accès autorisé 🔓",
    user: req.user
  });
});

app.post("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "POST autorisé 🔥",
    user: req.user
  });
});

// 📦 ROUTES API
app.use("/api/auth", require("./routes/auth"));
app.use("/api/shops", require("./routes/shop"));
app.use("/api/products", require("./routes/product"));
app.use("/api/dashboard", require("./routes/dashboard"));
app.use("/api/sales", require("./routes/sale"));
app.use("/api/stats", require("./routes/stats"));
app.use("/api/top-products", require("./routes/topProducts"));
app.use("/api/sales-details", require("./routes/salesDetails"));
app.use("/api/payment", require("./routes/payment"));

// ❌ gestion erreurs globale
app.use((err, req, res, next) => {
  console.error("Erreur serveur ❌", err.stack);
  res.status(500).json({ error: "Erreur serveur" });
});

// 🚀 LANCEMENT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Serveur lancé sur port ${PORT} 🚀`);
});