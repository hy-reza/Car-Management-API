const {
  findAll,
  findOne,
  findOneByEmail,
  create,
  update,
  remove,
} = require("../repositories/usersRepository.js");

exports.getUsersList = async () => {
  const users = findAll();
  return users;
};

exports.getUser = async (id) => {
  const user = findOne(id);
  return user;
};

exports.getUserByEmail = async (email) => {
  const user = findOneByEmail(email);
  return user;
};

exports.createUser = async (userData) => {
  const newUser = create(userData);
  return newUser;
};

exports.updateUser = async (id, userData, findedUser) => {
  const updatedUser = update(id, userData, findedUser);
  return updatedUser;
};

exports.removeUser = async (id) => {
  return remove(id);
};
