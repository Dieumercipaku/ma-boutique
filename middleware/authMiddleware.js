const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "Accès refusé ❌" });
    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    const decoded = jwt.verify(token, "SECRET_KEY");

    req.user = decoded;
    next();

  } catch (err) {
    res.status(401).json({ error: "Token invalide ❌" });
  }
};