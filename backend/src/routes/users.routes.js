const express = require('express');
const router = express.Router();
const { User } = require('../models');
const authMiddleware = require('../middlewares/authMiddleware');
const bcrypt = require('bcryptjs');

// Middleware para verificar se é admin
router.use(authMiddleware.verifyToken);
router.use(authMiddleware.isAdmin);

// Listar todos os usuários
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'DESC']]
    });
    res.json(users);
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    res.status(500).json({ message: 'Erro ao listar usuários' });
  }
});

// Criar novo usuário
router.post('/', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Verifica se já existe um usuário com este email
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || 'collaborator',
      active: true
    });

    // Remove o password do retorno
    const { password: _, ...userWithoutPassword } = user.toJSON();
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ message: 'Erro ao criar usuário' });
  }
});

// Atualizar usuário
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, role } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Verifica se o email já está em uso por outro usuário
    if (email !== user.email) {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'Email já cadastrado' });
      }
    }

    // Atualiza os dados
    user.name = name;
    user.email = email;
    user.role = role;
    
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    // Remove o password do retorno
    const { password: _, ...userWithoutPassword } = user.toJSON();
    res.json(userWithoutPassword);
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ message: 'Erro ao atualizar usuário' });
  }
});

// Alternar status ativo/inativo
router.patch('/:id/toggle-active', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Não permite desativar o próprio usuário
    if (user.id === req.user.id) {
      return res.status(400).json({ message: 'Não é possível desativar seu próprio usuário' });
    }

    user.active = !user.active;
    await user.save();

    const { password: _, ...userWithoutPassword } = user.toJSON();
    res.json(userWithoutPassword);
  } catch (error) {
    console.error('Erro ao alterar status do usuário:', error);
    res.status(500).json({ message: 'Erro ao alterar status do usuário' });
  }
});

// Excluir usuário
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Não permite excluir o próprio usuário
    if (user.id === req.user.id) {
      return res.status(400).json({ message: 'Não é possível excluir seu próprio usuário' });
    }

    await user.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    res.status(500).json({ message: 'Erro ao excluir usuário' });
  }
});

module.exports = router; 