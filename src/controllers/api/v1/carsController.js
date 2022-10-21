const {
  carValidator,
  getCars,
  getCar,
  postCar,
  updateCar,
  getDumpCars
} = require("../../../services/carService.js");
const errorMessage = require("../../../services/errorMessage.js");

exports.getCars = async (req, res) => {
  try {
    const response = await getCars();

    if (!response) {
      res.status(404).json({
        status: "error",
        message: "Error : cars not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Successfully got cars data !",
      data: response,
    });
  } catch (error) {
    errorMessage(error, res);
    console.error(error);
  }
};

exports.getCarById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await getCar(id);

    if (!response) {
      return res.status(404).json({
        status: "error",
        message: "Error : car not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Successfully got car data !",
      data: response,
    });
  } catch (error) {
    errorMessage(error, res);
    console.error(error);
  }
};

exports.postCars = async (req, res) => {
  const { car_name, car_size, car_type, car_price } = req.body;
  try {
    const newCar = {
      car_name,
      car_size,
      car_type,
      car_price,
      car_photo: `/static/${req.file.filename}`,
      car_price: Number(car_price),
      createdBy: req.user.name,
      updatedBy: "",
      deletedBy: "",
    };

    const validator = carValidator(newCar);
    if (validator.length) {
      return res.status(200).json({ status: "error", message: validator });
    }

    const car = await postCar(newCar);
    res.status(200).json({
      status: "success",
      message: `Successfully post a new car with id: ${car.id} `,
      data: car,
    });
  } catch (error) {
    errorMessage(error, res);
    console.error(error);
  }
};

exports.updateCars = async (req, res) => {
  const { id } = req.params;
  const { car_name, car_size, car_type, car_price } = req.body;
  try {
    //find car by id
    const response = await getCar(id);

    if (!response) {
      res.status(404).json({
        status: "error",
        message: "Error : car not found",
      });
    }
    const carData = {
      car_name,
      car_size,
      car_type,
      car_price,
      car_photo: `/static/${req.file.filename}`,
      car_price: Number(car_price),
      createdBy: response.createdBy,
      updatedBy: req.user.name,
      deletedBy: response.deletedBy,
    };
    //validate car input
    const validator = carValidator(carData);
    if (validator.length) {
      return res.status(200).json({ status: "error", message: validator });
    }

    //update finded car
    const updatedCar = await updateCar(id, carData, response);

    res.status(200).json({
      status: "success",
      message: `Successfully post a new car with id: ${id} `,
      data: updatedCar,
    });
  } catch (error) {
    errorMessage(error, res);
    console.error(error);
  }
};

exports.deleteCars = async (req, res) => {
  const { id } = req.params;
  try {
    //find car by id
    const findedCar = await getCar(id);

    // const arrImgPath = findedCar.car_photo.split("/");

    // if (findedCar.car_photo) {
    //   fs.unlinkSync(`static/${arrImgPath[arrImgPath.length - 1]}`);
    // }

    if (!findedCar)
      return res.status(404).json({
        status: "error",
        message: "Error : car not found",
      });

    const deletedCar = await updateCar(
      id,
      { ...findedCar, car_availability: false, deletedBy: req.user.name },
      findedCar
    );
    res.status(200).json({
      status: "success",
      message: `Successfully deleted car with id : ${id}`,
      data: deletedCar,
    });
  } catch (error) {
    errorMessage(error, res)
    console.error(error);
  }
};

exports.getCarsDump = async (req, res) => {
  try {
    const response = await getDumpCars();

    if (!response) {
      res.status(404).json({
        status: "error",
        message: "Error : cars not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Successfully got cars data !",
      data: response,
    });
  } catch (error) {
    errorMessage(error, res);
    console.error(error);
  }
}