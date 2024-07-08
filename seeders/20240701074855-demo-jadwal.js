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
    await queryInterface.bulkInsert("JadwalPeriksas", [
      {
        idDokter: 1,
        hari: "Senin",
        jamMulai: "07:00:00",
        jamSelesai: "10:00:00",
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idDokter: 2,
        hari: "Selasa",
        jamMulai: "13:00:00",
        jamSelesai: "17:00:00",
        active: true,
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
