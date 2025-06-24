import { useState, useEffect } from 'react';
import type { Movie } from '../types/movie';
import { favoritesService } from '../api/favoritesService';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [recentViewed, setRecentViewed] = useState<Movie[]>([]);

  const loadFavorites = () => {
    const favs = favoritesService.getFavorites();
    const recent = favoritesService.getRecentViewed();
    setFavorites(favs);
    setRecentViewed(recent);
  };

  const handleFavoriteToggle = (movie: Movie) => {
    // 즐겨찾기 상태가 변경되면 목록을 다시 로드
    loadFavorites();
  };

  const handleClearFavorites = () => {
    if (window.confirm('모든 찜한 영화를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      favorites.forEach(movie => {
        favoritesService.removeFromFavorites(movie.id);
      });
      loadFavorites();
    }
  };

  const handleClearRecent = () => {
    if (window.confirm('최근 본 영화 기록을 모두 삭제하시겠습니까?')) {
      localStorage.removeItem('moviepick_recent_viewed');
      loadFavorites();
    }
  };

  const handleBrowseMovies = () => {
    window.location.href = '/';
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  return {
    favorites,
    recentViewed,
    handleFavoriteToggle,
    handleClearFavorites,
    handleClearRecent,
    handleBrowseMovies
  };
}; 