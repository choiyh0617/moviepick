/**
 * 애플리케이션 진입점 (Entry Point)
 * 
 * 이 파일은 React 애플리케이션의 시작점으로, 다음과 같은 역할을 합니다:
 * - React 앱을 DOM에 마운트
 * - StrictMode로 개발 시 잠재적 문제 감지
 * - 전역 CSS 스타일 적용
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// React 18의 createRoot API를 사용하여 앱을 DOM에 마운트
// document.getElementById('root')는 public/index.html의 root div를 참조
ReactDOM.createRoot(document.getElementById('root')!).render(
  // StrictMode는 개발 모드에서 잠재적인 문제를 감지하고 경고
  // - 부작용(side effects) 감지
  // - 레거시 API 사용 경고
  // - 컴포넌트의 이중 렌더링으로 문제 발견
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
