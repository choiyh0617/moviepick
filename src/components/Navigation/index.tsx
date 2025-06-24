import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  NavContainer,
  NavLogo,
  NavLinks,
  NavLink,
  NavButton,
  ThemeToggle,
  ThemeIcon
} from './styles';

interface NavigationProps {
  isDarkMode: boolean;
  setIsDarkMode: (isDark: boolean) => void;
}

const Navigation: React.FC<NavigationProps> = ({ isDarkMode, setIsDarkMode }) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <NavContainer>
      <NavLogo to="/">
        <h1>MoviePick</h1>
      </NavLogo>
      
      <NavLinks>
        <NavLink to="/" isActive={isActive('/')}>
          홈
        </NavLink>
        <NavLink to="/genres" isActive={isActive('/genres')}>
          장르별
        </NavLink>
        <NavLink to="/favorites" isActive={isActive('/favorites')}>
          즐겨찾기
        </NavLink>
        <NavLink to="/settings" isActive={isActive('/settings')}>
          설정
        </NavLink>
      </NavLinks>

      <NavButton>
        <ThemeToggle onClick={() => setIsDarkMode(!isDarkMode)}>
          <ThemeIcon isDark={isDarkMode}>
            {isDarkMode ? '☀️' : '🌙'}
          </ThemeIcon>
        </ThemeToggle>
      </NavButton>
    </NavContainer>
  );
};

export default Navigation; 