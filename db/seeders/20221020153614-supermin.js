"use strict";
const uuid4 = require("uuid4");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          id: uuid4(),
          name: "supermin",
          email: "supermin@gmail.com",
          password: "$argon2id$v=19$m=65536,t=3,p=4$d1yWwnU6twkg4YhCcrz/tg$5eU+XfUlwF4DP7s50O9NSyB3IjniUnNgNYIPhZFhcLM", // = pass123 
          role: "super admin",
          refreshToken: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
