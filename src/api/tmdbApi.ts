/**
 * TMDB API 서비스 모듈
 * 
 * 이 파일은 The Movie Database (TMDB) API와의 통신을 담당합니다.
 * 영화 검색, 상세 정보 조회, 이미지 URL 생성 등의 기능을 제공합니다.
 * 
 * 주요 기능:
 * - 영화 검색 및 목록 조회
 * - 영화 상세 정보 및 출연진 정보
 * - 이미지 URL 생성 (포스터, 배경, 프로필)
 * - 장르별 영화 필터링
 */

import axios from 'axios';
import type { Movie, MovieDetail, SearchResponse, MovieResponse, Credits, Videos } from '../types/movie';

// TMDB API 설정
const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MGUzMzhiNjAzNTcwNGQzMzRhOTcyNmZlOGRlZmM4NyIsIm5iZiI6MTc0NzgwMzk5MS41NDgsInN1YiI6IjY4MmQ1ZjU3MTVhMDFkNWE0NGUyNTY3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iGRlhwpN99dFYhBdzItVl6nfINEX8gew852T9zRoReA';
const BASE_URL = 'https://api.themoviedb.org/3';                    // TMDB API 기본 URL
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';               // TMDB 이미지 서버 URL

// axios 인스턴스 생성 - 공통 설정 적용
const api = axios.create({
  baseURL: BASE_URL,                                               // API 기본 URL 설정
  headers: {
    'Authorization': `Bearer ${API_KEY}`,                          // Bearer 토큰 인증
    'Content-Type': 'application/json',                           // JSON 컨텐츠 타입
  },
  params: {
    language: 'ko-KR',                                             // 한국어 응답 요청
  },
});

/**
 * TMDB API 서비스 객체
 * 모든 영화 관련 API 호출 함수들을 포함
 */
export const tmdbApi = {
  /**
   * 영화 검색 API
   * @param query - 검색할 영화 제목 또는 키워드
   * @param page - 페이지 번호 (기본값: 1)
   * @returns 검색 결과 (페이지네이션 포함)
   */
  searchMovies: async (query: string, page: number = 1): Promise<SearchResponse> => {
    const response = await api.get('/search/movie', {
      params: { query, page },
    });
    return response.data;
  },

  /**
   * 인기 영화 목록 조회 API
   * @param page - 페이지 번호 (기본값: 1)
   * @returns 인기 영화 목록
   */
  getPopularMovies: async (page: number = 1): Promise<MovieResponse> => {
    const response = await api.get('/movie/popular', {
      params: { page },
    });
    return response.data;
  },

  /**
   * 오늘의 트렌딩 영화 목록 조회 API
   * @param page - 페이지 번호 (기본값: 1)
   * @returns 오늘 인기 급상승 영화 목록
   */
  getTrendingMovies: async (page: number = 1): Promise<MovieResponse> => {
    const response = await api.get('/trending/movie/day', {
      params: { page },
    });
    return response.data;
  },

  /**
   * 현재 상영 중인 영화 목록 조회 API
   * @param page - 페이지 번호 (기본값: 1)
   * @returns 현재 상영 중인 영화 목록
   */
  getNowPlayingMovies: async (page: number = 1): Promise<MovieResponse> => {
    const response = await api.get('/movie/now_playing', {
      params: { page },
    });
    return response.data;
  },

  /**
   * 영화 상세 정보 조회 API
   * @param movieId - 영화 고유 ID
   * @returns 영화의 상세 정보 (예산, 수익, 제작사 등 포함)
   */
  getMovieDetail: async (movieId: number): Promise<MovieDetail> => {
    const response = await api.get(`/movie/${movieId}`);
    return response.data;
  },

  /**
   * 영화 출연진 및 제작진 정보 조회 API
   * @param movieId - 영화 고유 ID
   * @returns 배우, 감독, 제작진 등의 크레딧 정보
   */
  getMovieCredits: async (movieId: number): Promise<Credits> => {
    const response = await api.get(`/movie/${movieId}/credits`);
    return response.data;
  },

  /**
   * 영화 비디오 (예고편, 클립 등) 조회 API
   * @param movieId - 영화 고유 ID
   * @returns 영화 관련 비디오 목록 (YouTube 링크 등)
   */
  getMovieVideos: async (movieId: number): Promise<Videos> => {
    const response = await api.get(`/movie/${movieId}/videos`);
    return response.data;
  },

  /**
   * 유사 영화 목록 조회 API
   * @param movieId - 기준이 되는 영화 ID
   * @param page - 페이지 번호 (기본값: 1)
   * @returns 유사한 영화 목록
   */
  getSimilarMovies: async (movieId: number, page: number = 1): Promise<MovieResponse> => {
    const response = await api.get(`/movie/${movieId}/similar`, {
      params: { page },
    });
    return response.data;
  },

  /**
   * 장르별 영화 목록 조회 API
   * @param genreId - 장르 ID
   * @param page - 페이지 번호 (기본값: 1)
   * @returns 해당 장르의 영화 목록 (인기도 순 정렬)
   */
  getMoviesByGenre: async (genreId: number, page: number = 1): Promise<MovieResponse> => {
    const response = await api.get('/discover/movie', {
      params: {
        with_genres: genreId,                                      // 특정 장르 필터
        page,
        sort_by: 'popularity.desc',                               // 인기도 내림차순 정렬
      },
    });
    return response.data;
  },

  /**
   * 영화 장르 목록 조회 API
   * @returns 모든 영화 장르 정보
   */
  getGenres: async () => {
    const response = await api.get('/genre/movie/list');
    return response.data.genres;
  },

  /**
   * TMDB 이미지 URL 생성 함수
   * @param path - 이미지 경로 (API 응답에서 받은 경로)
   * @param size - 이미지 크기 (기본값: 'w500')
   * @returns 완전한 이미지 URL
   */
  getImageUrl: (path: string, size: string = 'w500'): string => {
    if (!path) return '';                                          // 경로가 없으면 빈 문자열 반환
    return `${IMAGE_BASE_URL}/${size}${path}`;
  },

  /**
   * 영화 포스터 이미지 URL 생성
   * @param path - 포스터 이미지 경로
   * @returns 포스터 이미지 URL (w500 크기)
   */
  getPosterUrl: (path: string): string => {
    return tmdbApi.getImageUrl(path, 'w500');
  },

  /**
   * 영화 배경 이미지 URL 생성
   * @param path - 배경 이미지 경로
   * @returns 배경 이미지 URL (w1280 크기)
   */
  getBackdropUrl: (path: string): string => {
    return tmdbApi.getImageUrl(path, 'w1280');
  },

  /**
   * 배우/제작진 프로필 이미지 URL 생성
   * @param path - 프로필 이미지 경로
   * @returns 프로필 이미지 URL (w185 크기)
   */
  getProfileUrl: (path: string): string => {
    return tmdbApi.getImageUrl(path, 'w185');
  },
}; 