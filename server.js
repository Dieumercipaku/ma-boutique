const express = require("express");

const cors = require("cors");

const app = express();


// ================= DB =================

const pool = require("./db");


// ================= MIDDLEWARES =================

const authMiddleware =
require("./middleware/authMiddleware");

const roleMiddleware =
require("./middleware/roleMiddleware");


// ================= MIDDLEWARES GLOBAUX =================

app.use(cors());

app.use(express.json());


// ================= TEST DB =================

pool.connect()

  .then(client => {

    console.log("Connexion DB OK ✅");

    client.release();

  })

  .catch(err => {

    console.error(
      "ERREUR DB ❌",
      err.message
    );

  });


// ================= ROUTE TEST =================

app.get("/", (req, res) => {

  res.send("API Boutique fonctionne 🚀");

});


// ================= ROUTE PROTECTED =================

app.get(

  "/api/protected",

  authMiddleware,

  (req, res) => {

    res.json({

      message: "Accès autorisé 🔓",

      user: req.user

    });

  }

);


// ================= ADMIN ONLY =================

app.get(

  "/api/admin",

  authMiddleware,

  roleMiddleware("admin"),

  (req, res) => {

    res.json({

      message:
        "Bienvenue Admin 👑"

    });

  }

);


// ================= ROUTES API =================

app.use(
  "/api/attendance",
  require("./routes/attendance")
);
app.use(
  "/api/auth",
  require("./routes/auth")
);

app.use(
  "/api/employees",
  require("./routes/employees")
);

app.use(
  "/api/shops",
  require("./routes/shop")
);

app.use(
  "/api/products",
  require("./routes/product")
);

app.use(
  "/api/dashboard",
  require("./routes/dashboard")
);

app.use(
  "/api/sales",
  require("./routes/sale")
);

app.use(
  "/api/stats",
  require("./routes/stats")
);

app.use(
  "/api/top-products",
  require("./routes/topProducts")
);

app.use(
  "/api/sales-details",
  require("./routes/salesDetails")
);

app.use(
  "/api/payment",
  require("./routes/payment")
);
app.use(
  "/api/rh",
  require("./routes/rh")
);


// ================= GESTION ERREURS =================

app.use((err, req, res, next) => {

  console.error(

    "Erreur serveur ❌",

    err.stack

  );

  res.status(500).json({

    error: "Erreur serveur"

  });

});


// ================= START SERVER =================

const PORT =
process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Serveur lancé sur port ${PORT} 🚀`
  );

});