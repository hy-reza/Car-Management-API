const { getUsersList } = require("../../../services/userService.js");

exports.getUsers = async (req, res) => {
  try {
    const users = getUsersList();
    res.status(200).json({
      status: "success",
      message: "Successfully got users list",
      data: users,
    });
  } catch (error) {
    console.error(error);
  }
};
