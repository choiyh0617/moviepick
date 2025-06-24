import { useState, useEffect } from 'react';
import type { Movie } from '../types/movie';
import { tmdbApi } from '../api/tmdbApi';

export const useMovies = () => {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [recentBasedMovies, setRecentBasedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // 페이지네이션 상태
  const [popularPage, setPopularPage] = useState(1);
  const [trendingPage, setTrendingPage] = useState(1);
  const [recentBasedPage, setRecentBasedPage] = useState(1);
  
  const [hasMorePopular, setHasMorePopular] = useState(true);
  const [hasMoreTrending, setHasMoreTrending] = useState(true);
  const [hasMoreRecentBased, setHasMoreRecentBased] = useState(true);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      
      // 인기 영화 가져오기
      const popularResponse = await tmdbApi.getPopularMovies(1);
      setPopularMovies(popularResponse.results.slice(0, 8));
      setHasMorePopular(popularResponse.total_pages > 1);

      // 오늘의 추천
      const trendingResponse = await tmdbApi.getTrendingMovies(1);
      setTrendingMovies(trendingResponse.results.slice(0, 8));
      setHasMoreTrending(trendingResponse.total_pages > 1);

      // 최근 본 영화 기반 추천
      const recentViewed = localStorage.getItem('moviepick_recent_viewed');
      if (recentViewed) {
        const recentMovies = JSON.parse(recentViewed);
        if (recentMovies.length > 0) {
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

  // 더보기 함수들
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

  const loadMoreRecentBased = async () => {
    if (hasMoreRecentBased && !loading) {
      try {
        const nextPage = recentBasedPage + 1;
        const recentViewed = localStorage.getItem('moviepick_recent_viewed');
        if (recentViewed) {
          const recentMovies = JSON.parse(recentViewed);
          if (recentMovies.length > 0) {
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

  useEffect(() => {
    fetchMovies();
  }, []);

  return {
    popularMovies,
    trendingMovies,
    recentBasedMovies,
    loading,
    error,
    hasMorePopular,
    hasMoreTrending,
    hasMoreRecentBased,
    loadMorePopular,
    loadMoreTrending,
    loadMoreRecentBased,
    refetch: fetchMovies
  };
}; 