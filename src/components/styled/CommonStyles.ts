import styled from 'styled-components';

export const Button = styled.button<{ variant?: 'primary' | 'secondary' | 'outline' }>`
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;
  cursor: pointer;
  
  ${({ variant, theme }) => {
    switch (variant) {
      case 'primary':
        return `
          background: linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%);
          color: white;
          border: none;
          
          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
          }
        `;
      case 'secondary':
        return `
          background: ${theme.surface};
          color: ${theme.text};
          border: 2px solid ${theme.border};
          
          &:hover {
            border-color: ${theme.primary};
            color: ${theme.primary};
          }
        `;
      case 'outline':
        return `
          background: transparent;
          color: ${theme.text};
          border: 2px solid ${theme.border};
          
          &:hover {
            border-color: ${theme.primary};
            color: ${theme.primary};
          }
        `;
      default:
        return `
          background: ${theme.surface};
          color: ${theme.text};
          border: 1px solid ${theme.border};
          
          &:hover {
            background: ${theme.border};
          }
        `;
    }
  }}
`;

export const Card = styled.div`
  background: ${({ theme }) => theme.surface};
  border-radius: 12px;
  box-shadow: 0 4px 12px ${({ theme }) => theme.shadow};
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px ${({ theme }) => theme.shadow};
  }
`;

export const Grid = styled.div<{ columns?: number }>`
  display: grid;
  grid-template-columns: repeat(${({ columns = 4 }) => columns}, 1fr);
  gap: 24px;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const Section = styled.section`
  margin-bottom: 60px;
`;

export const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  margin-bottom: 32px;
  text-align: center;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: linear-gradient(135deg, ${({ theme }) => theme.primary} 0%, ${({ theme }) => theme.secondary} 100%);
    border-radius: 2px;
  }
`;

export const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid ${({ theme }) => theme.border};
  border-top: 4px solid ${({ theme }) => theme.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const ErrorMessage = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: ${({ theme }) => theme.error};
  
  h3 {
    margin-bottom: 16px;
    font-size: 1.5rem;
  }
  
  p {
    margin-bottom: 24px;
    color: ${({ theme }) => theme.text};
  }
`; 