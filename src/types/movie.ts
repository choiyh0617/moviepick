/**
 * 영화 관련 TypeScript 타입 정의
 * 
 * 이 파일은 TMDB API에서 제공하는 영화 데이터의 구조를 정의합니다.
 * 모든 인터페이스는 TMDB API 응답 형식에 맞춰 설계되었습니다.
 */

/**
 * 기본 영화 정보 인터페이스
 * 영화 목록에서 사용되는 기본적인 영화 정보를 포함
 */
export interface Movie {
  id: number;                    // 영화 고유 ID
  title: string;                 // 영화 제목 (현지화된 제목)
  original_title: string;        // 원제목
  overview: string;              // 영화 줄거리/개요
  poster_path: string;           // 포스터 이미지 경로
  backdrop_path: string;         // 배경 이미지 경로
  release_date: string;          // 개봉일 (YYYY-MM-DD 형식)
  vote_average: number;          // 평균 평점 (0-10)
  vote_count: number;            // 투표 수
  popularity: number;            // 인기도 점수
  genre_ids: number[];           // 장르 ID 배열
  adult: boolean;                // 성인용 영화 여부
  video: boolean;                // 비디오 여부 (TV 영화 등)
}

/**
 * 상세 영화 정보 인터페이스
 * Movie 인터페이스를 확장하여 영화 상세 페이지에서 필요한 추가 정보를 포함
 */
export interface MovieDetail extends Movie {
  genres: Genre[];               // 장르 정보 배열
  runtime: number;               // 상영 시간 (분)
  status: string;                // 영화 상태 (Released, Post Production 등)
  production_companies: ProductionCompany[];    // 제작사 정보
  production_countries: ProductionCountry[];    // 제작국 정보
  spoken_languages: SpokenLanguage[];           // 사용 언어 정보
  budget: number;                // 제작 예산
  revenue: number;               // 수익
  homepage: string;              // 공식 홈페이지 URL
  imdb_id: string;               // IMDb ID
  tagline: string;               // 영화 태그라인
}

/**
 * 장르 정보 인터페이스
 */
export interface Genre {
  id: number;                    // 장르 고유 ID
  name: string;                  // 장르 이름
}

/**
 * 제작사 정보 인터페이스
 */
export interface ProductionCompany {
  id: number;                    // 제작사 고유 ID
  name: string;                  // 제작사 이름
  logo_path: string | null;      // 로고 이미지 경로
  origin_country: string;        // 원산국
}

/**
 * 제작국 정보 인터페이스
 */
export interface ProductionCountry {
  iso_3166_1: string;            // ISO 3166-1 국가 코드
  name: string;                  // 국가 이름
}

/**
 * 사용 언어 정보 인터페이스
 */
export interface SpokenLanguage {
  iso_639_1: string;             // ISO 639-1 언어 코드
  name: string;                  // 언어 이름
}

/**
 * 검색 응답 인터페이스
 * 영화 검색 API의 응답 구조를 정의
 */
export interface SearchResponse {
  page: number;                  // 현재 페이지 번호
  results: Movie[];              // 검색 결과 영화 배열
  total_pages: number;           // 전체 페이지 수
  total_results: number;         // 전체 결과 수
}

/**
 * 영화 목록 응답 인터페이스
 * 인기 영화, 최신 영화 등 목록 API의 응답 구조를 정의
 */
export interface MovieResponse {
  page: number;                  // 현재 페이지 번호
  results: Movie[];              // 영화 배열
  total_pages: number;           // 전체 페이지 수
  total_results: number;         // 전체 결과 수
}

/**
 * 배우 정보 인터페이스
 * 영화의 출연진 정보를 포함
 */
export interface Cast {
  id: number;                    // 배우 고유 ID
  name: string;                  // 배우 이름
  character: string;             // 영화에서의 역할명
  profile_path: string | null;   // 프로필 이미지 경로
  order: number;                 // 출연 순서 (메인 배우가 낮은 숫자)
}

/**
 * 제작진 정보 인터페이스
 * 영화의 제작진 정보를 포함
 */
export interface Crew {
  id: number;                    // 제작진 고유 ID
  name: string;                  // 제작진 이름
  job: string;                   // 직책 (감독, 각본 등)
  department: string;            // 부서 (Directing, Production 등)
  profile_path: string | null;   // 프로필 이미지 경로
}

/**
 * 출연진 및 제작진 정보 인터페이스
 * 영화의 전체 크레딧 정보를 포함
 */
export interface Credits {
  id: number;                    // 영화 ID
  cast: Cast[];                  // 배우 정보 배열
  crew: Crew[];                  // 제작진 정보 배열
}

/**
 * 비디오 정보 인터페이스
 * 영화의 예고편, 메이킹 필름 등의 비디오 정보를 포함
 */
export interface Video {
  id: string;                    // 비디오 고유 ID
  key: string;                   // YouTube 등에서 사용하는 비디오 키
  name: string;                  // 비디오 제목
  site: string;                  // 비디오 사이트 (YouTube, Vimeo 등)
  size: number;                  // 비디오 해상도
  type: string;                  // 비디오 타입 (Trailer, Teaser 등)
  official: boolean;             // 공식 비디오 여부
  published_at: string;          // 업로드 날짜
}

/**
 * 비디오 목록 응답 인터페이스
 * 영화의 모든 비디오 정보를 포함
 */
export interface Videos {
  id: number;                    // 영화 ID
  results: Video[];              // 비디오 정보 배열
} 