const express = require('express');
const router = express.Router();
const { Patient, User } = require('../models');
const { Sequelize } = require('sequelize');
const { Op } = Sequelize;
const authMiddleware = require('../middlewares/authMiddleware');

// Middleware de autenticação para todas as rotas
router.use(authMiddleware.verifyToken);
router.use(authMiddleware.isActive);

// Listar todos os pacientes
router.get('/', async (req, res) => {
  try {
    const patients = await Patient.findAll({
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'name'],
        },
        {
          model: User,
          as: 'updater',
          attributes: ['id', 'name'],
        }
      ]
    });
    res.json(patients);
  } catch (error) {
    console.error('Erro ao listar pacientes:', error);
    res.status(500).json({ message: 'Erro ao listar pacientes' });
  }
});

// Buscar paciente por ID
router.get('/:id', async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'name'],
        },
        {
          model: User,
          as: 'updater',
          attributes: ['id', 'name'],
        }
      ]
    });
    
    if (!patient) {
      return res.status(404).json({ message: 'Paciente não encontrado' });
    }
    
    res.json(patient);
  } catch (error) {
    console.error('Erro ao buscar paciente:', error);
    res.status(500).json({ message: 'Erro ao buscar paciente' });
  }
});

// Criar novo paciente
router.post('/', async (req, res) => {
  try {
    const patientData = {
      ...req.body,
      createdBy: req.user.id,
      updatedBy: req.user.id
    };

    // Verifica se já existe um paciente com este CPF ou email
    const existingPatient = await Patient.findOne({
      where: {
        [Op.or]: [
          { cpf: patientData.cpf },
          { email: patientData.email }
        ]
      }
    });

    if (existingPatient) {
      return res.status(400).json({ 
        message: 'Já existe um paciente cadastrado com este CPF ou email' 
      });
    }

    const patient = await Patient.create(patientData);
    
    const patientWithRelations = await Patient.findByPk(patient.id, {
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'name'],
        },
        {
          model: User,
          as: 'updater',
          attributes: ['id', 'name'],
        }
      ]
    });

    res.status(201).json(patientWithRelations);
  } catch (error) {
    console.error('Erro ao criar paciente:', error);
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ 
        message: 'Dados inválidos', 
        errors: error.errors.map(e => ({ field: e.path, message: e.message }))
      });
    }
    res.status(500).json({ message: 'Erro ao criar paciente' });
  }
});

// Atualizar paciente
router.put('/:id', async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    
    if (!patient) {
      return res.status(404).json({ message: 'Paciente não encontrado' });
    }

    // Verifica se o CPF ou email já está em uso por outro paciente
    if (req.body.cpf !== patient.cpf || req.body.email !== patient.email) {
      const existingPatient = await Patient.findOne({
        where: {
          [Op.and]: [
            { id: { [Op.ne]: patient.id } },
            {
              [Op.or]: [
                { cpf: req.body.cpf },
                { email: req.body.email }
              ]
            }
          ]
        }
      });

      if (existingPatient) {
        return res.status(400).json({ 
          message: 'CPF ou email já cadastrado para outro paciente' 
        });
      }
    }

    const updatedData = {
      ...req.body,
      updatedBy: req.user.id
    };

    await patient.update(updatedData);
    
    const updatedPatient = await Patient.findByPk(patient.id, {
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'name'],
        },
        {
          model: User,
          as: 'updater',
          attributes: ['id', 'name'],
        }
      ]
    });

    res.json(updatedPatient);
  } catch (error) {
    console.error('Erro ao atualizar paciente:', error);
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ 
        message: 'Dados inválidos', 
        errors: error.errors.map(e => ({ field: e.path, message: e.message }))
      });
    }
    res.status(500).json({ message: 'Erro ao atualizar paciente' });
  }
});

// Alternar status ativo/inativo
router.patch('/:id/toggle-active', async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    
    if (!patient) {
      return res.status(404).json({ message: 'Paciente não encontrado' });
    }

    await patient.update({ 
      active: !patient.active,
      updatedBy: req.user.id
    });

    const updatedPatient = await Patient.findByPk(patient.id, {
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'name'],
        },
        {
          model: User,
          as: 'updater',
          attributes: ['id', 'name'],
        }
      ]
    });

    res.json(updatedPatient);
  } catch (error) {
    console.error('Erro ao alterar status do paciente:', error);
    res.status(500).json({ message: 'Erro ao alterar status do paciente' });
  }
});

// Excluir paciente (soft delete)
router.delete('/:id', async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    
    if (!patient) {
      return res.status(404).json({ message: 'Paciente não encontrado' });
    }

    await patient.destroy(); // Soft delete devido à opção paranoid: true
    res.status(204).send();
  } catch (error) {
    console.error('Erro ao excluir paciente:', error);
    res.status(500).json({ message: 'Erro ao excluir paciente' });
  }
});

module.exports = router; 