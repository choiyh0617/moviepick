/**
 * 전역 스타일 및 테마 정의
 * 
 * 이 파일은 애플리케이션의 전역 스타일과 다크모드/라이트모드 테마를 정의합니다.
 * styled-components의 createGlobalStyle을 사용하여 CSS-in-JS 방식으로 스타일을 관리합니다.
 * 
 * 주요 기능:
 * - 라이트모드/다크모드 테마 색상 정의
 * - 전역 CSS 리셋 및 기본 스타일
 * - 반응형 디자인을 위한 미디어 쿼리
 */

import { createGlobalStyle } from 'styled-components';

/**
 * 라이트모드 테마 색상 정의
 * 밝고 깔끔한 색상 팔레트로 사용자 친화적인 인터페이스 제공
 */
export const lightTheme = {
  body: '#ffffff',              // 페이지 배경색 (흰색)
  text: '#333333',              // 기본 텍스트 색상 (진한 회색)
  primary: '#3b82f6',           // 주요 색상 (파란색) - 버튼, 링크 등
  secondary: '#1d4ed8',         // 보조 색상 (진한 파란색) - 호버 상태 등
  background: '#f8f9fa',        // 컴포넌트 배경색 (연한 회색)
  surface: '#ffffff',           // 카드, 모달 표면 색상 (흰색)
  border: '#e0e0e0',           // 테두리 색상 (연한 회색)
  shadow: 'rgba(0, 0, 0, 0.1)', // 그림자 색상 (반투명 검정)
  error: '#ff4757',             // 오류 색상 (빨간색)
  success: '#2ed573',           // 성공 색상 (초록색)
  warning: '#ffa502',           // 경고 색상 (주황색)
};

/**
 * 다크모드 테마 색상 정의
 * 어둡고 모던한 색상 팔레트로 눈의 피로도를 줄이는 인터페이스 제공
 */
export const darkTheme = {
  body: '#1a1a1a',              // 페이지 배경색 (진한 회색)
  text: '#ffffff',              // 기본 텍스트 색상 (흰색)
  primary: '#1e40af',           // 주요 색상 (진한 파란색)
  secondary: '#1e3a8a',         // 보조 색상 (더 진한 파란색)
  background: '#121212',        // 컴포넌트 배경색 (거의 검정)
  surface: '#1e1e1e',           // 카드, 모달 표면 색상 (진한 회색)
  border: '#333333',            // 테두리 색상 (중간 회색)
  shadow: 'rgba(0, 0, 0, 0.3)', // 그림자 색상 (더 진한 반투명 검정)
  error: '#ff4757',             // 오류 색상 (빨간색) - 라이트모드와 동일
  success: '#2ed573',           // 성공 색상 (초록색) - 라이트모드와 동일
  warning: '#ffa502',           // 경고 색상 (주황색) - 라이트모드와 동일
};

/**
 * 전역 스타일 정의
 * styled-components의 createGlobalStyle을 사용하여 전역 CSS 스타일을 적용
 */
export const GlobalStyles = createGlobalStyle<{ theme: typeof lightTheme }>`
  /* CSS 리셋 - 모든 요소의 기본 마진과 패딩 제거 */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;     /* 박스 모델을 border-box로 통일 */
  }

  /* 기본 body 스타일 */
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;               /* 시스템 폰트 스택 사용 */
    background-color: ${({ theme }) => theme.body};    /* 테마에 따른 배경색 */
    color: ${({ theme }) => theme.text};               /* 테마에 따른 텍스트 색상 */
    transition: all 0.3s ease;  /* 테마 변경 시 부드러운 전환 효과 */
  }

  /* 링크 스타일 리셋 */
  a {
    text-decoration: none;      /* 밑줄 제거 */
    color: inherit;             /* 부모 요소의 색상 상속 */
  }

  /* 버튼 스타일 리셋 */
  button {
    font-family: inherit;       /* 부모 요소의 폰트 상속 */
    border: none;               /* 테두리 제거 */
    cursor: pointer;            /* 포인터 커서 */
    background: none;           /* 배경 제거 */
  }

  /* 이미지 반응형 처리 */
  img {
    max-width: 100%;            /* 컨테이너 너비를 넘지 않도록 제한 */
    height: auto;               /* 비율 유지 */
  }

  /* 컨테이너 클래스 - 콘텐츠 중앙 정렬 및 최대 너비 제한 */
  .container {
    max-width: 1200px;          /* 최대 너비 1200px */
    margin: 0 auto;             /* 좌우 중앙 정렬 */
    padding: 0 20px;            /* 좌우 패딩 20px */
  }

  /* 모바일 반응형 스타일 */
  @media (max-width: 768px) {
    .container {
      padding: 0 16px;          /* 모바일에서는 패딩을 16px로 줄임 */
    }
  }
`; 