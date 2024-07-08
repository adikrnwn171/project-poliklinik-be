"use strict";

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
    await queryInterface.bulkInsert("Polis", [
      {
        namaPoli: "Mata",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        namaPoli: "THT",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        namaPoli: "Umum",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        namaPoli: "Bedah",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        namaPoli: "Gigi",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        namaPoli: "Jantung",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        namaPoli: "Paru",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        namaPoli: "Penyakit Dalam",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        namaPoli: "Orthopaedi",
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
