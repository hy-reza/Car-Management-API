const jwt = require("jsonwebtoken");

module.exports = verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res
      .status(401)
      .json({ status: "error", message: "Error unauthorize" });
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err)
      return res.status(404).json({ status: "error", message: err.message });

    req.user = { ...decoded };
    next();
  });
};


