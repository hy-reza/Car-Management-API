const { Car } = require("../models");

exports.findAll = () => Car.findAll({ where: { car_availability: true } });

exports.findOne = (id) =>
  Car.findOne({ where: { id, car_availability: true } });

exports.findAllByAvailability = () =>
  Car.findAll({ where: { car_availability: false } });

exports.post = (carData) => Car.create(carData);

exports.update = (id, carData, findedCar) =>
  findedCar.update(carData, { where: { id } });
