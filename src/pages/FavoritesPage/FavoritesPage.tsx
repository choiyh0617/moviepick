import React from "react";
import MovieCard from "../../components/MovieCard";
import { useFavorites } from "../../hooks/useFavorites";
import { Section, SectionTitle, Grid } from "../../components/styled/CommonStyles";
import {
  FavoritesContainer,
  Header,
  Title,
  Subtitle,
  StatsContainer,
  StatCard,
  StatNumber,
  StatLabel,
  ActionsContainer,
  ClearButton,
  EmptyState,
  EmptyIcon,
  EmptyTitle,
  EmptyDescription,
  BrowseButton,
  FavoritesSection
} from "./styles";

const FavoritesPage: React.FC = () => {
  const {
    favorites,
    recentViewed,
    handleFavoriteToggle,
    handleClearFavorites,
    handleClearRecent,
    handleBrowseMovies
  } = useFavorites();

  return (
    <FavoritesContainer>
      <Header>
        <Title>내 영화 컬렉션</Title>
        <Subtitle>찜한 영화와 최근 본 영화를 관리하세요</Subtitle>
      </Header>

      <StatsContainer>
        <StatCard>
          <StatNumber>{favorites.length}</StatNumber>
          <StatLabel>찜한 영화</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{recentViewed.length}</StatNumber>
          <StatLabel>최근 본 영화</StatLabel>
        </StatCard>
      </StatsContainer>

      <ActionsContainer>
        {favorites.length > 0 && (
          <ClearButton onClick={handleClearFavorites}>
            찜한 영화 모두 삭제
          </ClearButton>
        )}
        {recentViewed.length > 0 && (
          <ClearButton onClick={handleClearRecent}>
            최근 본 영화 삭제
          </ClearButton>
        )}
      </ActionsContainer>

      {favorites.length === 0 && recentViewed.length === 0 ? (
        <EmptyState>
          <EmptyIcon>♥</EmptyIcon>
          <EmptyTitle>아직 찜한 영화가 없습니다</EmptyTitle>
          <EmptyDescription>
            영화를 검색하고 하트 버튼을 클릭하여 찜한 영화에 추가하세요.
          </EmptyDescription>
          <BrowseButton onClick={handleBrowseMovies}>
            영화 둘러보기
          </BrowseButton>
        </EmptyState>
      ) : (
        <>
          {favorites.length > 0 && (
            <FavoritesSection>
              <SectionTitle>찜한 영화 ({favorites.length})</SectionTitle>
              <Grid columns={4}>
                {favorites.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onFavoriteToggle={handleFavoriteToggle}
                  />
                ))}
              </Grid>
            </FavoritesSection>
          )}

          {recentViewed.length > 0 && (
            <FavoritesSection>
              <SectionTitle>최근 본 영화 ({recentViewed.length})</SectionTitle>
              <Grid columns={4}>
                {recentViewed.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onFavoriteToggle={handleFavoriteToggle}
                  />
                ))}
              </Grid>
            </FavoritesSection>
          )}
        </>
      )}
    </FavoritesContainer>
  );
};

export default FavoritesPage;