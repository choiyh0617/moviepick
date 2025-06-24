import axios from 'axios';
import type { Movie, MovieDetail, SearchResponse, MovieResponse, Credits, Videos } from '../types/movie';

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MGUzMzhiNjAzNTcwNGQzMzRhOTcyNmZlOGRlZmM4NyIsIm5iZiI6MTc0NzgwMzk5MS41NDgsInN1YiI6IjY4MmQ1ZjU3MTVhMDFkNWE0NGUyNTY3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iGRlhwpN99dFYhBdzItVl6nfINEX8gew852T9zRoReA';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  },
  params: {
    language: 'ko-KR',
  },
});

export const tmdbApi = {
  // 영화 검색
  searchMovies: async (query: string, page: number = 1): Promise<SearchResponse> => {
    const response = await api.get('/search/movie', {
      params: { query, page },
    });
    return response.data;
  },

  // 인기 영화 목록
  getPopularMovies: async (page: number = 1): Promise<MovieResponse> => {
    const response = await api.get('/movie/popular', {
      params: { page },
    });
    return response.data;
  },

  // 오늘의 추천
  getTrendingMovies: async (page: number = 1): Promise<MovieResponse> => {
    const response = await api.get('/trending/movie/day', {
      params: { page },
    });
    return response.data;
  },

  // 최신 영화 목록
  getNowPlayingMovies: async (page: number = 1): Promise<MovieResponse> => {
    const response = await api.get('/movie/now_playing', {
      params: { page },
    });
    return response.data;
  },

  // 영화 상세 정보
  getMovieDetail: async (movieId: number): Promise<MovieDetail> => {
    const response = await api.get(`/movie/${movieId}`);
    return response.data;
  },

  // 영화 출연진 및 제작진
  getMovieCredits: async (movieId: number): Promise<Credits> => {
    const response = await api.get(`/movie/${movieId}/credits`);
    return response.data;
  },

  // 영화 비디오 (예고편, 클립 등)
  getMovieVideos: async (movieId: number): Promise<Videos> => {
    const response = await api.get(`/movie/${movieId}/videos`);
    return response.data;
  },

  // 유사 영화 목록
  getSimilarMovies: async (movieId: number, page: number = 1): Promise<MovieResponse> => {
    const response = await api.get(`/movie/${movieId}/similar`, {
      params: { page },
    });
    return response.data;
  },

  // 장르별 영화 목록
  getMoviesByGenre: async (genreId: number, page: number = 1): Promise<MovieResponse> => {
    const response = await api.get('/discover/movie', {
      params: {
        with_genres: genreId,
        page,
        sort_by: 'popularity.desc',
      },
    });
    return response.data;
  },

  // 장르 목록
  getGenres: async () => {
    const response = await api.get('/genre/movie/list');
    return response.data.genres;
  },

  // 이미지 URL 생성
  getImageUrl: (path: string, size: string = 'w500'): string => {
    if (!path) return '';
    return `${IMAGE_BASE_URL}/${size}${path}`;
  },

  // 포스터 URL 생성
  getPosterUrl: (path: string): string => {
    return tmdbApi.getImageUrl(path, 'w500');
  },

  // 배경 이미지 URL 생성
  getBackdropUrl: (path: string): string => {
    return tmdbApi.getImageUrl(path, 'w1280');
  },

  // 프로필 이미지 URL 생성
  getProfileUrl: (path: string): string => {
    return tmdbApi.getImageUrl(path, 'w185');
  },
}; 