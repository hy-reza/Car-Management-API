const { findAll } = require("../repositories/usersRepository.js");

exports.getUsersList = async () => {
  const users = await findAll();
  return users;
};
