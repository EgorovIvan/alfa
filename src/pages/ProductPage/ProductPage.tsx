import {FC, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import useProductStore from '../../store/productStore';
import './ProductPage.scss';
import {Product} from "../../api/apiProduct.ts";

const ProductPage: FC = () => {
    const {id} = useParams<{ id: string }>();
    const {getProductById} = useProductStore();
    const [product, setProduct] = useState<Product | null>(null);
    const navigate = useNavigate();

    /** Обработчик возврата в Каталог */
    const handleBack = () => {
        navigate('/catalog');
    }

    useEffect(() => {
        if (id) {
            const fetchedProduct = getProductById(parseInt(id));
            setProduct(fetchedProduct || null);
        }
    }, [id, getProductById]);

    if (!product) {
        return <div className="product">Product not found</div>;
    }

    return (
        <div className="product">
            <div className="container">
                <div className="product__container">
                    <div className="product__image-wrapper">
                        <img src={product.images[0]} alt={product.title} className="product__image"/>
                    </div>
                    <div className="product__details">
                        <h1 className="product__title">{product.title}</h1>
                        <p className="product__price">${product.price.toFixed(2)}</p>
                        <p className="product__description">{product.description}</p>
                        <button className="product__button">Add to Cart</button>
                    </div>
                </div>

                <button
                    className="product__back-button"
                    onClick={handleBack}
                >
                    ← Назад в каталог
                </button>
            </div>
        </div>
    );
};

export default ProductPage;
