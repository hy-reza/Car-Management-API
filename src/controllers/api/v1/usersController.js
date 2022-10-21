const {
  getUsersList,
  getUser,
  getUserByEmail,
  createUser,
  updateUser,
  removeUser,
} = require("../../../services/userService.js");
const { findUserByToken } = require("../../../services/authService.js");

const argon2 = require("argon2");
const errorMessage = require("../../../services/errorMessage.js");

exports.getUsers = async (req, res) => {
  try {
    const response = await getUsersList();
    if (!response) {
      res.status(404).json({
        status: "error",
        message: "Error : users not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Successfully got users list",
      data: response,
    });
  } catch (error) {
    errorMessage(error, res);
    console.error(error);
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await getUser(id);
    console.log(response);
    if (!response) {
      return res.status(404).json({
        status: "error",
        message: `Error user with id : ${id} not found`,
      });
    }
    res.status(200).json({
      status: "success",
      message: `Successfully got user with id : ${id}`,
      data: response,
    });
  } catch (error) {
    errorMessage(error, res);
    console.error(error);
  }
};

exports.getCurrentUser = async (req, res) => {
  let token = req.cookies.refreshToken;
  if (!token)
    return res.status(203).json({
      status: "error",
      message: "Error you have no authoritative information ",
    });
  try {
    const findedUser = await findUserByToken(token);
    if (!findedUser)
      return res.status(404).json({
        status: "error",
        message: `Error user with with auth cridential : ${token} not found`,
      });
    const { id, name, email, role } = findedUser;
    res.status(200).json({
      status: "success",
      message: `Successfully got current user with auth cridential : ${token}`,
      data: { id, name, email, role },
    });
  } catch (error) {
    console.error(error);
    errorMessage(error, res);
  }
};

exports.createUser = async (req, res) => {
  const { name, email, password, confirmPassword, role } = req.body;
  //check if password is incorrect
  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ status: "error", message: "Incorrect Password" });
  }

  //check if email allready in use
  const findedUserByEmail = await getUserByEmail(email);
  if (email === findedUserByEmail?.email) {
    return res.status(400).json({
      status: "error",
      message: `Error email : ${email} already in use`,
    });
  }

  const hashedPassword = await argon2.hash(password);
  const dataUser = { name, email, password: hashedPassword, role };
  try {
    const { id, name, email, role } = await createUser(dataUser);
    res.status(200).json({
      status: "success",
      message: "Successfully created user",
      data: { id, name, email, role },
    });
  } catch (error) {
    errorMessage(error, res);
    console.error(error);
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const findedUser = await getUser(id);

  if (!findedUser) {
    return res.status(404).json({
      status: "error",
      message: `Error user with id : ${id} not found`,
    });
  }

  const { name, email, password, confirmPassword, role } = req.body;
  let hashedPassword;
  if (password === null || password === "") {
    hashedPassword = findedUser.password;
  } else {
    hashedPassword = await argon2.hash(password);
  }

  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ status: "error", message: "Incorrect Password" });
  }

  const userData = {
    name,
    email,
    password: hashedPassword,
    role,
  };

  try {
    const response = await updateUser(id, userData, findedUser);

    const { id: userid, name, email, role } = response;
    res.status(200).json({
      status: "success",
      message: `Successfully updated user with id : ${id}`,
      data: { id: userid, name, email, role },
    });
  } catch (error) {
    errorMessage(error, res);
    console.error(error);
  }
};

exports.removeUser = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await removeUser(id);
    if (!response) {
      return res.status(404).json({
        status: "error",
        message: `Error user with id : ${id} not found`,
      });
    }
    res.status(200).json({
      status: "success",
      message: `Successfully removed user with id : ${id}`,
    });
  } catch (error) {
    errorMessage(error, res);
    console.error(error);
  }
};
