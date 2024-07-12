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
    await queryInterface.bulkInsert("Obats", [
      {
        namaObat: "paracetamol",
        kemasan: "tablet",
        harga: 10000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        namaObat: "amoxilin",
        kemasan: "kapsul",
        harga: 12000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        namaObat: "asam mefenamat",
        kemasan: "tablet",
        harga: 13000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        namaObat: "intunal",
        kemasan: "tablet",
        harga: 8000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        namaObat: "vit c",
        kemasan: "tablet",
        harga: 5000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        namaObat: "obh",
        kemasan: "botol",
        harga: 7000,
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
