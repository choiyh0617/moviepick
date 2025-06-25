/**
 * 즐겨찾기 및 최근 본 영화 관리 서비스
 * 
 * 이 파일은 사용자의 즐겨찾기 영화와 최근 본 영화를 localStorage를 통해 관리합니다.
 * 브라우저를 닫아도 데이터가 유지되며, 오류 처리도 포함되어 있습니다.
 * 
 * 주요 기능:
 * - 즐겨찾기 영화 추가/제거/조회
 * - 최근 본 영화 목록 관리
 * - localStorage를 통한 데이터 영속성
 */

import type { Movie } from '../types/movie';

// localStorage에 사용할 키 상수들
const FAVORITES_KEY = 'moviepick_favorites';           // 즐겨찾기 영화 저장 키
const RECENT_VIEWED_KEY = 'moviepick_recent_viewed';   // 최근 본 영화 저장 키

/**
 * 즐겨찾기 및 최근 본 영화 관리 서비스 객체
 */
export const favoritesService = {
  /**
   * 즐겨찾기 영화 목록을 localStorage에서 가져오기
   * @returns 즐겨찾기 영화 배열 (오류 발생 시 빈 배열 반환)
   */
  getFavorites: (): Movie[] => {
    try {
      const favorites = localStorage.getItem(FAVORITES_KEY);
      return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
      console.error('즐겨찾기 목록을 가져오는 중 오류 발생:', error);
      return [];
    }
  },

  /**
   * 영화를 즐겨찾기에 추가
   * @param movie - 추가할 영화 객체
   */
  addToFavorites: (movie: Movie): void => {
    try {
      const favorites = favoritesService.getFavorites();
      // 이미 즐겨찾기에 있는지 확인
      const exists = favorites.some(fav => fav.id === movie.id);
      
      // 중복되지 않은 경우에만 추가
      if (!exists) {
        favorites.push(movie);
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      }
    } catch (error) {
      console.error('즐겨찾기 추가 중 오류 발생:', error);
    }
  },

  /**
   * 영화를 즐겨찾기에서 제거
   * @param movieId - 제거할 영화의 ID
   */
  removeFromFavorites: (movieId: number): void => {
    try {
      const favorites = favoritesService.getFavorites();
      // 해당 영화 ID를 제외한 새로운 배열 생성
      const filtered = favorites.filter(movie => movie.id !== movieId);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error('즐겨찾기 제거 중 오류 발생:', error);
    }
  },

  /**
   * 특정 영화가 즐겨찾기에 있는지 확인
   * @param movieId - 확인할 영화의 ID
   * @returns 즐겨찾기 여부 (true/false)
   */
  isFavorite: (movieId: number): boolean => {
    const favorites = favoritesService.getFavorites();
    return favorites.some(movie => movie.id === movieId);
  },

  /**
   * 최근 본 영화 목록을 localStorage에서 가져오기
   * @returns 최근 본 영화 배열 (오류 발생 시 빈 배열 반환)
   */
  getRecentViewed: (): Movie[] => {
    try {
      const recent = localStorage.getItem(RECENT_VIEWED_KEY);
      return recent ? JSON.parse(recent) : [];
    } catch (error) {
      console.error('최근 본 영화 목록을 가져오는 중 오류 발생:', error);
      return [];
    }
  },

  /**
   * 영화를 최근 본 목록에 추가
   * @param movie - 추가할 영화 객체
   */
  addToRecentViewed: (movie: Movie): void => {
    try {
      const recent = favoritesService.getRecentViewed();
      
      // 이미 존재하는 영화를 제거 (중복 방지)
      const filtered = recent.filter(m => m.id !== movie.id);
      
      // 새 영화를 맨 앞에 추가 (최신 순서 유지)
      filtered.unshift(movie);
      
      // 최대 20개까지만 저장 (메모리 효율성)
      const limited = filtered.slice(0, 20);
      localStorage.setItem(RECENT_VIEWED_KEY, JSON.stringify(limited));
    } catch (error) {
      console.error('최근 본 영화 추가 중 오류 발생:', error);
    }
  },
}; 