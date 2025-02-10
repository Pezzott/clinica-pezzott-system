import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  Group as GroupIcon,
  EventNote as EventNoteIcon,
  SupervisorAccount as AdminIcon,
  CalendarMonth as CalendarIcon,
} from '@mui/icons-material';
import { Container, MenuItem } from './styles';

const Sidebar = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = user?.role === 'admin';

  const menuItems = [
    {
      title: 'Dashboard',
      icon: <DashboardIcon />,
      path: '/home',
      allowedRoles: ['admin', 'collaborator'],
    },
    {
      title: 'Agenda',
      icon: <CalendarIcon />,
      path: '/agenda',
      allowedRoles: ['admin', 'collaborator'],
    },
    {
      title: 'Pacientes',
      icon: <PersonIcon />,
      path: '/pacientes',
      allowedRoles: ['admin', 'collaborator'],
    },
    {
      title: 'Sessões',
      icon: <EventNoteIcon />,
      path: '/sessoes',
      allowedRoles: ['admin', 'collaborator'],
    },
    {
      title: 'Gerenciar Usuários',
      icon: <GroupIcon />,
      path: '/usuarios',
      allowedRoles: ['admin'],
    },
    {
      title: 'Configurações',
      icon: <AdminIcon />,
      path: '/configuracoes',
      allowedRoles: ['admin'],
    },
  ];

  const filteredMenuItems = menuItems.filter(item =>
    item.allowedRoles.includes(user?.role)
  );

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 280,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 280,
          boxSizing: 'border-box',
          backgroundColor: '#fff',
          borderRight: '1px solid rgba(0, 0, 0, 0.12)',
        },
      }}
    >
      <Container>
        <div className="sidebar-header">
          <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
            Clínica Pezzott
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {isAdmin ? 'Administrador' : 'Colaborador'}
          </Typography>
        </div>

        <Divider sx={{ my: 2 }} />

        <List>
          {filteredMenuItems.map((item) => (
            <MenuItem
              key={item.path}
              onClick={() => navigate(item.path)}
              selected={location.pathname === item.path}
            >
              <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </MenuItem>
          ))}
        </List>
      </Container>
    </Drawer>
  );
};

export default Sidebar; 