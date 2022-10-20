const { carValidator, getUsers } = require("../../../services/carService.js");
const errorMessage = require("../../../services/errorMessage.js");

exports.getCars = async (req, res) => {
  try {
    const findedCars = await getUsers()

    if (!findedCars) throw new Error(`Error: Invalid query `);

    res
      .status(200)
      .json({ message: "Successfully got cars data !", data: findedCars });
  } catch (e) {
    errorHandler(res, e);
  }
};