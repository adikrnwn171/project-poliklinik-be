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
    await queryInterface.bulkInsert("Pasiens", [
      {
        name: "Charlie",
        email: "charlie@gmail.com",
        password: hashedPassword,
        address: "jakarta",
        idNumber: "3309111030020004",
        phone: "08123456789",
        rm: "202406-001",
        verified: true,
        otp: "452713",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Steve",
        email: "steve@gmail.com",
        password: hashedPassword,
        address: "depok",
        idNumber: "3309111030010003",
        phone: "08123456777",
        rm: "202406-002",
        verified: true,
        otp: "592713",
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
