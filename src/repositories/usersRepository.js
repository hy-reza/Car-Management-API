const { User } = require("../models");

exports.findAll = () => {
  return User.findAll({
    attributes: ["id", "name", "email", "role"],
  });
};

exports.findOne = (id) => {
  return User.findOne({
    attributes: ["id", "name", "email", "role"],
    where: {
      id,
    },
  });
};

exports.findOneByEmail = (email) => {
  return User.findOne({
    where: {
      email,
    },
  });
};

exports.create = (userData) => {
  return User.create(userData);
};

exports.update = (id, userData, findedUser) => {
  return findedUser.update(userData, {
    where: {
      id,
    },
  });
};

exports.remove = (id) => {
  return User.destroy({ where: { id } });
};
