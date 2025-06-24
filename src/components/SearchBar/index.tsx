import React, { useState, useRef, useEffect } from 'react';
import {
  SearchBarContainer,
  SearchInputContainer,
  SearchInput,
  ClearButton,
  SearchButton,
  SearchIcon
} from './styles';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = "영화 제목을 검색하세요" 
}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && document.activeElement === inputRef.current) {
        handleSearch();
      }
    };

    document.addEventListener('keypress', handleKeyPress);
    return () => document.removeEventListener('keypress', handleKeyPress);
  }, [query]);

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleClear = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  return (
    <SearchBarContainer isFocused={isFocused}>
      <SearchInputContainer>
        <SearchInput
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
        />
        {query && (
          <ClearButton onClick={handleClear}>
            ✕
          </ClearButton>
        )}
      </SearchInputContainer>
      <SearchButton 
        onClick={handleSearch}
        disabled={!query.trim()}
      >
        <SearchIcon>검색</SearchIcon>
      </SearchButton>
    </SearchBarContainer>
  );
};

export default SearchBar; 