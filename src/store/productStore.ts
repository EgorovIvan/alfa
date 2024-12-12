import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {fetchProducts, Product} from "../api/apiProduct.ts";

interface ProductStoreState {
    /** Список всех продуктов */
    products: Product[];
    /** Список продуктов для отображения в Каталоге */
    filteredProducts: Product[];
    /** Индикатор загрузки */
    loading: boolean;
}

interface ProductStoreActions {
    /**
     * Функция установки значения в общий стейт
     * @param products - список продукции
     */
    _setProducts: (products: Product[]) => void;
    /**
     * Функция установки значения в стейт для отображения списка продуктов в Каталоге
     * @param filteredProducts - список продукции
     */
    _setFilteredProducts: (filteredProducts: Product[]) => void;
    /**
     * Функция переключения между всей продукцией и избранной
     * @param isFavorites - флаг, указывающий, показывать ли избранное
     */
    toggleFavoritesView: (isFavorites: boolean) => void;
    /**
     * Загружает содержимое по фильтру, и устанавливает в стейт
     * @param limit -
     * @param skip -
     * @returns Найденные и установленные в стейт записи
     */
    loadProducts: (limit: number, skip: number) => Promise<void>;
    addProduct: (newProduct: Product) => void;
    searchProducts: (query: string) => void; // Поиск/фильтрация
    onAddToFavorites: (id: number) => void; // Добавление/удаление лайка
    deleteProduct: (id: number) => void; // Удаление товара
    getProductById: (id: number) => Product | undefined; // Получение продукта по id
}

const useProductStore = create<ProductStoreState & ProductStoreActions>()(
    devtools(
        persist(
            (set, get) => ({
                products: [],
                favorites: [],
                filteredProducts: [],
                loading: false,

                _setProducts: (products) => {
                    set({products});
                },

                _setFilteredProducts: (filteredProducts) => {
                    set({filteredProducts});
                },

                toggleFavoritesView: (isFavorites) => {
                    set((state) => {
                        if (isFavorites) {
                            const updatedFavorites = state.products.filter((product) => product.liked);
                            console.log('updatedFavorites', updatedFavorites.length)

                            return {
                                filteredProducts: updatedFavorites,
                            };
                        } else {
                            return {
                                filteredProducts: state.products,
                            };
                        }

                    });
                },

                loadProducts: async (limit, skip) => {
                    const {_setProducts, _setFilteredProducts} = get();
                    set({loading: true}); // Установить флаг загрузки

                    try {
                        const {products} = await fetchProducts(limit, skip);
                        if (products == null) return;

                        _setProducts(products);
                        _setFilteredProducts(products);
                    } catch (error) {
                        console.error('Error loading products:', error);
                    } finally {
                        set({loading: false}); // Сбросить флаг загрузки
                    }
                },

                addProduct: (newProduct) => {
                    set((state) => {
                        const updatedProducts = [...state.products, newProduct]

                        return {
                            products: updatedProducts,
                        };
                    });
                },

                searchProducts: (query) => {
                    const {products, filteredProducts, _setFilteredProducts} = get();

                    if (!query || query.length === 0) {
                        set({filteredProducts: products});
                        return;
                    }

                    const search = filteredProducts.filter((product) =>
                        product.title.toLowerCase().includes(query.toLowerCase()) ||
                        product.description?.toLowerCase().includes(query.toLowerCase())
                    );

                    _setFilteredProducts(search);
                },

                onAddToFavorites: (id) => {
                    set((state) => {
                        const updatedProducts = state.products.map((product) =>
                            product.id === id ? {...product, liked: !product.liked} : product
                        );

                        const updatedFilteredProducts = state.filteredProducts.map((product) =>
                            product.id === id ? {...product, liked: !product.liked} : product
                        );

                        return {
                            products: updatedProducts,
                            filteredProducts: updatedFilteredProducts,
                        };
                    });
                },

                deleteProduct: (id) => {
                    set((state) => {
                        const updatedProducts = state.products.filter((product) => product.id !== id);
                        const updatedFilteredProducts = state.filteredProducts.filter(
                            (product) => product.id !== id
                        );

                        return {
                            products: updatedProducts,
                            filteredProducts: updatedFilteredProducts,
                        };
                    });
                },

                getProductById: (id) => {
                    const {products} = get();
                    return products.find((product) => product.id === id);
                },
            }),
            {
                name: "product-store", // имя для локального хранилища
            }
        )
    )
);

export default useProductStore;
