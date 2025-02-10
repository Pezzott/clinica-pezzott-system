'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    static associate(models) {
      Patient.belongsTo(models.User, {
        foreignKey: 'createdBy',
        as: 'creator'
      });
      Patient.belongsTo(models.User, {
        foreignKey: 'updatedBy',
        as: 'updater'
      });
      // Associações serão definidas aqui posteriormente
      // Patient.hasMany(models.Appointment)
      // Patient.hasMany(models.Session)
      // Patient.hasMany(models.PsychologicalTest)
    }
  }
  
  Patient.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    gender: {
      type: DataTypes.ENUM('masculino', 'feminino', 'outro', 'prefiro_nao_informar'),
      allowNull: false
    },
    cpf: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        len: [11, 14]
      }
    },
    rg: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true
    },
    maritalStatus: {
      type: DataTypes.ENUM('solteiro', 'casado', 'divorciado', 'viuvo', 'outro'),
      allowNull: false
    },
    occupation: {
      type: DataTypes.STRING,
      allowNull: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true
    },
    cep: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: {
          args: [8, 9],
          msg: 'CEP deve ter entre 8 e 9 caracteres'
        },
        validaCep(value) {
          if (value && value.trim() !== '' && !/^\d{8}$/.test(value.replace(/\D/g, ''))) {
            throw new Error('CEP inválido');
          }
        }
      }
    },
    emergencyContact: {
      type: DataTypes.STRING,
      allowNull: false
    },
    emergencyPhone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    healthInsurance: {
      type: DataTypes.STRING,
      allowNull: true
    },
    insuranceNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
    insuranceExpirationDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('ativo', 'inativo', 'aguardando', 'arquivado'),
      allowNull: false,
      defaultValue: 'ativo'
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    source: {
      type: DataTypes.ENUM('indicacao', 'site', 'redes_sociais', 'convenio', 'outro'),
      allowNull: true
    },
    firstAppointmentDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    lastAppointmentDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    preferredSchedule: {
      type: DataTypes.STRING,
      allowNull: true
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Patient',
    tableName: 'Patients',
    paranoid: true, // Soft delete
  });
  
  return Patient;
}; 