const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
      next();
    } else {
      res.status(401).json({ message: "You are prohibited from viewing this content" });
    }
  };
  
  const isAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.role === "admin") {
      next();
    } else {
      res.status(403).json({ message: "You are prohibited from viewing this content" });
    }
  };


module.exports = {
    isAuthenticated,
    isAdmin
  };