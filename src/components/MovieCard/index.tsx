/**
 * 영화 카드 컴포넌트
 * 
 * 이 컴포넌트는 영화 정보를 카드 형태로 표시하며, 다음과 같은 기능을 제공합니다:
 * - 영화 포스터, 제목, 개봉년도, 평점, 줄거리 표시
 * - 즐겨찾기 추가/제거 기능
 * - 클릭 시 영화 상세 페이지로 이동
 * - 최근 본 영화 목록에 자동 추가
 * 
 * @param movie - 표시할 영화 정보
 * @param onFavoriteToggle - 즐겨찾기 상태 변경 시 호출되는 콜백 함수
 * @param showFavoriteButton - 즐겨찾기 버튼 표시 여부 (기본값: true)
 */

import React, { useState, useEffect } from 'react';
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

/**
 * MovieCard 컴포넌트의 props 인터페이스
 */
interface MovieCardProps {
  movie: Movie;                                    // 표시할 영화 정보
  onFavoriteToggle?: (movie: Movie) => void;      // 즐겨찾기 토글 콜백 (선택적)
  showFavoriteButton?: boolean;                   // 즐겨찾기 버튼 표시 여부 (기본값: true)
}

/**
 * 영화 카드 컴포넌트
 */
const MovieCard: React.FC<MovieCardProps> = ({ 
  movie, 
  onFavoriteToggle, 
  showFavoriteButton = true 
}) => {
  // 즐겨찾기 상태 관리
  const [isFavorite, setIsFavorite] = useState(false);

  // 컴포넌트 마운트 시와 movie가 변경될 때 찜하기 상태 확인
  useEffect(() => {
    setIsFavorite(favoritesService.isFavorite(movie.id));
  }, [movie.id]);

  /**
   * 즐겨찾기 버튼 클릭 핸들러
   * @param e - 클릭 이벤트 객체
   */
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();        // 기본 동작 방지
    e.stopPropagation();       // 이벤트 버블링 방지
    
    // 즐겨찾기 상태에 따라 추가 또는 제거
    if (isFavorite) {
      favoritesService.removeFromFavorites(movie.id);
    } else {
      favoritesService.addToFavorites(movie);
    }
    
    // 로컬 상태 업데이트
    setIsFavorite(!isFavorite);
    
    // 부모 컴포넌트에 알림 (콜백이 제공된 경우)
    if (onFavoriteToggle) {
      onFavoriteToggle(movie);
    }
  };

  /**
   * 카드 클릭 핸들러
   * 영화 상세 페이지로 이동하고 최근 본 목록에 추가
   */
  const handleCardClick = () => {
    // 최근 본 영화 목록에 추가
    favoritesService.addToRecentViewed(movie);
    // 영화 상세 페이지로 이동
    window.location.href = `/movie/${movie.id}`;
  };

  return (
    <MovieCardContainer onClick={handleCardClick}>
      {/* 포스터 영역 */}
      <PosterContainer>
        {/* 영화 포스터 이미지 */}
        <PosterImage
          src={tmdbApi.getPosterUrl(movie.poster_path)}
          alt={movie.title}
          onError={(e) => {
            // 이미지 로드 실패 시 기본 이미지로 대체
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder-poster.jpg';
          }}
        />
        
        {/* 즐겨찾기 버튼 (조건부 렌더링) */}
        {showFavoriteButton && (
          <FavoriteButton
            isFavorite={isFavorite}
            onClick={handleFavoriteClick}
            aria-label={isFavorite ? '즐겨찾기 제거' : '즐겨찾기 추가'}
          >
            <HeartIcon>♥</HeartIcon>
          </FavoriteButton>
        )}
        
        {/* 평점 배지 */}
        <RatingBadge>
          <RatingText>★ {movie.vote_average.toFixed(1)}</RatingText>
        </RatingBadge>
      </PosterContainer>
      
      {/* 영화 정보 영역 */}
      <MovieInfo>
        {/* 영화 제목 */}
        <MovieTitle>{movie.title}</MovieTitle>
        
        {/* 개봉년도 */}
        <MovieYear>
          {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
        </MovieYear>
        
        {/* 영화 줄거리 (100자 제한) */}
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