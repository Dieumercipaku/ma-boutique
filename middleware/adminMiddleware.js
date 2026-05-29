module.exports = (req, res, next) => {

  try {

    // utilisateur connecté
    const user = req.user;

    // vérifier rôle
    if (
      user.role !== "admin" &&
      user.role !== "administrateur"
    ) {

      return res.status(403).json({
        error: "Accès refusé ❌"
      });
    }

    next();

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: "Erreur serveur"
    });
  }
};