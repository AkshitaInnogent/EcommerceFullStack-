import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart, updateQuantity } from '../../redux/cartSlice';
import { validatePromoCode } from '../../services/api';
import './Cart.css';

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [promo, setPromo] = useState('');
  const [discount, setDiscount] = useState(0);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const finalTotal = total - (total * discount / 100);

  const applyPromo = async () => {
    const res = await validatePromoCode(promo);
    if (res.data.valid) {
      setDiscount(res.data.discountPercentage);
    } else {
      alert(res.data.message);
    }
  };

  return (
    <div className="cart system-page">
      <h1>Cart</h1>
      {cart.map((item) => (
        <div key={item.id} className="cart-item">
          <img src={item.image} alt={item.title} />
          <div>
            <h3>{item.title}</h3>
            <p>${item.price}</p>
            <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}>+</button>
            <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
          </div>
        </div>
      ))}
      <div className="promo">
        <input type="text" placeholder="Promo Code" value={promo} onChange={(e) => setPromo(e.target.value)} />
        <button onClick={applyPromo}>Apply</button>
      </div>
      <p>Total: ${finalTotal.toFixed(2)}</p>
      <Link to="/checkout" className="btn">Checkout</Link>
    </div>
  );
};

export default Cart;