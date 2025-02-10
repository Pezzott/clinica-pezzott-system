'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Patients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false
      },
      dateOfBirth: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      gender: {
        type: Sequelize.ENUM('masculino', 'feminino', 'outro', 'prefiro_nao_informar'),
        allowNull: false
      },
      cpf: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      rg: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true
      },
      maritalStatus: {
        type: Sequelize.ENUM('solteiro', 'casado', 'divorciado', 'viuvo', 'outro'),
        allowNull: false
      },
      occupation: {
        type: Sequelize.STRING,
        allowNull: true
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cep: {
        type: Sequelize.STRING,
        allowNull: false
      },
      emergencyContact: {
        type: Sequelize.STRING,
        allowNull: false
      },
      emergencyPhone: {
        type: Sequelize.STRING,
        allowNull: false
      },
      healthInsurance: {
        type: Sequelize.STRING,
        allowNull: true
      },
      insuranceNumber: {
        type: Sequelize.STRING,
        allowNull: true
      },
      insuranceExpirationDate: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM('ativo', 'inativo', 'aguardando', 'arquivado'),
        allowNull: false,
        defaultValue: 'ativo'
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      source: {
        type: Sequelize.ENUM('indicacao', 'site', 'redes_sociais', 'convenio', 'outro'),
        allowNull: false
      },
      firstAppointmentDate: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      lastAppointmentDate: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      preferredSchedule: {
        type: Sequelize.STRING,
        allowNull: true
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      createdBy: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      updatedBy: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Patients');
  }
}; 