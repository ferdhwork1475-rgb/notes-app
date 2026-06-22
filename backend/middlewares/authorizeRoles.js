const authorizeRoles = (allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      throw new Error("Forbidden: You do not have permission.");
      return res.status(403);
    }
    next();
  };
};

export default authorizeRoles;
