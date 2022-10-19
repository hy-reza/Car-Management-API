const { User } = require("../models");

exports.findAll = () => {
  return User.findAll();
};
