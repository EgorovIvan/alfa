import React, {useEffect, useRef, useState} from 'react';
import './Catalog.scss';
import ProductCard from '../../components/UI/ProductCard/ProductCard';
import SearchBar from '../../components/UI/SearchBar/SearchBar';
import Filter from '../../components/UI/Filter/Filter';
import Navbar from "../../components/UI/Navbar/Navbar.tsx";
import useProductStore from "../../store/productStore.ts";
import {NavLink, useNavigate} from "react-router-dom";
import Pagination from "../../components/UI/Pagination/Pagination.tsx";
import Loader from "../../components/UI/Loader/Loader.tsx";

const Catalog: React.FC = () => {
    const favoritesRef = useRef<boolean>(false);
    const limit = 150;
    const {
        products,
        filteredProducts,
        loading,
        loadProducts,
        toggleFavoritesView,
        searchProducts,
        onAddToFavorites,
        deleteProduct
    } = useProductStore();
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 21;

    const totalItems = filteredProducts.length;
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    /** Обработчик перехода на страницу ProductPage */
    const handleCardClick = (id: number): void => {
        navigate(`/catalog/${id}`);
    };

    /** Обработчик поиска */
    const handleSearch = (query: string): void => {
        searchProducts(query);
    };

    /** Обработчик переключения со всех карточек к избранным */
    const handleToggleFavoritesView = (): void => {
        favoritesRef.current = !favoritesRef.current;
        toggleFavoritesView(favoritesRef.current);
    };

    /** Обработчик добавления в Избранное */
    const handleAddToFavorites = (id: number): void => {
        onAddToFavorites(id);
    };

    /** Обработчик удаления Продукта */
    const handleDeleteProduct = (id: number): void => {
        deleteProduct(id);
    };

    useEffect(() => {
        if (products != null && products.length > 0) {
            toggleFavoritesView(favoritesRef.current);
        } else {
            loadProducts(limit, 0);
        }
    }, [])
    console.log(products.length)
    return (
        <div className="catalog">
            <div className="container">
                <Navbar/>
                <div className="catalog__search">
                    <div className="catalog__search-wrapper">
                        <SearchBar onSearch={handleSearch}/>
                        <NavLink to="/create-product" className="create-link">Создать карточку</NavLink>
                    </div>

                    <Filter isFavorites={favoritesRef.current}
                            onToggleFavorites={handleToggleFavoritesView}
                    />
                </div>
                {loading ? (
                    <Loader/>
                ) : (
                    <>
                        <div className="catalog__cards">
                            {paginatedProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    title={product.title}
                                    price={product?.price}
                                    description={product?.description}
                                    image={product.images[0]}
                                    isLiked={product.liked}
                                    toggleLike={() => handleAddToFavorites(product.id)}
                                    onRemove={() => handleDeleteProduct(product.id)}
                                    onClick={() => handleCardClick(product.id)}
                                />
                            ))}
                        </div>
                    </>
                )}

                <Pagination
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    );
};

export default Catalog;
