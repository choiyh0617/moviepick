import styled from 'styled-components';

export const SearchBarContainer = styled.div<{ isFocused: boolean }>`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.surface};
  border-radius: 50px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 4px;
  transition: all 0.3s ease;
  max-width: 600px;
  width: 100%;

  ${({ isFocused, theme }) => isFocused && `
    box-shadow: 0 6px 20px ${theme.shadow};
    transform: translateY(-2px);
  `}
`;

export const SearchInputContainer = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
`;

export const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  padding: 12px 16px;
  font-size: 16px;
  background: transparent;
  color: ${({ theme }) => theme.text};

  &::placeholder {
    color: ${({ theme }) => theme.text};
    opacity: 0.5;
    font-style: italic;
  }
`;

export const ClearButton = styled.button`
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  opacity: 0.5;
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.border};
    opacity: 1;
  }
`;

export const SearchButton = styled.button<{ disabled: boolean }>`
  background: ${({ disabled, theme }) => 
    disabled ? '#94a3b8' : theme.primary
  };
  border: none;
  border-radius: 50px;
  padding: 12px 20px;
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 48px;
  height: 48px;
`;

export const SearchIcon = styled.span`
  font-size: 18px;
  color: white;
`; 