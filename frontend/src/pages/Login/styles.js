import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  position: relative;
  background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
  overflow: hidden;
`

export const BackgroundOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(46, 125, 50, 0.1), rgba(27, 94, 32, 0.2));
  z-index: 1;
`

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
` 