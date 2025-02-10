const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rota de login
router.post('/login', authController.login);

// Rota para verificar token
router.post('/check-token', authController.checkToken);

// Rota protegida de exemplo (requer autenticação)
router.get('/protected', 
  authMiddleware.verifyToken, 
  authMiddleware.isActive,
  (req, res) => {
    res.json({ 
      message: 'Rota protegida acessada com sucesso',
      user: req.user 
    });
  }
);

module.exports = router; 