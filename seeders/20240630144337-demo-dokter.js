const bcrypt = require("bcrypt");

("use strict");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hashSync("admin", 10);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Dokters", [
      {
        dokterName: "George",
        email: "george@gmail.com",
        password: hashedPassword,
        address: "Jakarta",
        phone: "089157495629",
        idPoli: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        dokterName: "Warrent",
        email: "warrent@gmail.com",
        password: hashedPassword,
        address: "Depok",
        phone: "089157495456",
        idPoli: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
