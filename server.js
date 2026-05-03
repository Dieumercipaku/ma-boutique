const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));

app.listen(5000, () => {
  console.log("Serveur lancé sur http://localhost:5000");
});
app.get("/", (req, res) => {
  res.send("API Boutique fonctionne 🚀");
});
const pool = require("./db");

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("ERREUR DB ❌", err);
  } else {
    console.log("Connexion DB OK ✅");
  }
});
const authMiddleware = require("./middleware/authMiddleware");

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
app.use("/api/shops", require("./routes/shop"));
app.use("/api/products", require("./routes/product"));
app.use("/api/dashboard", require("./routes/dashboard"));
app.use("/api/sales", require("./routes/sale"));
app.use("/api/stats", require("./routes/stats"));
app.use("/api/top-products", require("./routes/topProducts"));
app.use("/api/sales-details", require("./routes/salesDetails"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/product"));
app.use("/api/stats", require("./routes/stats"));
app.use("/api/payment", require("./routes/payment"));