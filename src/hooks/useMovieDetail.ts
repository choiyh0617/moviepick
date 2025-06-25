/**
 * 영화 상세 정보 관리 커스텀 훅
 * 
 * 이 훅은 영화 상세 페이지에서 필요한 모든 데이터와 기능을 관리합니다.
 * 영화 정보, 출연진, 비디오, 유사 영화, 즐겨찾기 상태 등을 포함합니다.
 * 
 * 주요 기능:
 * - 영화 상세 정보 및 관련 데이터 로딩
 * - 즐겨찾기 추가/제거 기능
 * - 최근 본 영화 목록 자동 추가
 * - YouTube 비디오 링크 처리
 * - 로딩 상태 및 오류 처리
 */

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { MovieDetail, Credits, Videos } from '../types/movie';
import { tmdbApi } from '../api/tmdbApi';
import { favoritesService } from '../api/favoritesService';

/**
 * 영화 상세 정보 관리 훅
 * @returns 영화 상세 정보와 관련 기능들을 포함한 객체
 */
export const useMovieDetail = () => {
  // URL 파라미터에서 영화 ID 추출
  const { id } = useParams<{ id: string }>();
  
  // 상태 관리
  const [movie, setMovie] = useState<MovieDetail | null>(null);        // 영화 상세 정보
  const [credits, setCredits] = useState<Credits | null>(null);        // 출연진 정보
  const [videos, setVideos] = useState<Videos | null>(null);           // 비디오 정보
  const [similarMovies, setSimilarMovies] = useState<any[]>([]);       // 유사 영화 목록
  const [loading, setLoading] = useState(true);                        // 로딩 상태
  const [error, setError] = useState<string | null>(null);             // 오류 메시지
  const [isFavorite, setIsFavorite] = useState(false);                // 즐겨찾기 상태

  // 영화 ID가 변경될 때마다 데이터 로딩 및 즐겨찾기 상태 확인
  useEffect(() => {
    if (id) {
      fetchMovieDetail();
      checkFavoriteStatus();
    }
  }, [id]);

  /**
   * 영화 상세 정보 및 관련 데이터를 가져오는 함수
   * 여러 API를 병렬로 호출하여 성능을 최적화
   */
  const fetchMovieDetail = async () => {
    try {
      setLoading(true);
      setError(null);

      const movieId = parseInt(id!);
      
      // 영화 상세 정보, 출연진, 비디오, 유사 영화를 병렬로 가져오기
      // Promise.all을 사용하여 모든 요청을 동시에 처리
      const [movieData, creditsData, videosData, similarData] = await Promise.all([
        tmdbApi.getMovieDetail(movieId),           // 영화 상세 정보
        tmdbApi.getMovieCredits(movieId),          // 출연진 정보
        tmdbApi.getMovieVideos(movieId),           // 비디오 정보
        tmdbApi.getSimilarMovies(movieId, 1)       // 유사 영화 (1페이지)
      ]);

      // 상태 업데이트
      setMovie(movieData);
      setCredits(creditsData);
      setVideos(videosData);
      setSimilarMovies(similarData.results.slice(0, 6));  // 최대 6개만 표시

      // 최근 본 영화 목록에 자동 추가
      favoritesService.addToRecentViewed(movieData);
    } catch (err) {
      setError('새로고침 해주세요');
      console.error('Error fetching movie detail:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * 현재 영화의 즐겨찾기 상태를 확인하는 함수
   */
  const checkFavoriteStatus = () => {
    if (id) {
      const movieId = parseInt(id);
      setIsFavorite(favoritesService.isFavorite(movieId));
    }
  };

  /**
   * 즐겨찾기 추가/제거 토글 함수
   */
  const handleFavoriteToggle = () => {
    if (movie) {
      if (isFavorite) {
        favoritesService.removeFromFavorites(movie.id);
      } else {
        favoritesService.addToFavorites(movie);
      }
      setIsFavorite(!isFavorite);
    }
  };

  /**
   * 비디오 클릭 시 YouTube에서 새 탭으로 열기
   * @param videoKey - YouTube 비디오 키
   */
  const handleVideoClick = (videoKey: string) => {
    window.open(`https://www.youtube.com/watch?v=${videoKey}`, '_blank');
  };

  // 훅에서 반환할 값들
  return {
    movie,                    // 영화 상세 정보
    credits,                  // 출연진 정보
    videos,                   // 비디오 정보
    similarMovies,            // 유사 영화 목록
    loading,                  // 로딩 상태
    error,                    // 오류 메시지
    isFavorite,               // 즐겨찾기 상태
    handleFavoriteToggle,     // 즐겨찾기 토글 함수
    handleVideoClick          // 비디오 클릭 처리 함수
  };
}; 