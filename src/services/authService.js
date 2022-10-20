const { getUserByToken } = require("../repositories/authRepository.js");

exports.findUserByToken = async (token) => {
  return getUserByToken(token);
};
