import React from 'react';
import type { Movie } from '../../types/movie';
import { tmdbApi } from '../../api/tmdbApi';
import { favoritesService } from '../../api/favoritesService';
import {
  MovieCardContainer,
  PosterContainer,
  PosterImage,
  FavoriteButton,
  HeartIcon,
  RatingBadge,
  RatingText,
  MovieInfo,
  MovieTitle,
  MovieYear,
  MovieOverview
} from './styles';

interface MovieCardProps {
  movie: Movie;
  onFavoriteToggle?: (movie: Movie) => void;
  showFavoriteButton?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ 
  movie, 
  onFavoriteToggle, 
  showFavoriteButton = true 
}) => {
  const isFavorite = favoritesService.isFavorite(movie.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFavorite) {
      favoritesService.removeFromFavorites(movie.id);
    } else {
      favoritesService.addToFavorites(movie);
    }
    
    if (onFavoriteToggle) {
      onFavoriteToggle(movie);
    }
  };

  const handleCardClick = () => {
    favoritesService.addToRecentViewed(movie);
    window.location.href = `/movie/${movie.id}`;
  };

  return (
    <MovieCardContainer onClick={handleCardClick}>
      <PosterContainer>
        <PosterImage
          src={tmdbApi.getPosterUrl(movie.poster_path)}
          alt={movie.title}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder-poster.jpg';
          }}
        />
        {showFavoriteButton && (
          <FavoriteButton
            isFavorite={isFavorite}
            onClick={handleFavoriteClick}
            aria-label={isFavorite ? '즐겨찾기 제거' : '즐겨찾기 추가'}
          >
            <HeartIcon>♥</HeartIcon>
          </FavoriteButton>
        )}
        <RatingBadge>
          <RatingText>★ {movie.vote_average.toFixed(1)}</RatingText>
        </RatingBadge>
      </PosterContainer>
      <MovieInfo>
        <MovieTitle>{movie.title}</MovieTitle>
        <MovieYear>
          {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
        </MovieYear>
        {movie.overview && (
          <MovieOverview>
            {movie.overview.length > 100 
              ? `${movie.overview.substring(0, 100)}...` 
              : movie.overview
            }
          </MovieOverview>
        )}
      </MovieInfo>
    </MovieCardContainer>
  );
};

export default MovieCard; 