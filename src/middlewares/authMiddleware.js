const jwt = require('jsonwebtoken');
const { User } = require('../models');

const JWT_SECRET = process.env.JWT_SECRET || 'sua_chave_secreta_aqui';

const authMiddleware = {
  // Verifica se o usuário está autenticado
  async verifyToken(req, res, next) {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res.status(401).json({ message: 'Token não fornecido' });
      }

      const [, token] = authHeader.split(' ');

      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        return next();
      } catch (err) {
        return res.status(401).json({ message: 'Token inválido' });
      }
    } catch (error) {
      console.error('Erro na verificação do token:', error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  },

  // Verifica se o usuário é um administrador
  async isAdmin(req, res, next) {
    try {
      const user = await User.findByPk(req.user.id);
      
      if (!user || user.role !== 'admin') {
        return res.status(403).json({ message: 'Acesso negado. Apenas administradores podem acessar este recurso.' });
      }

      next();
    } catch (error) {
      console.error('Erro na verificação de admin:', error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  },

  // Verifica se o usuário está ativo
  async isActive(req, res, next) {
    try {
      const user = await User.findByPk(req.user.id);
      
      if (!user || !user.active) {
        return res.status(403).json({ message: 'Usuário desativado. Entre em contato com o administrador.' });
      }

      next();
    } catch (error) {
      console.error('Erro na verificação de usuário ativo:', error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
};

module.exports = authMiddleware; 