exports.superminOnly = (req, res, next) => {
  console.log(req.user.role);
  if (req.user.role === "super admin") {
    next();
  } else {
    return res.status(403).json({ message: "Error : access denied " });
  }
};

exports.adminOnly = (req, res, next) => {
  console.log(req.user.role);
  if (req.user.role === "admin" || req.user.role === "super admin") {
    next();
  } else {
    res
      .status(403)
      .json({ status: "error", message: "Error : access denied " });
  }
};
