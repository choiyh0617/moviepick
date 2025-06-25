/**
 * 메인 App 컴포넌트
 * 
 * 이 컴포넌트는 애플리케이션의 최상위 컴포넌트로, 다음과 같은 기능을 제공합니다:
 * - 라우팅 설정 (React Router)
 * - 다크모드/라이트모드 테마 관리
 * - 전역 스타일 적용
 * - 네비게이션 및 메인 콘텐츠 영역 구성
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import GenresPage from './pages/GenresPage';
import MovieDetailPage from './pages/MovieDetailPage/MovieDetailPage';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import { GlobalStyles, lightTheme, darkTheme } from './styles/GlobalStyles';

function App() {
  // 다크모드 상태 관리
  // localStorage에서 저장된 다크모드 설정을 불러오거나, 기본값은 false(라이트모드)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('moviepick_dark_mode');
    return saved ? JSON.parse(saved) : false;
  });

  // 다크모드 상태가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('moviepick_dark_mode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // 현재 다크모드 상태에 따라 테마 선택
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    // styled-components의 ThemeProvider로 테마를 전역적으로 제공
    <ThemeProvider theme={theme}>
      {/* 전역 스타일 적용 */}
      <GlobalStyles />
      
      {/* React Router를 사용한 라우팅 설정 */}
      <Router>
        <div className="App">
          {/* 네비게이션 컴포넌트 - 다크모드 토글 기능 포함 */}
          <Navigation isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
          
          {/* 메인 콘텐츠 영역 */}
          <main className="main-content">
            <Routes>
              {/* 홈페이지 - 메인 화면 */}
              <Route path="/" element={<HomePage />} />
              
              {/* 장르별 영화 페이지 */}
              <Route path="/genres" element={<GenresPage />} />
              
              {/* 영화 상세 페이지 - URL 파라미터로 영화 ID 전달 */}
              <Route path="/movie/:id" element={<MovieDetailPage />} />
              
              {/* 즐겨찾기 페이지 */}
              <Route path="/favorites" element={<FavoritesPage />} />
              
              {/* 설정 페이지 - 다크모드 토글 및 기타 설정 */}
              <Route path="/settings" element={<SettingsPage isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;