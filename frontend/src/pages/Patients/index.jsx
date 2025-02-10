import React, { useState, useEffect } from 'react';
import {
  Container,
  Header,
  SearchContainer,
  Content,
  PatientCard,
  PatientInfo,
  StatusChip,
  CardActions,
  StyledDialog,
  TabPanel,
  FormSection
} from './styles';
import {
  Typography,
  Grid,
  Button,
  TextField,
  InputAdornment,
  Tooltip,
  IconButton,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Snackbar,
  Alert,
  Divider
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Block as BlockIcon,
  CheckCircle as ActiveIcon,
  Person as PersonIcon,
  Event as EventIcon,
  LocationOn as LocationIcon,
  LocalHospital as HealthIcon,
  ContactPhone as ContactIcon,
  Notes as NotesIcon
} from '@mui/icons-material';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import api from '../../services/api';
import InputMask from 'react-input-mask';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    cpf: '',
    rg: '',
    maritalStatus: '',
    occupation: '',
    address: '',
    city: '',
    state: '',
    cep: '',
    emergencyContact: '',
    emergencyPhone: '',
    healthInsurance: '',
    insuranceNumber: '',
    insuranceExpirationDate: '',
    status: 'ativo',
    notes: '',
    source: '',
    preferredSchedule: '',
    active: true
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/patients');
      setPatients(response.data);
    } catch (error) {
      showSnackbar('Erro ao carregar pacientes', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (patient = null) => {
    setFormErrors({});
    if (patient) {
      setSelectedPatient(patient);
      setFormData({
        ...patient,
        dateOfBirth: format(new Date(patient.dateOfBirth), 'yyyy-MM-dd'),
        insuranceExpirationDate: patient.insuranceExpirationDate
          ? format(new Date(patient.insuranceExpirationDate), 'yyyy-MM-dd')
          : ''
      });
    } else {
      setSelectedPatient(null);
      setFormData({
        name: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        gender: '',
        cpf: '',
        rg: '',
        maritalStatus: '',
        occupation: '',
        address: '',
        city: '',
        state: '',
        cep: '',
        emergencyContact: '',
        emergencyPhone: '',
        healthInsurance: '',
        insuranceNumber: '',
        insuranceExpirationDate: '',
        status: 'ativo',
        notes: '',
        source: '',
        preferredSchedule: '',
        active: true
      });
    }
    setTabValue(0);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedPatient(null);
    setFormErrors({});
  };

  const validateForm = () => {
    const errors = {};
    const requiredFields = [
      'name', 'email', 'phone', 'dateOfBirth', 'gender', 'cpf',
      'maritalStatus', 'emergencyContact', 'emergencyPhone'
    ];

    requiredFields.forEach(field => {
      if (!formData[field]?.trim()) {
        errors[field] = 'Campo obrigatório';
      }
    });

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Email inválido';
    }

    if (formData.cpf && !/^\d{11}$/.test(formData.cpf.replace(/\D/g, ''))) {
      errors.cpf = 'CPF inválido';
    }

    if (formData.cep && !/^\d{8}$/.test(formData.cep.replace(/\D/g, ''))) {
      errors.cep = 'CEP inválido';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      showSnackbar('Por favor, corrija os erros no formulário', 'error');
      return;
    }

    setLoading(true);
    try {
      // Limpa campos vazios e formata dados
      const data = Object.keys(formData).reduce((acc, key) => {
        // Remove espaços em branco do início e fim
        const value = typeof formData[key] === 'string' ? formData[key].trim() : formData[key];
        
        // Se o valor for uma string vazia ou null/undefined, não inclui no objeto
        if (value === '' || value === null || value === undefined) {
          return acc;
        }

        // Formata o CEP removendo caracteres especiais
        if (key === 'cep' && value) {
          acc[key] = value.replace(/\D/g, '');
        } else {
          acc[key] = value;
        }

        return acc;
      }, {});

      if (selectedPatient) {
        await api.put(`/api/patients/${selectedPatient.id}`, data);
        showSnackbar('Paciente atualizado com sucesso');
      } else {
        await api.post('/api/patients', data);
        showSnackbar('Paciente cadastrado com sucesso');
      }
      handleCloseModal();
      loadPatients();
    } catch (error) {
      const message = error.response?.data?.message || 'Erro ao salvar paciente';
      showSnackbar(message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (patient) => {
    try {
      await api.patch(`/api/patients/${patient.id}/toggle-active`);
      showSnackbar(`Paciente ${patient.active ? 'desativado' : 'ativado'} com sucesso`);
      loadPatients();
    } catch (error) {
      showSnackbar('Erro ao alterar status do paciente', 'error');
    }
  };

  const handleDelete = async (patient) => {
    if (window.confirm('Tem certeza que deseja excluir este paciente?')) {
      try {
        await api.delete(`/api/patients/${patient.id}`);
        showSnackbar('Paciente excluído com sucesso');
        loadPatients();
      } catch (error) {
        showSnackbar('Erro ao excluir paciente', 'error');
      }
    }
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.cpf.includes(searchTerm)
  );

  const formatDate = (date) => {
    if (!date) return '';
    return format(new Date(date), 'dd/MM/yyyy', { locale: ptBR });
  };

  return (
    <Container>
      <Header>
        <Typography variant="h4" component="h1">
          Gerenciamento de Pacientes
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenModal()}
        >
          Novo Paciente
        </Button>
      </Header>

      <SearchContainer>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar pacientes por nome, email ou CPF..."
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
            {filteredPatients.map((patient) => (
              <Grid item xs={12} sm={6} md={4} key={patient.id}>
                <PatientCard elevation={2} active={patient.active}>
                  <PatientInfo>
                    <div className="patient-header">
                      <PersonIcon />
                      <div>
                        <Typography variant="h6">{patient.name}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          {patient.email}
                        </Typography>
                      </div>
                    </div>
                    
                    <Divider sx={{ my: 1 }} />
                    
                    <div className="info-row">
                      <EventIcon />
                      <Typography variant="body2">
                        {formatDate(patient.dateOfBirth)}
                      </Typography>
                    </div>
                    
                    <div className="info-row">
                      <ContactIcon />
                      <Typography variant="body2">{patient.phone}</Typography>
                    </div>
                    
                    <div className="info-row">
                      <LocationIcon />
                      <Typography variant="body2">
                        {`${patient.city}, ${patient.state}`}
                      </Typography>
                    </div>

                    <StatusChip
                      label={patient.status.toUpperCase()}
                      status={patient.status}
                      size="small"
                    />
                  </PatientInfo>

                  <CardActions>
                    <Tooltip title="Editar">
                      <IconButton color="primary" onClick={() => handleOpenModal(patient)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={patient.active ? 'Desativar' : 'Ativar'}>
                      <IconButton
                        color={patient.active ? 'warning' : 'success'}
                        onClick={() => handleToggleActive(patient)}
                      >
                        {patient.active ? <BlockIcon /> : <ActiveIcon />}
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Excluir">
                      <IconButton color="error" onClick={() => handleDelete(patient)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </CardActions>
                </PatientCard>
              </Grid>
            ))}
          </Grid>
        )}
      </Content>

      <StyledDialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
      >
        <div className="dialog-header">
          <Typography variant="h6">
            {selectedPatient ? 'Editar Paciente' : 'Novo Paciente'}
          </Typography>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Dados Pessoais" />
            <Tab label="Endereço" />
            <Tab label="Contatos" />
            <Tab label="Convênio" />
            <Tab label="Observações" />
          </Tabs>
        </div>

        <form onSubmit={handleSubmit}>
          <TabPanel value={tabValue} index={0}>
            <FormSection>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Nome Completo"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    error={!!formErrors.name}
                    helperText={formErrors.name}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    error={!!formErrors.email}
                    helperText={formErrors.email}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputMask
                    mask="999.999.999-99"
                    value={formData.cpf}
                    onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                  >
                    {(inputProps) => (
                      <TextField
                        {...inputProps}
                        fullWidth
                        label="CPF"
                        error={!!formErrors.cpf}
                        helperText={formErrors.cpf}
                        required
                      />
                    )}
                  </InputMask>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="RG"
                    value={formData.rg}
                    onChange={(e) => setFormData({ ...formData, rg: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Data de Nascimento"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    InputLabelProps={{ shrink: true }}
                    error={!!formErrors.dateOfBirth}
                    helperText={formErrors.dateOfBirth}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required error={!!formErrors.gender}>
                    <InputLabel>Gênero</InputLabel>
                    <Select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      label="Gênero"
                    >
                      <MenuItem value="masculino">Masculino</MenuItem>
                      <MenuItem value="feminino">Feminino</MenuItem>
                      <MenuItem value="outro">Outro</MenuItem>
                      <MenuItem value="prefiro_nao_informar">Prefiro não informar</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required error={!!formErrors.maritalStatus}>
                    <InputLabel>Estado Civil</InputLabel>
                    <Select
                      value={formData.maritalStatus}
                      onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value })}
                      label="Estado Civil"
                    >
                      <MenuItem value="solteiro">Solteiro(a)</MenuItem>
                      <MenuItem value="casado">Casado(a)</MenuItem>
                      <MenuItem value="divorciado">Divorciado(a)</MenuItem>
                      <MenuItem value="viuvo">Viúvo(a)</MenuItem>
                      <MenuItem value="outro">Outro</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Profissão"
                    value={formData.occupation}
                    onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                  />
                </Grid>
              </Grid>
            </FormSection>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <FormSection>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Endereço"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    error={!!formErrors.address}
                    helperText={formErrors.address}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputMask
                    mask="99999-999"
                    value={formData.cep}
                    onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
                  >
                    {(inputProps) => (
                      <TextField
                        {...inputProps}
                        fullWidth
                        label="CEP"
                        error={!!formErrors.cep}
                        helperText={formErrors.cep}
                      />
                    )}
                  </InputMask>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Cidade"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    error={!!formErrors.city}
                    helperText={formErrors.city}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Estado"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    error={!!formErrors.state}
                    helperText={formErrors.state}
                  />
                </Grid>
              </Grid>
            </FormSection>
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <FormSection>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <InputMask
                    mask="(99) 99999-9999"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  >
                    {(inputProps) => (
                      <TextField
                        {...inputProps}
                        fullWidth
                        label="Telefone"
                        error={!!formErrors.phone}
                        helperText={formErrors.phone}
                        required
                      />
                    )}
                  </InputMask>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Contato de Emergência"
                    value={formData.emergencyContact}
                    onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                    error={!!formErrors.emergencyContact}
                    helperText={formErrors.emergencyContact}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputMask
                    mask="(99) 99999-9999"
                    value={formData.emergencyPhone}
                    onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
                  >
                    {(inputProps) => (
                      <TextField
                        {...inputProps}
                        fullWidth
                        label="Telefone de Emergência"
                        error={!!formErrors.emergencyPhone}
                        helperText={formErrors.emergencyPhone}
                        required
                      />
                    )}
                  </InputMask>
                </Grid>
              </Grid>
            </FormSection>
          </TabPanel>

          <TabPanel value={tabValue} index={3}>
            <FormSection>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Convênio"
                    value={formData.healthInsurance}
                    onChange={(e) => setFormData({ ...formData, healthInsurance: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Número da Carteirinha"
                    value={formData.insuranceNumber}
                    onChange={(e) => setFormData({ ...formData, insuranceNumber: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Validade do Convênio"
                    type="date"
                    value={formData.insuranceExpirationDate}
                    onChange={(e) => setFormData({ ...formData, insuranceExpirationDate: e.target.value })}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
            </FormSection>
          </TabPanel>

          <TabPanel value={tabValue} index={4}>
            <FormSection>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Como conheceu a clínica</InputLabel>
                    <Select
                      value={formData.source}
                      onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                      label="Como conheceu a clínica"
                    >
                      <MenuItem value="indicacao">Indicação</MenuItem>
                      <MenuItem value="site">Site</MenuItem>
                      <MenuItem value="redes_sociais">Redes Sociais</MenuItem>
                      <MenuItem value="convenio">Convênio</MenuItem>
                      <MenuItem value="outro">Outro</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Horário Preferencial"
                    value={formData.preferredSchedule}
                    onChange={(e) => setFormData({ ...formData, preferredSchedule: e.target.value })}
                    placeholder="Ex: Segunda e Quarta pela manhã"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Observações"
                    multiline
                    rows={4}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth required error={!!formErrors.status}>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      label="Status"
                    >
                      <MenuItem value="ativo">Ativo</MenuItem>
                      <MenuItem value="inativo">Inativo</MenuItem>
                      <MenuItem value="aguardando">Aguardando</MenuItem>
                      <MenuItem value="arquivado">Arquivado</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </FormSection>
          </TabPanel>

          <div className="dialog-actions">
            <Button onClick={handleCloseModal} color="inherit">
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Salvar'}
            </Button>
          </div>
        </form>
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

export default Patients; 