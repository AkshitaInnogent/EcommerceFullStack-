import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.title} loading="lazy" />
      </div>

      <h3 className="product-title">{product.title}</h3>
      <p className="product-price">₹{product.price}</p>

      <div className="product-buttons">
        <Link to={`/product/${product.id}`} className="view-btn">
          View Details
        </Link>
        <button
          className="cart-btn"
          onClick={() => dispatch(addToCart(product))}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
