const { User } = require("../models");

exports.getUserByToken = (token) => {
  return User.findOne({ where: { refreshToken: token } });
};
