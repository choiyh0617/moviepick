/**
 * styled-components 테마 타입 정의
 * 
 * 이 파일은 styled-components의 DefaultTheme 인터페이스를 확장하여
 * 애플리케이션에서 사용할 테마 색상들을 정의합니다.
 * 이를 통해 TypeScript에서 테마 객체의 타입 안전성을 보장할 수 있습니다.
 */

import 'styled-components';

// styled-components 모듈을 확장하여 커스텀 테마 타입을 정의
declare module 'styled-components' {
  export interface DefaultTheme {
    body: string;        // 페이지 배경색
    text: string;        // 기본 텍스트 색상
    primary: string;     // 주요 색상 (버튼, 링크 등)
    secondary: string;   // 보조 색상
    background: string;  // 컴포넌트 배경색
    surface: string;     // 카드, 모달 등의 표면 색상
    border: string;      // 테두리 색상
    shadow: string;      // 그림자 색상
    error: string;       // 오류 메시지 색상
    success: string;     // 성공 메시지 색상
    warning: string;     // 경고 메시지 색상
  }
} 