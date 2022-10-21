const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const {
  getUsersList,
  getUser,
  getUserByEmail,
  createUser,
  updateUser,
  removeUser,
} = require("../../../services/userService.js");
const { findUserByToken } = require("../../../services/authService.js");
const errorMessage = require("../../../services/errorMessage.js");

exports.signUp = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
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
  const dataUser = { name, email, password: hashedPassword };
  try {
    const { id, name, email, role } = await createUser(dataUser);
    res.status(200).json({
      status: "success",
      message: "Successfully sign up !",
      data: { id, name, email, role },
    });
  } catch (error) {
    errorMessage(error, res);
    console.error(error);
  }
};

exports.signIn = async (req, res) => {
  const { email: emailFromBody, password } = req.body;
  try {
    const user = await getUserByEmail(emailFromBody);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: `Username or password is incorrect`,
      });
    }
    const match = await argon2.verify(user.password, password);
    if (!match) {
      return res.status(404).json({
        status: "error",
        message: `Username or password is incorrect`,
      });
    }

    const { id, name, email, role } = user;
    const accessToken = jwt.sign(
      { id, name, email, role },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );
    const refreshToken = jwt.sign(
      { id, name, email, role },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    const updatedUser = await updateUser(id, { refreshToken }, user);
    console.log({ updatedUser });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 1000,
    });
    const {
      id: userid,
      name: username,
      email: useremail,
      role: userrole,
    } = updatedUser;
    res.status(200).json({
      status: "success",
      message: "Successfully sign in !",
      data: { id: userid, name: username, email: useremail, role: userrole },
      accessToken: accessToken,
    });
  } catch (error) {
    errorMessage(error, res);
    console.error(error);
  }
};
exports.signOut = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token)
    return res.status(203).json({
      status: "error",
      message: "Error you have no authoritative information ",
    });

  const findedUser = await findUserByToken(token);
  if (!findedUser)
    return res.status(404).json({
      status: "error",
      message: `Error user with with auth cridential : ${token} not found`,
    });

  try {
    const { id } = findedUser.id;
    const updatedUser = await updateUser(
      id,
      { refreshToken: null },
      findedUser
    );
    res.clearCookie("refreshToken");
    res.status(200).json({
      status: "success",
      message: `Successfully sign out !`,
      data: updatedUser,
    });
  } catch (error) {
    errorMessage(error, res);
    console.error(error);
  }
};
