import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    body: string;
    text: string;
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    border: string;
    shadow: string;
    error: string;
    success: string;
    warning: string;
  }
} 