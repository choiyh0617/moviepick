import { favoritesService } from '../api/favoritesService';

export const useSettings = () => {
  const handleClearFavorites = () => {
    if (window.confirm('모든 찜한 영화를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      const favorites = favoritesService.getFavorites();
      favorites.forEach(movie => {
        favoritesService.removeFromFavorites(movie.id);
      });
      alert('찜한 영화가 모두 삭제되었습니다.');
    }
  };

  const handleClearRecent = () => {
    if (window.confirm('최근 본 영화 기록을 모두 삭제하시겠습니까?')) {
      localStorage.removeItem('moviepick_recent_viewed');
      alert('최근 본 영화 기록이 삭제되었습니다.');
    }
  };

  const handleClearAllData = () => {
    if (window.confirm('모든 로컬 데이터를 삭제하시겠습니까? 찜한 영화, 최근 본 영화, 설정이 모두 삭제됩니다.')) {
      localStorage.clear();
      alert('모든 데이터가 삭제되었습니다. 페이지가 새로고침됩니다.');
      window.location.reload();
    }
  };

  return {
    handleClearFavorites,
    handleClearRecent,
    handleClearAllData
  };
}; 