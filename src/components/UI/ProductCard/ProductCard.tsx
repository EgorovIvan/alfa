import React from 'react';
import './ProductCard.scss';

type ProductCardProps = {
    image: string;
    title: string;
    price: number;
    description?: string;
    isLiked: boolean;
    toggleLike: () => void;
    onRemove: () => void;
    onClick: () => void;
};

const ProductCard: React.FC<ProductCardProps> = ({image, title, price, description, isLiked, toggleLike, onRemove, onClick}) => {

    /** Обработчик добавления/удаления лайка */
    const handleToggleLikeClick = (event: React.MouseEvent) => {
        event.stopPropagation();

        toggleLike();
    };

    /** Обработчик удаления карточки товара */
    const handleRemove = (event: React.MouseEvent) => {
        event.stopPropagation();

        onRemove();
    };

    return (
        <div className="product-card" onClick={onClick}>
            <div className="product-card__image-wrapper">
                <img src={image} alt={title} className="product-card__image" />
                <div className="product-card__actions">
                    <button onClick={handleToggleLikeClick} className="product-card__button">
                        { isLiked ? '❤️' : '🤍' }
                    </button>
                    <button onClick={handleRemove} className="product-card__button">❌</button>
                </div>
            </div>
            <div className="product-card__details">
                <h3 className="product-card__title">{title}</h3>
                <p className="product-card__price">${price.toFixed(2)}</p>
                <p className="product-card__description">{description}</p>
            </div>
        </div>
    );
};

export default ProductCard;