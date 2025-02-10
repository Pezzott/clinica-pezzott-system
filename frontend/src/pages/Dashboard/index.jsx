import React, { useState, useEffect } from 'react';
import { Container, Header, Content, StatCard, AppointmentList, LogoutButton } from './styles';
import { Typography, Grid, Paper, IconButton, Avatar, Divider, Button } from '@mui/material';
import {
  Person as PersonIcon,
  EventNote as EventNoteIcon,
  TrendingUp as TrendingUpIcon,
  ExitToApp as ExitToAppIcon,
  CalendarToday as CalendarTodayIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalSessions: 0,
    todaySessions: 0
  });
  const [todayAppointments, setTodayAppointments] = useState([]);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setUser(JSON.parse(userStr));
    }

    // TODO: Substituir por dados reais da API
    setStats({
      totalPatients: 45,
      totalSessions: 128,
      todaySessions: 8
    });

    setTodayAppointments([
      { id: 1, time: '09:00', patientName: 'Maria Silva', status: 'Confirmado' },
      { id: 2, time: '10:30', patientName: 'João Santos', status: 'Aguardando' },
      { id: 3, time: '14:00', patientName: 'Ana Oliveira', status: 'Confirmado' },
      { id: 4, time: '15:30', patientName: 'Pedro Costa', status: 'Confirmado' },
    ]);
  }, []);

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  return (
    <Container>
      <Header>
        <div className="header-content">
          <div className="user-info">
            <Avatar sx={{ bgcolor: '#2e7d32', width: 48, height: 48 }}>
              {user?.name?.charAt(0) || 'U'}
            </Avatar>
            <div className="user-details">
              <Typography variant="h6">{user?.name || 'Usuário'}</Typography>
              <Typography variant="body2" color="textSecondary">
                {user?.role === 'admin' ? 'Administrador' : 'Colaborador'}
              </Typography>
            </div>
          </div>
          <LogoutButton onClick={handleLogout}>
            <ExitToAppIcon />
            <Typography>Sair</Typography>
          </LogoutButton>
        </div>
      </Header>

      <Content>
        <Typography variant="h4" gutterBottom sx={{ color: '#2e7d32', fontWeight: 600, mb: 4 }}>
          Dashboard
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard>
              <div className="stat-icon">
                <PersonIcon sx={{ fontSize: 40, color: '#2e7d32' }} />
              </div>
              <div className="stat-info">
                <Typography variant="h4">{stats.totalPatients}</Typography>
                <Typography variant="body1">Pacientes Ativos</Typography>
              </div>
            </StatCard>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <StatCard>
              <div className="stat-icon">
                <EventNoteIcon sx={{ fontSize: 40, color: '#2e7d32' }} />
              </div>
              <div className="stat-info">
                <Typography variant="h4">{stats.totalSessions}</Typography>
                <Typography variant="body1">Sessões Realizadas</Typography>
              </div>
            </StatCard>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <StatCard>
              <div className="stat-icon">
                <TrendingUpIcon sx={{ fontSize: 40, color: '#2e7d32' }} />
              </div>
              <div className="stat-info">
                <Typography variant="h4">{stats.todaySessions}</Typography>
                <Typography variant="body1">Sessões Hoje</Typography>
              </div>
            </StatCard>
          </Grid>
        </Grid>

        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          <div className="section-header">
            <div className="title-area">
              <CalendarTodayIcon sx={{ color: '#2e7d32', mr: 1 }} />
              <Typography variant="h6" sx={{ color: '#2e7d32' }}>
                Agenda do Dia
              </Typography>
            </div>
            <Button variant="outlined" color="primary">
              Ver Agenda Completa
            </Button>
          </div>

          <Divider sx={{ my: 2 }} />

          <AppointmentList>
            {todayAppointments.map((appointment) => (
              <div key={appointment.id} className="appointment-item">
                <div className="time">
                  <Typography variant="h6">{appointment.time}</Typography>
                </div>
                <div className="info">
                  <Typography variant="subtitle1">{appointment.patientName}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Status: {appointment.status}
                  </Typography>
                </div>
                <IconButton color="primary" size="small">
                  <EventNoteIcon />
                </IconButton>
              </div>
            ))}
          </AppointmentList>
        </Paper>
      </Content>
    </Container>
  );
};

export default Dashboard; 