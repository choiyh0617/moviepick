import styled from 'styled-components';
import { Section, SectionTitle, Grid, Button } from '../../components/styled/CommonStyles';

export const FavoritesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const Subtitle = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
  margin-bottom: 32px;
`;

export const StatsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 32px;
  margin-bottom: 40px;
  flex-wrap: wrap;
`;

export const StatCard = styled.div`
  background: ${({ theme }) => theme.surface};
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 12px ${({ theme }) => theme.shadow};
  min-width: 120px;
`;

export const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 8px;
`;

export const StatLabel = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
`;

export const ActionsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 40px;
  flex-wrap: wrap;
`;

export const ClearButton = styled(Button)`
  background: ${({ theme }) => theme.error};
  color: white;
  border: none;

  &:hover {
    background: #ff3742;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 71, 87, 0.3);
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 80px 20px;
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
`;

export const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 24px;
  opacity: 0.3;
`;

export const EmptyTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 16px;
`;

export const EmptyDescription = styled.p`
  font-size: 1rem;
  margin-bottom: 32px;
`;

export const BrowseButton = styled(Button)`
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 1rem;
`;

export const FavoritesSection = styled(Section)`
  margin-top: 40px;
`; 