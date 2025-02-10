import styled from 'styled-components';
import { Paper } from '@mui/material';

export const Container = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
`;

export const Header = styled.header`
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem 2rem;

  .header-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .user-info {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .user-details {
    display: flex;
    flex-direction: column;
  }
`;

export const Content = styled.main`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 2rem;

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;

    .title-area {
      display: flex;
      align-items: center;
    }
  }
`;

export const StatCard = styled(Paper)`
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  height: 100%;
  border-radius: 12px !important;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }

  .stat-icon {
    background-color: rgba(46, 125, 50, 0.1);
    padding: 1rem;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .stat-info {
    flex: 1;

    h4 {
      color: #2e7d32;
      margin-bottom: 0.5rem;
    }

    p {
      color: #666;
    }
  }
`;

export const AppointmentList = styled.div`
  .appointment-item {
    display: flex;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid #eee;
    transition: background-color 0.2s ease;

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      background-color: rgba(46, 125, 50, 0.05);
    }

    .time {
      width: 100px;
      h6 {
        color: #2e7d32;
      }
    }

    .info {
      flex: 1;
      margin: 0 1rem;
    }
  }
`;

export const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(46, 125, 50, 0.1);
    color: #2e7d32;
  }

  svg {
    font-size: 1.2rem;
  }
`; 