import styled from 'styled-components';
import { LoadingSpinner as BaseLoadingSpinner, ErrorMessage as BaseErrorMessage } from '../../components/styled/CommonStyles';

export const GenresContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const GenresHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

export const GenresTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const GenresSubtitle = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
  margin-bottom: 32px;
`;

export const GenresGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 16px;
  }
`;

export const GenreCard = styled.div<{ isSelected: boolean }>`
  background: ${({ isSelected, theme }) => 
    isSelected ? theme.primary : theme.surface
  };
  color: ${({ isSelected, theme }) => isSelected ? 'white' : theme.text};
  border-radius: 16px;
  padding: 24px 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 2px solid ${({ isSelected, theme }) => 
    isSelected ? 'transparent' : theme.border
  };

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`;

export const GenreName = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const GenreCount = styled.p`
  font-size: 0.9rem;
  opacity: 0.8;
  margin: 0;
`;

export const MoviesSection = styled.div`
  margin-top: 40px;
`;

export const MoviesHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 16px;
`;

export const SearchResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
  gap: 16px;
`;

export const MoviesTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const MoviesCount = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
  background: ${({ theme }) => theme.surface};
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.border};
`;

export const MoviesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
  }
`;

export const LoadingSpinner = styled(BaseLoadingSpinner)`
  margin: 60px auto;
`;

export const ErrorMessage = styled(BaseErrorMessage)`
  margin: 60px auto;
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
  color: ${({ theme }) => theme.text};
`;

export const EmptyDescription = styled.p`
  font-size: 1rem;
  margin: 0;
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
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