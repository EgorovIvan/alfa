import React from 'react';
import './Filter.scss';

interface FilterProps {
    isFavorites?: (boolean),
    onToggleFavorites: () => void,
}

const Filter: React.FC<FilterProps> = ({isFavorites, onToggleFavorites}) => {
    return (
        <div className="filter">
            <button
                className={`button ${isFavorites ? 'active' : ''}`}
                onClick={onToggleFavorites}
            >
                {isFavorites ? 'Показать всё' : 'Показать избранное'}
            </button>
        </div>
    );
};

export default Filter;
