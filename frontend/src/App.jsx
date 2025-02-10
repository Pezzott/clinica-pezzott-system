import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import Patients from './pages/Patients';
import Sidebar from './components/Sidebar';
import { createGlobalStyle } from 'styled-components';
import { authService } from './services/api';
import styled from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
  }

  body {
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #f5f5f5;
  }
`;

const AppLayout = styled.div`
  display: flex;
  min-height: 100vh;
`;

const MainContent = styled.div`
  flex: 1;
  margin-left: 280px;
  padding: 20px;
  background-color: #f5f5f5;
`;

// Componente para proteger rotas
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const validateToken = async () => {
      if (token && userStr) {
        try {
          await authService.checkToken(token);
          setUser(JSON.parse(userStr));
        } catch (error) {
          authService.logout();
        }
      }
    };

    validateToken();
  }, [token, userStr]);

  if (!token || !userStr) {
    return <Navigate to="/" replace />;
  }

  return (
    <AppLayout>
      <Sidebar user={user} />
      <MainContent>{children}</MainContent>
    </AppLayout>
  );
};

// Componente para redirecionar usuários logados
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

  if (token && user) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

// Componente para proteger rotas de admin
const AdminRoute = ({ children }) => {
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  if (!user || user.role !== 'admin') {
    return <Navigate to="/home" replace />;
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route 
          path="/" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />
        <Route 
          path="/home" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/usuarios" 
          element={
            <PrivateRoute>
              <AdminRoute>
                <UserManagement />
              </AdminRoute>
            </PrivateRoute>
          } 
        />
        <Route 
          path="/pacientes" 
          element={
            <PrivateRoute>
              <Patients />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/agenda" 
          element={
            <PrivateRoute>
              <div>Agenda (Em construção)</div>
            </PrivateRoute>
          } 
        />
        <Route 
          path="/sessoes" 
          element={
            <PrivateRoute>
              <div>Sessões (Em construção)</div>
            </PrivateRoute>
          } 
        />
        <Route 
          path="/configuracoes" 
          element={
            <PrivateRoute>
              <AdminRoute>
                <div>Configurações (Em construção)</div>
              </AdminRoute>
            </PrivateRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App; 