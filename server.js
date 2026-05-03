const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// 📦 DB
const pool = require("./db");
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("ERREUR DB ❌", err);
  } else {
    console.log("Connexion DB OK ✅");
  }
});

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

// 🚀 START SERVER (TOUJOURS À LA FIN)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Serveur lancé 🚀");
});