import React from 'react';
import MovieCard from '../../components/MovieCard';
import { useGenres } from '../../hooks/useGenres';
import {
  GenresContainer,
  GenresHeader,
  GenresTitle,
  GenresSubtitle,
  GenresGrid,
  GenreCard,
  GenreName,
  GenreCount,
  MoviesSection,
  MoviesHeader,
  MoviesTitle,
  MoviesCount,
  MoviesGrid,
  LoadingSpinner,
  ErrorMessage,
  EmptyState,
  EmptyIcon,
  EmptyTitle,
  EmptyDescription,
  LoadMoreButton,
  LoadMoreContainer,
  SearchResultsHeader
} from './styles';

const GenresPage: React.FC = () => {
  const {
    genres,
    selectedGenre,
    movies,
    loading,
    error,
    hasMore,
    searchQuery,
    handleGenreSelect,
    loadMore
  } = useGenres();

  return (
    <GenresContainer>
      <GenresHeader>
        <GenresTitle>장르별 영화</GenresTitle>
        <GenresSubtitle>
          원하는 장르를 선택하여 영화를 탐색하세요
        </GenresSubtitle>
      </GenresHeader>

      {!searchQuery && (
        <GenresGrid>
          {genres.map((genre) => (
            <GenreCard
              key={genre.id}
              isSelected={selectedGenre?.id === genre.id}
              onClick={() => handleGenreSelect(genre)}
            >
              <GenreName>{genre.name}</GenreName>
              <GenreCount>영화 보기</GenreCount>
            </GenreCard>
          ))}
        </GenresGrid>
      )}

      {(selectedGenre || searchQuery) && (
        <MoviesSection>
          <MoviesHeader>
            {searchQuery ? (
              <SearchResultsHeader>
                <MoviesTitle>"{searchQuery}" 검색 결과</MoviesTitle>
                <MoviesCount>{movies.length}개의 영화</MoviesCount>
              </SearchResultsHeader>
            ) : (
              <>
                <MoviesTitle>{selectedGenre?.name} 영화</MoviesTitle>
                <MoviesCount>{movies.length}개의 영화</MoviesCount>
              </>
            )}
          </MoviesHeader>

          {error ? (
            <ErrorMessage>
              <h3>오류가 발생했습니다</h3>
              <p>{error}</p>
            </ErrorMessage>
          ) : movies.length > 0 ? (
            <>
              <MoviesGrid>
                {movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </MoviesGrid>
              
              {hasMore && (
                <LoadMoreContainer>
                  <LoadMoreButton onClick={loadMore} disabled={loading}>
                    {loading ? '로딩 중...' : '더보기'}
                  </LoadMoreButton>
                </LoadMoreContainer>
              )}
            </>
          ) : (
            <EmptyState>
              <EmptyIcon>🎬</EmptyIcon>
              <EmptyTitle>
                {searchQuery ? '검색 결과가 없습니다' : '영화가 없습니다'}
              </EmptyTitle>
              <EmptyDescription>
                {searchQuery 
                  ? `"${searchQuery}"에 대한 검색 결과를 찾을 수 없습니다.`
                  : '이 장르의 영화를 찾을 수 없습니다.'
                }
              </EmptyDescription>
            </EmptyState>
          )}
        </MoviesSection>
      )}

      {!selectedGenre && !searchQuery && (
        <EmptyState>
          <EmptyTitle>장르를 선택하세요</EmptyTitle>
          <EmptyDescription>
            장르 카드를 클릭하여 해당 장르의 영화를 확인하세요.
          </EmptyDescription>
        </EmptyState>
      )}
    </GenresContainer>
  );
};

export default GenresPage; 