import styled from 'styled-components';
import { ListItem } from '@mui/material';

export const Container = styled.div`
  padding: 1.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;

  .sidebar-header {
    text-align: center;
    padding-bottom: 1rem;
  }
`;

export const MenuItem = styled(ListItem)`
  margin: 0.5rem 0;
  border-radius: 8px;
  color: ${props => props.selected ? '#2e7d32' : '#666'};
  background-color: ${props => props.selected ? 'rgba(46, 125, 50, 0.1)' : 'transparent'};
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: rgba(46, 125, 50, 0.1);
    color: #2e7d32;
  }
`; 