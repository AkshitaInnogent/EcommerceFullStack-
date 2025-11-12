import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchProductById } from '../../services/api';
import { addToCart } from '../../redux/cartSlice';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProductById(id).then((res) => setProduct(res.data));
  }, [id]);

  if (!product) return <div className="loading">Loading...</div>;

  return (
    <div className="product-details system-page">
      <div className="image-section">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="info-section">
        <h1>{product.title}</h1>
        <p className="desc">{product.description}</p>
        <p className="price">${product.price}</p>
        <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetails;
