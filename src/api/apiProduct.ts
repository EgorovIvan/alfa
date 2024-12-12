import {sendRequest} from "./axios.ts";

export interface Product {
    id: number;
    title: string;
    price: number;
    description?: string;
    category?: string;
    discountPercentage?: number;
    rating?: number;
    stock?: number;
    tags?: string[];
    brand?: string;
    sku?: string;
    weight?: number;
    dimensions?: {
        width: number;
        height: number;
        depth: number;
    };
    warrantyInformation?: string;
    shippingInformation?: string;
    availabilityStatus?: string;
    reviews?: Review[];
    returnPolicy?: string;
    minimumOrderQuantity?: number;
    meta?: {
        createdAt: string;
        updatedAt: string;
        barcode?: string;
        qrCode?: string;
    };
    thumbnail?: string;
    images: string[];
    liked: boolean; // Новое свойство
}

export interface Review {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
}

export interface PaginatedResponse<T> {
    products?: T[];
    total?: number;
    limit?: number,
    skip?: number
}

export const addLikedProperty = (products: Product[]): Product[] => {
    return products.map(product => ({
        ...product,
        liked: false, // Устанавливаем значение liked для каждого объекта
    }));
}

/** Запрос на получение списка продуктов с пагинацией */
export const fetchProducts = async (
    limit?: number,
    skip?: number
): Promise<PaginatedResponse<Product>> => {
    const url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
    const response = await sendRequest(url);
    console.log('url', url)
    console.log('response', response)
    // Добавляем поле liked для каждого продукта
    const updatedProducts = response.products.map((product: Product) => ({
        ...product,
        liked: false, // Изначальное значение liked
    }));

    return {
        ...response,
        products: updatedProducts,
    };
};

/** Запрос на получение отдельного продукта по ID */
export const fetchProductById = async (id: number): Promise<Product> => {
    const url = `https://dummyjson.com/products/${id}`;
    return await sendRequest(url);
};

/** Запрос на поиск продуктов */
export const searchProducts = async (query: string): Promise<Product[]> => {
    const url = `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`;
    return await sendRequest(url);
};
