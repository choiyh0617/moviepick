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
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('moviepick_dark_mode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('moviepick_dark_mode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <div className="App">
          <Navigation isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/genres" element={<GenresPage />} />
              <Route path="/movie/:id" element={<MovieDetailPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/settings" element={<SettingsPage isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;