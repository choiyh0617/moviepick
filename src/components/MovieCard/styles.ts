import styled from 'styled-components';

export const MovieCardContainer = styled.div`
  background: ${({ theme }) => theme.surface};
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
`;

export const PosterContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
`;

export const PosterImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
`;

export const FavoriteButton = styled.button<{ isFavorite: boolean }>`
  position: absolute;
  top: 12px;
  right: 12px;
  background: ${({ isFavorite }) => 
    isFavorite ? 'rgba(239, 68, 68, 0.8)' : 'rgba(0, 0, 0, 0.6)'
  };
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
`;

export const HeartIcon = styled.span`
  color: white;
  font-size: 18px;
  font-weight: bold;
`;

export const RatingBadge = styled.div`
  position: absolute;
  bottom: 12px;
  left: 12px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
`;

export const RatingText = styled.span`
  color: #fbbf24;
`;

export const MovieInfo = styled.div`
  padding: 16px;
`;

export const MovieTitle = styled.h3`
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const MovieYear = styled.p`
  margin: 0 0 8px 0;
  font-size: 14px;
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
`;

export const MovieOverview = styled.p`
  margin: 0;
  font-size: 13px;
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`; 