import React, { useState } from 'react';
import './SearchBar.scss';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = (query: string): void => {
        onSearch(query);
        setQuery(query);
    };

    return (
        <div className="searchBar">
            <input
                type="text"
                className="input"
                placeholder="Поиск продукции..."
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
            />
        </div>
    );
};

export default SearchBar;
