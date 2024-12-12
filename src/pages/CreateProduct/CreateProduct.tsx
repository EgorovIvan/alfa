import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useProductStore from '../../store/productStore';
import './CreateProduct.scss';

const CreateProduct: React.FC = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState<number | ''>('');
    const [description, setDescription] = useState('');
    const [liked, setLiked] = useState(false);

    const {addProduct} = useProductStore();
    const navigate = useNavigate();

    /** Обработчик возврата в Каталог */
    const handleCancel = () => {
        navigate('/catalog');
    }

    /** Обработчик создания карточки продукта */
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || price === '' || price <= 0) {
            alert('Please fill all required fields correctly.');
            return;
        }

        const newProduct = {
            id: Date.now(),
            title,
            price: Number(price),
            description,
            liked,
            images: []
        };

        addProduct(newProduct);
        navigate('/catalog');
    };

    return (
        <div className="create-product">
            <div className="container">
                <h1>Создание продукта</h1>
                <form onSubmit={handleSubmit} className="form">
                    <div className="form-group">
                        <label htmlFor="title">Title *</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter product title"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="price">Price *</label>
                        <input
                            type="number"
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value ? parseFloat(e.target.value) : '')}
                            placeholder="Enter product price"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter product description"
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label>
                            <input
                                className="checkbox"
                                type="checkbox"
                                checked={liked}
                                onChange={(e) => setLiked(e.target.checked)}
                            />
                            <p>Mark as Liked</p>
                        </label>
                    </div>

                    <div className="btns-wrapper">
                        <button type="submit" className="btn btn-primary">Создать</button>
                        <button type="button" className="btn" onClick={handleCancel}>Отмена</button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default CreateProduct;