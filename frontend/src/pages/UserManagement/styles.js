import styled from 'styled-components';
import { Paper, IconButton, Dialog, Chip } from '@mui/material';

export const Container = styled.div`
  padding: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  h1 {
    color: #1a237e;
    font-weight: 600;
  }
`;

export const SearchContainer = styled.div`
  margin-bottom: 2rem;
  max-width: 600px;
  width: 100%;

  .MuiOutlinedInput-root {
    background-color: white;
    border-radius: 8px;
    transition: all 0.3s ease;

    &:hover {
      background-color: #fafafa;
    }

    &.Mui-focused {
      background-color: white;
    }
  }
`;

export const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-right: 8px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #666;
  }
`;

export const UserCard = styled(Paper)`
  padding: 1.5rem;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
  border-radius: 12px !important;
  transition: all 0.3s ease;
  opacity: ${props => props.active ? 1 : 0.7};
  border: 1px solid ${props => props.active ? 'transparent' : '#ff9800'};

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1) !important;
  }
`;

export const UserAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: ${props => props.active ? '#e3f2fd' : '#fff3e0'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;

  svg {
    color: ${props => props.active ? '#1976d2' : '#ff9800'};
    font-size: 24px;
  }
`;

export const UserInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  h6 {
    margin: 0;
    font-weight: 600;
    color: #1a237e;
  }
`;

export const RoleChip = styled(Chip)`
  align-self: flex-start;
  height: 24px !important;
  font-size: 0.75rem !important;
  
  .MuiChip-icon {
    font-size: 16px !important;
  }
`;

export const CardActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid #eee;
`;

export const ActionButton = styled(IconButton)`
  padding: 8px !important;
  background-color: ${props => {
    switch (props.color) {
      case 'primary':
        return '#e3f2fd';
      case 'error':
        return '#ffebee';
      case 'warning':
        return '#fff3e0';
      case 'success':
        return '#e8f5e9';
      default:
        return '#f5f5f5';
    }
  }} !important;

  svg {
    font-size: 20px;
    color: ${props => {
      switch (props.color) {
        case 'primary':
          return '#1976d2';
        case 'error':
          return '#d32f2f';
        case 'warning':
          return '#ff9800';
        case 'success':
          return '#2e7d32';
        default:
          return '#757575';
      }
    }};
  }

  &:hover {
    background-color: ${props => {
      switch (props.color) {
        case 'primary':
          return '#bbdefb';
        case 'error':
          return '#ffcdd2';
        case 'warning':
          return '#ffe0b2';
        case 'success':
          return '#c8e6c9';
        default:
          return '#eeeeee';
      }
    }} !important;
  }
`;

export const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    border-radius: 12px;
  }

  .MuiDialogTitle-root {
    background-color: #f5f5f5;
    color: #1a237e;
    font-weight: 600;
  }

  .MuiDialogContent-root {
    padding: 24px;
  }

  .MuiDialogActions-root {
    padding: 16px 24px;
    background-color: #f5f5f5;
  }
`; 