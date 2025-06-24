import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavigationContainer = styled.nav`
  background: ${({ theme }) => theme.surface};
  position: sticky;
  top: 0;
  z-index: 1000;
`;

export const NavContainer = styled.nav`
  background: ${({ theme }) => theme.surface};
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
`;

export const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
`;

export const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: ${({ theme }) => theme.text};
  font-weight: 700;
  font-size: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    color: ${({ theme }) => theme.primary};
  }
`;

export const NavLogo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${({ theme }) => theme.text};
  font-weight: 700;
  font-size: 1.5rem;
  transition: all 0.3s ease;

  h1 {
    margin: 0;
    color: ${({ theme }) => theme.primary};
  }
`;

export const LogoIcon = styled.span`
  font-size: 2rem;
`;

export const LogoText = styled.span`
  background: linear-gradient(135deg, ${({ theme }) => theme.primary} 0%, ${({ theme }) => theme.secondary} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const NavLinks = styled.div`
  display: flex;
  gap: 32px;
  align-items: center;
`;

export const NavLink = styled(Link).withConfig({ shouldForwardProp: (prop) => prop !== 'isActive' })<{
  isActive: boolean;
}>`
  text-decoration: none;
  color: ${({ isActive, theme }) => isActive ? theme.primary : theme.text};
  font-weight: ${({ isActive }) => isActive ? '600' : '500'};
  font-size: 1rem;
  padding: 8px 16px;
  border-radius: 20px;
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const NavButton = styled.div`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

export const Badge = styled.span`
  background: ${({ theme }) => theme.error};
  color: white;
  font-size: 12px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 10px;
  min-width: 18px;
  text-align: center;
  line-height: 1;
`;

export const NavStats = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

export const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  background: ${({ theme }) => theme.background};
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
`;

export const StatIcon = styled.span`
  font-size: 16px;
`;

export const StatText = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

export const ThemeToggle = styled.button`
  background: ${({ theme }) => theme.background};
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: 20px;
  padding: 8px 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: ${({ theme }) => theme.text};
`;

export const ThemeIcon = styled.span.withConfig({ shouldForwardProp: (prop) => prop !== 'isDark' })<{
  isDark: boolean;
}>`
  font-size: 16px;
  transition: all 0.3s ease;
`; 