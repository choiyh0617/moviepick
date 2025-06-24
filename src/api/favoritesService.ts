import type { Movie } from '../types/movie';

const FAVORITES_KEY = 'moviepick_favorites';
const RECENT_VIEWED_KEY = 'moviepick_recent_viewed';

export const favoritesService = {
  // 즐겨찾기 목록 가져오기
  getFavorites: (): Movie[] => {
    try {
      const favorites = localStorage.getItem(FAVORITES_KEY);
      return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
      console.error('즐겨찾기 목록을 가져오는 중 오류 발생:', error);
      return [];
    }
  },

  // 즐겨찾기 추가
  addToFavorites: (movie: Movie): void => {
    try {
      const favorites = favoritesService.getFavorites();
      const exists = favorites.some(fav => fav.id === movie.id);
      
      if (!exists) {
        favorites.push(movie);
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      }
    } catch (error) {
      console.error('즐겨찾기 추가 중 오류 발생:', error);
    }
  },

  // 즐겨찾기 제거
  removeFromFavorites: (movieId: number): void => {
    try {
      const favorites = favoritesService.getFavorites();
      const filtered = favorites.filter(movie => movie.id !== movieId);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error('즐겨찾기 제거 중 오류 발생:', error);
    }
  },

  // 즐겨찾기 여부 확인
  isFavorite: (movieId: number): boolean => {
    const favorites = favoritesService.getFavorites();
    return favorites.some(movie => movie.id === movieId);
  },

  // 최근 본 영화 목록 가져오기
  getRecentViewed: (): Movie[] => {
    try {
      const recent = localStorage.getItem(RECENT_VIEWED_KEY);
      return recent ? JSON.parse(recent) : [];
    } catch (error) {
      console.error('최근 본 영화 목록을 가져오는 중 오류 발생:', error);
      return [];
    }
  },

  // 최근 본 영화에 추가
  addToRecentViewed: (movie: Movie): void => {
    try {
      const recent = favoritesService.getRecentViewed();
      
      // 이미 존재하는 영화를 제거
      const filtered = recent.filter(m => m.id !== movie.id);
      
      // 새 영화를 맨 앞에 추가
      filtered.unshift(movie);
      
      // 최대 20개까지만 저장
      const limited = filtered.slice(0, 20);
      localStorage.setItem(RECENT_VIEWED_KEY, JSON.stringify(limited));
    } catch (error) {
      console.error('최근 본 영화 추가 중 오류 발생:', error);
    }
  },
}; 