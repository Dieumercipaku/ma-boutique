const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// 📦 DB
const pool = require("./db");

// ✅ test connexion DB (SANS await direct)
pool.query("SELECT NOW()")
  .then(() => console.log("Connexion DB OK ✅"))
  .catch(err => console.error("ERREUR DB ❌", err.message));

// 🔐 Middleware
const authMiddleware = require("./middleware/authMiddleware");

// 🧪 TEST API
app.get("/", (req, res) => {
  res.send("API Boutique fonctionne 🚀");
});

// 🔐 PROTECTED
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

// 📦 ROUTES
app.use("/api/auth", require("./routes/auth"));
app.use("/api/shops", require("./routes/shop"));
app.use("/api/products", require("./routes/product"));
app.use("/api/dashboard", require("./routes/dashboard"));
app.use("/api/sales", require("./routes/sale"));
app.use("/api/stats", require("./routes/stats"));
app.use("/api/top-products", require("./routes/topProducts"));
app.use("/api/sales-details", require("./routes/salesDetails"));
app.use("/api/payment", require("./routes/payment"));

// ❌ gestion erreur globale (important)
app.use((err, req, res, next) => {
  console.error("Erreur serveur ❌", err.stack);
  res.status(500).json({ error: "Erreur serveur" });
});

// 🚀 START SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Serveur lancé sur port ${PORT} 🚀`);
});