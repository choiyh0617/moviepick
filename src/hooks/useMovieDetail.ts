import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { MovieDetail, Credits, Videos } from '../types/movie';
import { tmdbApi } from '../api/tmdbApi';
import { favoritesService } from '../api/favoritesService';

export const useMovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [credits, setCredits] = useState<Credits | null>(null);
  const [videos, setVideos] = useState<Videos | null>(null);
  const [similarMovies, setSimilarMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (id) {
      fetchMovieDetail();
      checkFavoriteStatus();
    }
  }, [id]);

  const fetchMovieDetail = async () => {
    try {
      setLoading(true);
      setError(null);

      const movieId = parseInt(id!);
      
      // 영화 상세 정보, 출연진, 비디오, 유사 영화를 병렬로 가져오기
      const [movieData, creditsData, videosData, similarData] = await Promise.all([
        tmdbApi.getMovieDetail(movieId),
        tmdbApi.getMovieCredits(movieId),
        tmdbApi.getMovieVideos(movieId),
        tmdbApi.getSimilarMovies(movieId, 1)
      ]);

      setMovie(movieData);
      setCredits(creditsData);
      setVideos(videosData);
      setSimilarMovies(similarData.results.slice(0, 6));

      // 최근 본 영화에 추가
      favoritesService.addToRecentViewed(movieData);
    } catch (err) {
      setError('새로고침 해주세요');
      console.error('Error fetching movie detail:', err);
    } finally {
      setLoading(false);
    }
  };

  const checkFavoriteStatus = () => {
    if (id) {
      const movieId = parseInt(id);
      setIsFavorite(favoritesService.isFavorite(movieId));
    }
  };

  const toggleFavorite = () => {
    if (movie) {
      if (isFavorite) {
        favoritesService.removeFromFavorites(movie.id);
      } else {
        favoritesService.addToFavorites(movie);
      }
      setIsFavorite(!isFavorite);
    }
  };

  const handleVideoClick = (videoKey: string) => {
    window.open(`https://www.youtube.com/watch?v=${videoKey}`, '_blank');
  };

  return {
    movie,
    credits,
    videos,
    similarMovies,
    loading,
    error,
    isFavorite,
    toggleFavorite,
    handleVideoClick
  };
}; 