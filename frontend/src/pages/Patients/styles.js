import styled from 'styled-components';
import { Paper, Dialog, Chip } from '@mui/material';

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

export const PatientCard = styled(Paper)`
  padding: 1.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 12px !important;
  transition: all 0.3s ease;
  opacity: ${props => props.active ? 1 : 0.7};
  border: 1px solid ${props => props.active ? 'transparent' : '#ff9800'};

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1) !important;
  }
`;

export const PatientInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .patient-header {
    display: flex;
    align-items: center;
    gap: 1rem;

    svg {
      color: #1a237e;
      font-size: 2rem;
      background-color: #e8eaf6;
      padding: 8px;
      border-radius: 50%;
    }

    h6 {
      margin: 0;
      font-weight: 600;
      color: #1a237e;
    }
  }

  .info-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    svg {
      color: #666;
      font-size: 1.2rem;
    }
  }
`;

export const StatusChip = styled(Chip)`
  align-self: flex-start;
  margin-top: 0.5rem;
  font-size: 0.75rem !important;
  height: 24px !important;
  
  ${props => {
    switch (props.status) {
      case 'ativo':
        return `
          background-color: #e8f5e9 !important;
          color: #2e7d32 !important;
        `;
      case 'inativo':
        return `
          background-color: #ffebee !important;
          color: #c62828 !important;
        `;
      case 'aguardando':
        return `
          background-color: #fff3e0 !important;
          color: #ef6c00 !important;
        `;
      case 'arquivado':
        return `
          background-color: #f5f5f5 !important;
          color: #757575 !important;
        `;
      default:
        return '';
    }
  }}
`;

export const CardActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
  justify-content: flex-end;

  .MuiIconButton-root {
    padding: 8px;
    background-color: #f5f5f5;
    transition: all 0.2s ease;

    &:hover {
      transform: translateY(-2px);
    }

    &.MuiIconButton-colorPrimary {
      background-color: #e3f2fd;
      color: #1976d2;

      &:hover {
        background-color: #bbdefb;
      }
    }

    &.MuiIconButton-colorError {
      background-color: #ffebee;
      color: #d32f2f;

      &:hover {
        background-color: #ffcdd2;
      }
    }

    &.MuiIconButton-colorWarning {
      background-color: #fff3e0;
      color: #ff9800;

      &:hover {
        background-color: #ffe0b2;
      }
    }

    &.MuiIconButton-colorSuccess {
      background-color: #e8f5e9;
      color: #2e7d32;

      &:hover {
        background-color: #c8e6c9;
      }
    }
  }
`;

export const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    border-radius: 12px;
    overflow: hidden;
  }

  .dialog-header {
    background-color: #f5f5f5;
    padding: 1.5rem 1.5rem 0;

    h6 {
      color: #1a237e;
      font-weight: 600;
      margin-bottom: 1rem;
    }

    .MuiTabs-root {
      margin-bottom: -1px;
      
      .MuiTab-root {
        text-transform: none;
        font-weight: 500;
        
        &.Mui-selected {
          color: #1a237e;
        }
      }
      
      .MuiTabs-indicator {
        background-color: #1a237e;
      }
    }
  }

  .dialog-actions {
    padding: 1rem 1.5rem;
    background-color: #f5f5f5;
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }
`;

export const TabPanel = styled.div`
  display: ${props => props.value === props.index ? 'block' : 'none'};
  padding: 1.5rem;
`;

export const FormSection = styled.div`
  .MuiGrid-container {
    margin-top: -8px;
    width: calc(100% + 16px);
  }

  .MuiFormControl-root {
    width: 100%;
  }
`; 