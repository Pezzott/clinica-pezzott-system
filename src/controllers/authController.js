const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');

const JWT_SECRET = process.env.JWT_SECRET || 'sua_chave_secreta_aqui';

const authController = {
  // Login do usuário
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Verifica se o usuário existe
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: 'Email ou senha inválidos' });
      }

      // Verifica se o usuário está ativo
      if (!user.active) {
        return res.status(401).json({ message: 'Usuário desativado. Entre em contato com o administrador.' });
      }

      // Verifica a senha
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Email ou senha inválidos' });
      }

      // Gera o token JWT
      const token = jwt.sign(
        { 
          id: user.id, 
          email: user.email, 
          role: user.role,
          name: user.name
        },
        JWT_SECRET,
        { expiresIn: '8h' }
      );

      // Retorna os dados do usuário e o token
      return res.json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        },
        token
      });
    } catch (error) {
      console.error('Erro no login:', error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  },

  // Verifica se o token é válido e retorna os dados do usuário
  async checkToken(req, res) {
    try {
      const { token } = req.body;
      
      if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
      }

      // Verifica o token
      const decoded = jwt.verify(token, JWT_SECRET);
      
      // Busca o usuário no banco
      const user = await User.findByPk(decoded.id);
      
      if (!user || !user.active) {
        return res.status(401).json({ message: 'Usuário inválido ou desativado' });
      }

      return res.json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({ message: 'Token inválido' });
      }
      console.error('Erro na verificação do token:', error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
};

module.exports = authController; 