import React from 'react';
import { useNavigate } from 'react-router-dom';
import MovieCard from '../../components/MovieCard';
import SearchBar from '../../components/SearchBar';
import { useMovies } from '../../hooks/useMovies';
import {
  HomeContainer,
  HeroSection,
  HeroTitle,
  HeroSubtitle,
  SearchContainer,
  MovieSection,
  SectionHeader,
  EmptyState,
  LoadingSpinner,
  ErrorMessage,
  Grid,
  SectionTitle,
  LoadMoreButton,
  LoadMoreContainer
} from './styles';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { 
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
    loadMoreRecentBased
  } = useMovies();

  const handleSearch = (query: string) => {
    navigate(`/genres?search=${encodeURIComponent(query)}`);
  };

  if (loading) {
    return (
      <HomeContainer>
        <LoadingSpinner />
      </HomeContainer>
    );
  }

  if (error) {
    return (
      <HomeContainer>
        <ErrorMessage>
          <h3>오류가 발생했습니다</h3>
          <p>{error}</p>
        </ErrorMessage>
      </HomeContainer>
    );
  }

  return (
    <HomeContainer>
      <HeroSection>
        <HeroTitle>MoviePick</HeroTitle>
        <HeroSubtitle>
          영화를 검색해보세요.
        </HeroSubtitle>
        <SearchContainer>
          <SearchBar onSearch={handleSearch} placeholder="영화 제목을 검색하세요." />
        </SearchContainer>
      </HeroSection>

      <MovieSection>
        <SectionHeader>
          <SectionTitle>인기 영화</SectionTitle>
        </SectionHeader>
        <Grid columns={4}>
          {popularMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </Grid>
        {hasMorePopular && (
          <LoadMoreContainer>
            <LoadMoreButton onClick={loadMorePopular}>
              더보기
            </LoadMoreButton>
          </LoadMoreContainer>
        )}
      </MovieSection>

      <MovieSection>
        <SectionHeader>
          <SectionTitle>오늘의 추천</SectionTitle>
        </SectionHeader>
        <Grid columns={4}>
          {trendingMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </Grid>
        {hasMoreTrending && (
          <LoadMoreContainer>
            <LoadMoreButton onClick={loadMoreTrending}>
              더보기
            </LoadMoreButton>
          </LoadMoreContainer>
        )}
      </MovieSection>

      {recentBasedMovies.length > 0 && (
        <MovieSection>
          <SectionHeader>
            <SectionTitle>최근 본 영화 기반 추천</SectionTitle>
          </SectionHeader>
          <Grid columns={4}>
            {recentBasedMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </Grid>
          {hasMoreRecentBased && (
            <LoadMoreContainer>
              <LoadMoreButton onClick={loadMoreRecentBased}>
                더보기
              </LoadMoreButton>
            </LoadMoreContainer>
          )}
        </MovieSection>
      )}

      {recentBasedMovies.length === 0 && (
        <MovieSection>
          <SectionTitle>최근 본 영화 기반 추천</SectionTitle>
          <EmptyState>
            <h3>아직 본 영화가 없습니다</h3>
            <p>영화를 검색하고 상세 페이지를 방문하면 여기에 추천이 표시됩니다.</p>
          </EmptyState>
        </MovieSection>
      )}
    </HomeContainer>
  );
};

export default HomePage; 