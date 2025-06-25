/**
 * MovieCard 컴포넌트 스타일 정의
 * 
 * 이 파일은 영화 카드 컴포넌트의 모든 스타일을 정의합니다.
 * styled-components를 사용하여 CSS-in-JS 방식으로 스타일을 관리하며,
 * 테마 시스템과 연동되어 다크모드/라이트모드를 지원합니다.
 */

import styled from 'styled-components';

/**
 * 영화 카드 전체 컨테이너
 * 카드의 기본 레이아웃과 호버 효과를 정의
 */
export const MovieCardContainer = styled.div`
  background: ${({ theme }) => theme.surface};     /* 테마에 따른 배경색 */
  border-radius: 12px;                             /* 둥근 모서리 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);      /* 그림자 효과 */
  overflow: hidden;                                /* 내용이 넘치지 않도록 */
  cursor: pointer;                                 /* 포인터 커서 */
  position: relative;                              /* 자식 요소의 절대 위치 기준점 */
`;

/**
 * 포스터 이미지 컨테이너
 * 포스터 이미지와 오버레이 요소들을 포함하는 영역
 */
export const PosterContainer = styled.div`
  position: relative;                              /* 자식 요소의 절대 위치 기준점 */
  width: 100%;                                     /* 전체 너비 */
  height: 300px;                                   /* 고정 높이 */
  overflow: hidden;                                /* 이미지가 넘치지 않도록 */
`;

/**
 * 영화 포스터 이미지
 * 포스터 이미지의 표시 방식을 정의
 */
export const PosterImage = styled.img`
  width: 100%;                                     /* 컨테이너 전체 너비 */
  height: 100%;                                    /* 컨테이너 전체 높이 */
  object-fit: cover;                               /* 비율 유지하며 영역 채우기 */
`;

/**
 * 즐겨찾기 버튼
 * @param isFavorite - 즐겨찾기 상태에 따른 스타일 변경
 */
export const FavoriteButton = styled.button<{ isFavorite: boolean }>`
  position: absolute;                              /* 절대 위치 */
  top: 12px;                                       /* 상단에서 12px */
  right: 12px;                                     /* 우측에서 12px */
  background: ${({ isFavorite }) => 
    isFavorite ? 'rgba(239, 68, 68, 0.9)' : 'rgba(0, 0, 0, 0.7)'  /* 즐겨찾기 상태에 따른 배경색 */
  };
  border: none;                                    /* 테두리 제거 */
  border-radius: 50%;                              /* 원형 모양 */
  width: 40px;                                     /* 너비 40px */
  height: 40px;                                    /* 높이 40px */
  display: flex;                                   /* Flexbox 레이아웃 */
  align-items: center;                             /* 세로 중앙 정렬 */
  justify-content: center;                         /* 가로 중앙 정렬 */
  cursor: pointer;                                 /* 포인터 커서 */
  z-index: 10;                                     /* 다른 요소 위에 표시 */
  transform: scale(1);                             /* 기본 크기 */
  
  /* 클릭 시 축소 효과 */
  &:active {
    transform: scale(0.95);
  }
`;

/**
 * 하트 아이콘
 * 즐겨찾기 버튼 내부의 하트 모양 텍스트
 */
export const HeartIcon = styled.span`
  color: white;                                    /* 흰색 텍스트 */
  font-size: 18px;                                 /* 폰트 크기 */
  font-weight: bold;                               /* 굵은 폰트 */
`;

/**
 * 평점 배지
 * 포스터 하단에 표시되는 평점 정보 배경
 */
export const RatingBadge = styled.div`
  position: absolute;                              /* 절대 위치 */
  bottom: 12px;                                    /* 하단에서 12px */
  left: 12px;                                      /* 좌측에서 12px */
  background: rgba(0, 0, 0, 0.8);                 /* 반투명 검정 배경 */
  color: white;                                    /* 흰색 텍스트 */
  padding: 4px 8px;                                /* 내부 여백 */
  border-radius: 4px;                              /* 둥근 모서리 */
  font-size: 12px;                                 /* 작은 폰트 크기 */
  font-weight: bold;                               /* 굵은 폰트 */
`;

/**
 * 평점 텍스트
 * 평점 배지 내부의 별점 텍스트 (노란색)
 */
export const RatingText = styled.span`
  color: #fbbf24;                                  /* 노란색 (별점 색상) */
`;

/**
 * 영화 정보 컨테이너
 * 제목, 년도, 줄거리 등의 텍스트 정보를 포함하는 영역
 */
export const MovieInfo = styled.div`
  padding: 16px;                                   /* 내부 여백 */
`;

/**
 * 영화 제목
 * 영화의 제목을 표시하는 헤딩 요소
 */
export const MovieTitle = styled.h3`
  margin: 0 0 8px 0;                               /* 하단 여백만 설정 */
  font-size: 16px;                                 /* 폰트 크기 */
  font-weight: 600;                                /* 중간 굵기 폰트 */
  color: ${({ theme }) => theme.text};             /* 테마에 따른 텍스트 색상 */
  line-height: 1.3;                                /* 줄 간격 */
  display: -webkit-box;                            /* WebKit 박스 모델 */
  -webkit-line-clamp: 2;                           /* 최대 2줄까지 표시 */
  -webkit-box-orient: vertical;                    /* 세로 방향 정렬 */
  overflow: hidden;                                /* 넘치는 텍스트 숨김 */
`;

/**
 * 영화 개봉년도
 * 영화의 개봉년도를 표시하는 텍스트
 */
export const MovieYear = styled.p`
  margin: 0 0 8px 0;                               /* 하단 여백만 설정 */
  font-size: 14px;                                 /* 폰트 크기 */
  color: ${({ theme }) => theme.text};             /* 테마에 따른 텍스트 색상 */
  opacity: 0.7;                                    /* 투명도 (약간 흐리게) */
`;

/**
 * 영화 줄거리
 * 영화의 간단한 줄거리를 표시하는 텍스트
 */
export const MovieOverview = styled.p`
  margin: 0;                                       /* 여백 제거 */
  font-size: 13px;                                 /* 작은 폰트 크기 */
  color: ${({ theme }) => theme.text};             /* 테마에 따른 텍스트 색상 */
  opacity: 0.8;                                    /* 투명도 (약간 흐리게) */
  line-height: 1.4;                                /* 줄 간격 */
  display: -webkit-box;                            /* WebKit 박스 모델 */
  -webkit-line-clamp: 3;                           /* 최대 3줄까지 표시 */
  -webkit-box-orient: vertical;                    /* 세로 방향 정렬 */
  overflow: hidden;                                /* 넘치는 텍스트 숨김 */
`; 