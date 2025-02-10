const express = require('express');
const cors = require('cors');
const db = require('./models');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/users.routes');
const patientRoutes = require('./routes/patients.routes');

const app = express();

app.use(cors());
app.use(express.json());

// Rotas de autenticação
app.use('/api/auth', authRoutes);

// Rotas de usuários
app.use('/api/users', userRoutes);

// Rotas de pacientes
app.use('/api/patients', patientRoutes);

// Rota básica para testar a conexão
app.get('/api/test', (req, res) => {
  res.json({ message: 'Conexão com o backend estabelecida com sucesso!' });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  try {
    await db.sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  } catch (error) {
    console.error('Erro ao conectar com o banco de dados:', error);
  }
}); 