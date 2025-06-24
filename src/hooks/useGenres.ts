import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Movie } from '../types/movie';
import { tmdbApi } from '../api/tmdbApi';

export interface Genre {
  id: number;
  name: string;
}

export const useGenres = () => {
  const [searchParams] = useSearchParams();
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // URL에서 검색 쿼리 가져오기
  useEffect(() => {
    const query = searchParams.get('search');
    if (query) {
      setSearchQuery(query);
      setSelectedGenre(null);
      setCurrentPage(1);
      setHasMore(true);
      searchMovies(query, 1);
    }
  }, [searchParams]);

  // 장르 목록 가져오기
  const fetchGenres = async () => {
    try {
      const genresData = await tmdbApi.getGenres();
      setGenres(genresData);
    } catch (err) {
      console.error('Error fetching genres:', err);
    }
  };

  // 영화 검색
  const searchMovies = async (query: string, page: number = 1) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await tmdbApi.searchMovies(query, page);
      
      if (page === 1) {
        setMovies(response.results);
      } else {
        setMovies(prev => [...prev, ...response.results]);
      }
      
      setHasMore(page < response.total_pages);
    } catch (err) {
      setError('새로고침 해주세요');
      console.error('Error searching movies:', err);
    } finally {
      setLoading(false);
    }
  };

  // 선택된 장르의 영화 가져오기
  const fetchMoviesByGenre = async (genreId: number, page: number = 1) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await tmdbApi.getMoviesByGenre(genreId, page);
      
      if (page === 1) {
        setMovies(response.results);
      } else {
        setMovies(prev => [...prev, ...response.results]);
      }
      
      setHasMore(page < response.total_pages);
    } catch (err) {
      setError('새로고침 해주세요');
      console.error('Error fetching movies by genre:', err);
    } finally {
      setLoading(false);
    }
  };

  // 장르 선택 처리
  const handleGenreSelect = (genre: Genre) => {
    setSelectedGenre(genre);
    setSearchQuery('');
    setCurrentPage(1);
    setHasMore(true);
    fetchMoviesByGenre(genre.id, 1);
  };

  // 더보기 처리
  const loadMore = () => {
    if (loading) return;
    
    if (searchQuery) {
      // 검색 결과 더보기
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      searchMovies(searchQuery, nextPage);
    } else if (selectedGenre) {
      // 장르별 영화 더보기
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchMoviesByGenre(selectedGenre.id, nextPage);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  return {
    genres,
    selectedGenre,
    movies,
    loading,
    error,
    hasMore,
    searchQuery,
    handleGenreSelect,
    loadMore
  };
}; 