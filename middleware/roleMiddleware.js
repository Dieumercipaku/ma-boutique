const roleMiddleware = (...roles) => {

  return (req, res, next) => {

    // ================= CHECK ROLE =================

    if (!roles.includes(req.user.role)) {

      return res.status(403).json({
        error: "Accès refusé"
      });
    }

    next();
  };
};

module.exports = roleMiddleware;