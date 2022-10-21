const Validator = require("fastest-validator");
const v = new Validator();
const {
  findAll,
  findOne,
  findAllByAvailability,
  post,
  update,
  remove,
} = require("../repositories/carsRepository.js");

const schema = {
  car_name: { type: "string", min: 3, max: 255 },
  car_size: { type: "string", min: 5, max: 255 },
  car_type: { type: "string", min: 3, max: 255 },
  car_photo: { type: "string", min: 3, max: 255 },
  car_price: { type: "number", positive: true, integer: true },
};

exports.carValidator = (value) => {
  return v.validate(value, schema);
};

exports.getCars = async () => findAll();

exports.getDumpCars = async () => findAllByAvailability();

exports.getCar = async (id) => findOne(id);
  
exports.postCar = async (carData) => post(carData)

exports.updateCar = async (id, carData, findedCar) => update(id, carData, findedCar)