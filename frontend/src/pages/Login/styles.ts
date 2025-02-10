import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  position: relative;
  background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
  overflow: hidden;
`;

export const BackgroundOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(46, 125, 50, 0.1), rgba(27, 94, 32, 0.2));
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(46, 125, 50, 0.05) 0%, transparent 60%);
    animation: rotate 30s linear infinite;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const LoginBox = styled.div`
  background: rgba(255, 255, 255, 0.95);
  padding: 3rem 2.5rem;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 480px;
  text-align: center;
  position: relative;
  z-index: 2;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);

  form {
    margin-top: 2rem;
  }

  h1 {
    margin-bottom: 0.5rem;
    font-size: 2rem;
    color: #2e7d32;
    font-weight: 600;
  }

  h2 {
    color: #4a4a4a;
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }

  @media (max-width: 600px) {
    margin: 1rem;
    padding: 2rem 1.5rem;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
`;

export const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #4a90e2;
  }
`;

export const Button = styled.button`
  background-color: #4a90e2;
  color: white;
  padding: 0.8rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #357abd;
  }
`; 