import React, { useState, useEffect } from 'react';
import {
  Container,
  Content,
  UserCard,
  ActionButton,
  Header,
  SearchContainer,
  RoleChip,
  UserAvatar,
  UserInfo,
  CardActions,
  StyledDialog
} from './styles';
import {
  Typography,
  Grid,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
  IconButton,
  InputAdornment,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Block as BlockIcon,
  CheckCircle as ActiveIcon,
  Search as SearchIcon,
  Person as PersonIcon,
  AdminPanelSettings as AdminIcon,
  Support as CollaboratorIcon
} from '@mui/icons-material';
import api from '../../services/api';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'collaborator',
    active: true,
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/users');
      setUsers(response.data);
    } catch (error) {
      showSnackbar('Erro ao carregar usuários', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (user = null) => {
    setFormErrors({});
    if (user) {
      setSelectedUser(user);
      setFormData({
        name: user.name,
        email: user.email,
        password: '',
        role: user.role,
        active: user.active,
      });
    } else {
      setSelectedUser(null);
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'collaborator',
        active: true,
      });
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedUser(null);
    setFormErrors({});
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Nome é obrigatório';
    if (!formData.email.trim()) errors.email = 'Email é obrigatório';
    if (!selectedUser && !formData.password.trim()) errors.password = 'Senha é obrigatória';
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Email inválido';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      if (selectedUser) {
        await api.put(`/api/users/${selectedUser.id}`, formData);
        showSnackbar('Usuário atualizado com sucesso');
      } else {
        await api.post('/api/users', formData);
        showSnackbar('Usuário criado com sucesso');
      }
      handleCloseModal();
      loadUsers();
    } catch (error) {
      const message = error.response?.data?.message || 'Erro ao salvar usuário';
      showSnackbar(message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (user) => {
    try {
      await api.patch(`/api/users/${user.id}/toggle-active`);
      showSnackbar(`Usuário ${user.active ? 'desativado' : 'ativado'} com sucesso`);
      loadUsers();
    } catch (error) {
      showSnackbar('Erro ao alterar status do usuário', 'error');
    }
  };

  const handleDelete = async (user) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      try {
        await api.delete(`/api/users/${user.id}`);
        showSnackbar('Usuário excluído com sucesso');
        loadUsers();
      } catch (error) {
        showSnackbar('Erro ao excluir usuário', 'error');
      }
    }
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Header>
        <Typography variant="h4" component="h1">
          Gerenciamento de Usuários
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenModal()}
        >
          Novo Usuário
        </Button>
      </Header>

      <SearchContainer>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar usuários..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </SearchContainer>

      <Content>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
            <CircularProgress />
          </div>
        ) : (
          <Grid container spacing={3}>
            {filteredUsers.map((user) => (
              <Grid item xs={12} sm={6} md={4} key={user.id}>
                <UserCard elevation={2} active={user.active}>
                  <UserAvatar active={user.active}>
                    {user.role === 'admin' ? <AdminIcon /> : <CollaboratorIcon />}
                  </UserAvatar>
                  <UserInfo>
                    <Typography variant="h6">{user.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {user.email}
                    </Typography>
                    <RoleChip
                      label={user.role === 'admin' ? 'Administrador' : 'Colaborador'}
                      color={user.role === 'admin' ? 'primary' : 'secondary'}
                      icon={user.role === 'admin' ? <AdminIcon /> : <CollaboratorIcon />}
                    />
                  </UserInfo>
                  <CardActions>
                    <Tooltip title="Editar">
                      <ActionButton color="primary" onClick={() => handleOpenModal(user)}>
                        <EditIcon />
                      </ActionButton>
                    </Tooltip>
                    <Tooltip title={user.active ? 'Desativar' : 'Ativar'}>
                      <ActionButton
                        color={user.active ? 'warning' : 'success'}
                        onClick={() => handleToggleActive(user)}
                      >
                        {user.active ? <BlockIcon /> : <ActiveIcon />}
                      </ActionButton>
                    </Tooltip>
                    <Tooltip title="Excluir">
                      <ActionButton color="error" onClick={() => handleDelete(user)}>
                        <DeleteIcon />
                      </ActionButton>
                    </Tooltip>
                  </CardActions>
                </UserCard>
              </Grid>
            ))}
          </Grid>
        )}
      </Content>

      <StyledDialog open={openModal} onClose={handleCloseModal} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedUser ? 'Editar Usuário' : 'Novo Usuário'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} style={{ marginTop: '8px' }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nome"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                error={!!formErrors.name}
                helperText={formErrors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                error={!!formErrors.email}
                helperText={formErrors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Senha"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                error={!!formErrors.password}
                helperText={formErrors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Função</InputLabel>
                <Select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  label="Função"
                >
                  <MenuItem value="admin">Administrador</MenuItem>
                  <MenuItem value="collaborator">Colaborador</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="inherit">
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Salvar'}
          </Button>
        </DialogActions>
      </StyledDialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UserManagement; 