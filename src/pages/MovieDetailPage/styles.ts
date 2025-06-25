import styled from 'styled-components';
import { Section, SectionTitle, Grid, LoadingSpinner, ErrorMessage, Button } from '../../components/styled/CommonStyles';

export const DetailContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const BackButton = styled(Button)`
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const HeroSection = styled.div`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 40px;
  min-height: 500px;
  display: flex;
  align-items: flex-end;
`;

export const BackdropImage = styled.div<{ imageUrl: string }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.6) 50%,
    rgba(0, 0, 0, 0.9) 100%
  ),
  url(${({ imageUrl }) => imageUrl}) center/cover;
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  padding: 40px;
  color: white;
  width: 100%;
`;

export const MovieTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 16px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const MovieMeta = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

export const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;
  opacity: 0.9;
`;

export const RatingBadge = styled.div`
  background: rgba(255, 215, 0, 0.9);
  color: #000;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 1.1rem;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
`;

export const FavoriteButton = styled(Button)<{ isFavorite: boolean }>`
  background: ${({ isFavorite, theme }) => 
    isFavorite ? theme.error : theme.primary
  };
  color: white;
  border: none;
  padding: 12px 24px;
  display: flex;
  align-items: center;
  gap: 8px;
  transform: scale(1);
  
  &:active {
    transform: scale(0.98);
  }
`;

export const MovieInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 40px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

export const MainContent = styled.div``;
export const Sidebar = styled.div``;

export const PosterContainer = styled.div`
  text-align: center;
  margin-bottom: 24px;
`;

export const PosterImage = styled.img`
  width: 100%;
  max-width: 300px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
`;

export const InfoSection = styled(Section)`
  margin-bottom: 40px;
`;

export const InfoTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  margin-bottom: 16px;
  border-bottom: 2px solid ${({ theme }) => theme.border};
  padding-bottom: 8px;
`;

export const Overview = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.text};
  margin-bottom: 24px;
`;

export const GenreList = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 24px;
`;

export const GenreTag = styled.span`
  background: ${({ theme }) => theme.primary};
  color: white;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 0.9rem;
  font-weight: 500;
`;

export const CastGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
`;

export const CastCard = styled.div`
  background: ${({ theme }) => theme.surface};
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  box-shadow: 0 4px 12px ${({ theme }) => theme.shadow};
`;

export const CastImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 12px;
`;

export const CastName = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  margin-bottom: 4px;
`;

export const CastCharacter = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
`;

export const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
`;

export const VideoCard = styled.div`
  background: ${({ theme }) => theme.surface};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px ${({ theme }) => theme.shadow};
  cursor: pointer;
`;

export const VideoThumbnail = styled.div<{ imageUrl: string }>`
  width: 100%;
  height: 180px;
  background: url(${({ imageUrl }) => imageUrl}) center/cover;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: '▶';
    font-size: 3rem;
    color: rgba(255,255,255,0.8);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const VideoTitle = styled.h4`
  padding: 16px;
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;
