import { createGlobalStyle } from 'styled-components';

export const lightTheme = {
  body: '#ffffff',
  text: '#333333',
  primary: '#3b82f6',
  secondary: '#1d4ed8',
  background: '#f8f9fa',
  surface: '#ffffff',
  border: '#e0e0e0',
  shadow: 'rgba(0, 0, 0, 0.1)',
  error: '#ff4757',
  success: '#2ed573',
  warning: '#ffa502',
};

export const darkTheme = {
  body: '#1a1a1a',
  text: '#ffffff',
  primary: '#1e40af',
  secondary: '#1e3a8a',
  background: '#121212',
  surface: '#1e1e1e',
  border: '#333333',
  shadow: 'rgba(0, 0, 0, 0.3)',
  error: '#ff4757',
  success: '#2ed573',
  warning: '#ffa502',
};

export const GlobalStyles = createGlobalStyle<{ theme: typeof lightTheme }>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.3s ease;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    font-family: inherit;
    border: none;
    cursor: pointer;
    background: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  @media (max-width: 768px) {
    .container {
      padding: 0 16px;
    }
  }
`; 