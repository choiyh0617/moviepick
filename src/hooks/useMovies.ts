/**
 * 영화 목록 관리 커스텀 훅
 * 
 * 이 훅은 홈페이지에서 필요한 다양한 영화 목록을 관리합니다.
 * 인기 영화, 트렌딩 영화, 최근 본 영화 기반 추천 등을 포함하며,
 * 무한 스크롤을 위한 페이지네이션 기능도 제공합니다.
 * 
 * 주요 기능:
 * - 인기 영화, 트렌딩 영화, 개인화 추천 영화 로딩
 * - 무한 스크롤을 위한 더보기 기능
 * - 최근 본 영화 기반 개인화 추천
 * - 로딩 상태 및 오류 처리
 */

import { useState, useEffect } from 'react';
import type { Movie } from '../types/movie';
import { tmdbApi } from '../api/tmdbApi';

/**
 * 영화 목록 관리 훅
 * @returns 다양한 영화 목록과 관련 기능들을 포함한 객체
 */
export const useMovies = () => {
  // 영화 목록 상태
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);           // 인기 영화 목록
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);         // 트렌딩 영화 목록
  const [recentBasedMovies, setRecentBasedMovies] = useState<Movie[]>([]);   // 최근 본 기반 추천 영화
  const [loading, setLoading] = useState(true);                              // 로딩 상태
  const [error, setError] = useState<string | null>(null);                   // 오류 메시지
  
  // 페이지네이션 상태
  const [popularPage, setPopularPage] = useState(1);                         // 인기 영화 현재 페이지
  const [trendingPage, setTrendingPage] = useState(1);                       // 트렌딩 영화 현재 페이지
  const [recentBasedPage, setRecentBasedPage] = useState(1);                 // 추천 영화 현재 페이지
  
  // 더보기 가능 여부 상태
  const [hasMorePopular, setHasMorePopular] = useState(true);                // 인기 영화 더보기 가능 여부
  const [hasMoreTrending, setHasMoreTrending] = useState(true);              // 트렌딩 영화 더보기 가능 여부
  const [hasMoreRecentBased, setHasMoreRecentBased] = useState(true);        // 추천 영화 더보기 가능 여부

  /**
   * 초기 영화 데이터를 가져오는 함수
   * 각 카테고리별로 최대 8개의 영화를 로딩
   */
  const fetchMovies = async () => {
    try {
      setLoading(true);
      
      // 인기 영화 가져오기 (최대 8개)
      const popularResponse = await tmdbApi.getPopularMovies(1);
      setPopularMovies(popularResponse.results.slice(0, 8));
      setHasMorePopular(popularResponse.total_pages > 1);

      // 오늘의 트렌딩 영화 가져오기 (최대 8개)
      const trendingResponse = await tmdbApi.getTrendingMovies(1);
      setTrendingMovies(trendingResponse.results.slice(0, 8));
      setHasMoreTrending(trendingResponse.total_pages > 1);

      // 최근 본 영화 기반 개인화 추천
      const recentViewed = localStorage.getItem('moviepick_recent_viewed');
      if (recentViewed) {
        const recentMovies = JSON.parse(recentViewed);
        if (recentMovies.length > 0) {
          // 최근 본 영화 중 랜덤하게 하나를 선택하여 유사 영화 추천
          const randomMovie = recentMovies[Math.floor(Math.random() * recentMovies.length)];
          const similarResponse = await tmdbApi.getSimilarMovies(randomMovie.id, 1);
          setRecentBasedMovies(similarResponse.results.slice(0, 8));
          setHasMoreRecentBased(similarResponse.total_pages > 1);
        }
      }

      setError(null);
    } catch (err) {
      setError('새로고침 해주세요');
      console.error('Error fetching movies:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * 인기 영화 더보기 함수
   * 무한 스크롤을 위해 다음 페이지의 영화를 기존 목록에 추가
   */
  const loadMorePopular = async () => {
    if (hasMorePopular && !loading) {
      try {
        const nextPage = popularPage + 1;
        const response = await tmdbApi.getPopularMovies(nextPage);
        setPopularMovies(prev => [...prev, ...response.results.slice(0, 8)]);
        setPopularPage(nextPage);
        setHasMorePopular(nextPage < response.total_pages);
      } catch (err) {
        console.error('Error loading more popular movies:', err);
      }
    }
  };

  /**
   * 트렌딩 영화 더보기 함수
   * 무한 스크롤을 위해 다음 페이지의 영화를 기존 목록에 추가
   */
  const loadMoreTrending = async () => {
    if (hasMoreTrending && !loading) {
      try {
        const nextPage = trendingPage + 1;
        const response = await tmdbApi.getTrendingMovies(nextPage);
        setTrendingMovies(prev => [...prev, ...response.results.slice(0, 8)]);
        setTrendingPage(nextPage);
        setHasMoreTrending(nextPage < response.total_pages);
      } catch (err) {
        console.error('Error loading more trending movies:', err);
      }
    }
  };

  /**
   * 최근 본 기반 추천 영화 더보기 함수
   * 무한 스크롤을 위해 다음 페이지의 영화를 기존 목록에 추가
   */
  const loadMoreRecentBased = async () => {
    if (hasMoreRecentBased && !loading) {
      try {
        const nextPage = recentBasedPage + 1;
        const recentViewed = localStorage.getItem('moviepick_recent_viewed');
        if (recentViewed) {
          const recentMovies = JSON.parse(recentViewed);
          if (recentMovies.length > 0) {
            // 최근 본 영화 중 랜덤하게 하나를 선택
            const randomMovie = recentMovies[Math.floor(Math.random() * recentMovies.length)];
            const response = await tmdbApi.getSimilarMovies(randomMovie.id, nextPage);
            setRecentBasedMovies(prev => [...prev, ...response.results.slice(0, 8)]);
            setRecentBasedPage(nextPage);
            setHasMoreRecentBased(nextPage < response.total_pages);
          }
        }
      } catch (err) {
        console.error('Error loading more recent based movies:', err);
      }
    }
  };

  // 컴포넌트 마운트 시 초기 데이터 로딩
  useEffect(() => {
    fetchMovies();
  }, []);

  // 훅에서 반환할 값들
  return {
    popularMovies,              // 인기 영화 목록
    trendingMovies,             // 트렌딩 영화 목록
    recentBasedMovies,          // 최근 본 기반 추천 영화 목록
    loading,                    // 로딩 상태
    error,                      // 오류 메시지
    hasMorePopular,             // 인기 영화 더보기 가능 여부
    hasMoreTrending,            // 트렌딩 영화 더보기 가능 여부
    hasMoreRecentBased,         // 추천 영화 더보기 가능 여부
    loadMorePopular,            // 인기 영화 더보기 함수
    loadMoreTrending,           // 트렌딩 영화 더보기 함수
    loadMoreRecentBased,        // 추천 영화 더보기 함수
    refetch: fetchMovies        // 데이터 새로고침 함수
  };
}; 