import React, { useState } from 'react'
import { Container, LoginBox, BackgroundOverlay } from './styles'
import { TextField, Button, Typography, Snackbar, Alert } from '@mui/material'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { authService } from '../../services/api'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const data = await authService.login(email, password)
      
      // Salva o token e os dados do usuário no localStorage
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      // Redireciona para a página inicial após o login
      navigate('/home')
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'Erro ao fazer login')
      } else if (error.request) {
        setError('Erro de conexão com o servidor')
      } else {
        setError('Erro ao processar a requisição')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <BackgroundOverlay />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <LoginBox>
          <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#2e7d32', fontWeight: 600 }}>
            Clínica Psicanalítica Pezzott
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ color: '#4a4a4a', mb: 4 }}>
            Gerenciamento de Sessões
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              label="E-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              label="Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              sx={{ mb: 3 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                backgroundColor: '#2e7d32',
                '&:hover': {
                  backgroundColor: '#1b5e20',
                },
                padding: '12px',
                fontSize: '1.1rem',
              }}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>
        </LoginBox>
      </motion.div>
      
      <Snackbar 
        open={!!error} 
        autoHideDuration={6000} 
        onClose={() => setError('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default Login 