'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Patients', 'address', {
      type: Sequelize.STRING,
      allowNull: true
    });
    
    await queryInterface.changeColumn('Patients', 'city', {
      type: Sequelize.STRING,
      allowNull: true
    });
    
    await queryInterface.changeColumn('Patients', 'state', {
      type: Sequelize.STRING,
      allowNull: true
    });
    
    await queryInterface.changeColumn('Patients', 'cep', {
      type: Sequelize.STRING,
      allowNull: true
    });
    
    await queryInterface.changeColumn('Patients', 'source', {
      type: Sequelize.ENUM('indicacao', 'site', 'redes_sociais', 'convenio', 'outro'),
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Patients', 'address', {
      type: Sequelize.STRING,
      allowNull: false
    });
    
    await queryInterface.changeColumn('Patients', 'city', {
      type: Sequelize.STRING,
      allowNull: false
    });
    
    await queryInterface.changeColumn('Patients', 'state', {
      type: Sequelize.STRING,
      allowNull: false
    });
    
    await queryInterface.changeColumn('Patients', 'cep', {
      type: Sequelize.STRING,
      allowNull: false
    });
    
    await queryInterface.changeColumn('Patients', 'source', {
      type: Sequelize.ENUM('indicacao', 'site', 'redes_sociais', 'convenio', 'outro'),
      allowNull: false
    });
  }
}; 