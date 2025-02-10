'use strict';
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Administrador',
        email: 'admin@clinicapezzott.com',
        password: await bcrypt.hash('admin123', 10),
        role: 'admin',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Colaborador',
        email: 'colaborador@clinicapezzott.com',
        password: await bcrypt.hash('colab123', 10),
        role: 'collaborator',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
