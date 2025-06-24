import React from 'react';
import { useNavigate } from 'react-router-dom';
import MovieCard from '../../components/MovieCard';
import { useMovieDetail } from '../../hooks/useMovieDetail';
import { Section, SectionTitle, Grid, LoadingSpinner, ErrorMessage, Button } from '../../components/styled/CommonStyles';
import {
  DetailContainer,
  BackButton,
  HeroSection,
  BackdropImage,
  HeroContent,
  MovieTitle,
  MovieMeta,
  MetaItem,
  RatingBadge,
  ActionButtons,
  FavoriteButton,
  MovieInfo,
  MainContent,
  Sidebar,
  PosterContainer,
  PosterImage,
  InfoSection,
  InfoTitle,
  Overview,
  GenreList,
  GenreTag,
  CastGrid,
  CastCard,
  CastImage,
  CastName,
  CastCharacter,
  VideoGrid,
  VideoCard,
  VideoThumbnail,
  VideoTitle
} from './styles';

const MovieDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    movie,
    credits,
    videos,
    similarMovies,
    loading,
    error,
    isFavorite,
    handleFavoriteToggle,
    handleVideoClick
  } = useMovieDetail();

  if (loading) {
    return (
      <DetailContainer>
        <LoadingSpinner />
      </DetailContainer>
    );
  }

  if (error || !movie) {
    return (
      <DetailContainer>
        <ErrorMessage>
          <h3>오류가 발생했습니다</h3>
          <p>{error || '영화 정보를 찾을 수 없습니다.'}</p>
        </ErrorMessage>
      </DetailContainer>
    );
  }

  return (
    <DetailContainer>
      <BackButton onClick={() => navigate(-1)}>
        ← 뒤로 가기
      </BackButton>

      <HeroSection>
        <BackdropImage imageUrl={movie.backdrop_path ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}` : ''} />
        <HeroContent>
          <MovieTitle>{movie.title}</MovieTitle>
          <MovieMeta>
            <MetaItem>
              <span>★</span>
              <span>{movie.vote_average.toFixed(1)}</span>
            </MetaItem>
            <MetaItem>
              <span>📅</span>
              <span>{new Date(movie.release_date).getFullYear()}</span>
            </MetaItem>
            {movie.runtime && (
              <MetaItem>
                <span>⏱️</span>
                <span>{movie.runtime}분</span>
              </MetaItem>
            )}
          </MovieMeta>
          <ActionButtons>
            <FavoriteButton
              isFavorite={isFavorite}
              onClick={handleFavoriteToggle}
            >
              {isFavorite ? '♥' : '♡'} {isFavorite ? '찜한 영화' : '찜하기'}
            </FavoriteButton>
          </ActionButtons>
        </HeroContent>
      </HeroSection>

      <MovieInfo>
        <MainContent>
          <InfoSection>
            <InfoTitle>줄거리</InfoTitle>
            <Overview>{movie.overview}</Overview>
            
            {movie.genres && (
              <>
                <InfoTitle>장르</InfoTitle>
                <GenreList>
                  {movie.genres.map((genre) => (
                    <GenreTag key={genre.id}>{genre.name}</GenreTag>
                  ))}
                </GenreList>
              </>
            )}
          </InfoSection>

          {credits && credits.cast && credits.cast.length > 0 && (
            <InfoSection>
              <InfoTitle>출연진</InfoTitle>
              <CastGrid>
                {credits.cast.slice(0, 8).map((cast) => (
                  <CastCard key={cast.id}>
                    <CastImage
                      src={cast.profile_path ? `https://image.tmdb.org/t/p/w185${cast.profile_path}` : '/placeholder-avatar.jpg'}
                      alt={cast.name}
                    />
                    <CastName>{cast.name}</CastName>
                    <CastCharacter>{cast.character}</CastCharacter>
                  </CastCard>
                ))}
              </CastGrid>
            </InfoSection>
          )}

          {videos && videos.results && videos.results.length > 0 && (
            <InfoSection>
              <InfoTitle>예고편 및 영상</InfoTitle>
              <VideoGrid>
                {videos.results.slice(0, 6).map((video) => (
                  <VideoCard key={video.id} onClick={() => handleVideoClick(video.key)}>
                    <VideoThumbnail imageUrl={`https://img.youtube.com/vi/${video.key}/maxresdefault.jpg`} />
                    <VideoTitle>{video.name}</VideoTitle>
                  </VideoCard>
                ))}
              </VideoGrid>
            </InfoSection>
          )}

          {similarMovies && similarMovies.length > 0 && (
            <InfoSection>
              <InfoTitle>유사한 영화</InfoTitle>
              <Grid columns={4}>
                {similarMovies.map((similarMovie) => (
                  <MovieCard key={similarMovie.id} movie={similarMovie} />
                ))}
              </Grid>
            </InfoSection>
          )}
        </MainContent>

        <Sidebar>
          <PosterContainer>
            <PosterImage
              src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/placeholder-poster.jpg'}
              alt={movie.title}
            />
          </PosterContainer>
        </Sidebar>
      </MovieInfo>
    </DetailContainer>
  );
};

export default MovieDetailPage; 