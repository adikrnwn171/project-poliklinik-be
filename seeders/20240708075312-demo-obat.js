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
      },
      {
        namaObat: "amoxilin",
        kemasan: "kapsul",
        harga: 12000,
      },
      {
        namaObat: "asam mefenamat",
        kemasan: "tablet",
        harga: 13000,
      },
      {
        namaObat: "intunal",
        kemasan: "tablet",
        harga: 8000,
      },
      {
        namaObat: "vit c",
        kemasan: "tablet",
        harga: 5000,
      },
      {
        namaObat: "obh",
        kemasan: "botol",
        harga: 7000,
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
