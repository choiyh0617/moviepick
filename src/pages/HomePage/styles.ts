import styled from 'styled-components';
import { Section, SectionTitle, Grid, LoadingSpinner, ErrorMessage } from '../../components/styled/CommonStyles';

export const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const HeroSection = styled.div`
  text-align: center;
  margin-bottom: 60px;
  padding: 60px 20px;
  background: ${({ theme }) => theme.primary};
  border-radius: 20px;
  color: white;
  position: relative;
  overflow: hidden;
`;

export const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 16px;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 32px;
  opacity: 0.9;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const SearchContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

export const MovieSection = styled(Section)`
  margin-bottom: 60px;
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

export const ViewAllButton = styled.button`
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: ${({ theme }) => theme.text};
  opacity: 0.7;

  h3 {
    margin-bottom: 16px;
    font-size: 1.5rem;
  }

  p {
    margin-bottom: 24px;
  }
`;

export const LoadMoreContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

export const LoadMoreButton = styled.button`
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 12px;
  padding: 16px 32px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:disabled {
    background: #94a3b8;
    cursor: not-allowed;
  }

  &:not(:disabled):active {
    background: ${({ theme }) => theme.secondary};
  }
`;

export { LoadingSpinner, ErrorMessage, Grid, SectionTitle }; 