"use strict";

const { faker } = require("@faker-js/faker");
const uuid4 = require("uuid4");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let carSize = ["Small", "Medium", "Large"];
    let carType = ["Sport", "Family", "Other"];
    faker.seed(12312332);
    const carPhoto = [
      "1666281168136-pexels-alexgtacar-1592384.jpg",
      "1666276374142-901950.jpg",
      "1666337149105-pexels-pavlo-luchkovski-337909.jpg",
    ];
    let dataCars = [];
    for (let i = 0; i <= 20; i++) {
      let id = uuid4();
      dataCars.push({
        id: id,
        car_name: faker.vehicle.vehicle(),
        car_price: faker.datatype.number({ min: 200000, max: 2000000 }),
        car_type: carType[Math.floor(Math.random() * carSize.length)],
        car_size: carSize[Math.floor(Math.random() * carSize.length)],
        car_photo: `static/cars/${
          carPhoto[Math.floor(Math.random() * carSize.length)]
        }`,
        createdBy: faker.internet.userName(),
        updatedBy: faker.internet.userName(),
        deletedBy: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        car_availability: true,
      });
    }
    await queryInterface.bulkInsert("Cars", dataCars, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Cars", null, {});
  },
};
