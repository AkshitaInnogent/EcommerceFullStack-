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
  const [promoApplied, setPromoApplied] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const finalTotal = total - (total * discount / 100);

  const applyPromo = async () => {
    const res = await validatePromoCode(promo);
    if (res.data.valid) {
      setDiscount(res.data.discountPercentage);
      setPromoApplied(true);
    } else {
      alert(res.data.message);
      setPromoApplied(false);
      setDiscount(0);
    }
  };

  return (
    <div className="cart system-page">
      <h1>Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty 🛒</p>
      ) : (
        <>
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
            <input
              type="text"
              placeholder="Promo Code"
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
            />
            <button onClick={applyPromo}>Apply</button>
          </div>

          <div className="totals">
            {!promoApplied ? (
              <p><strong>Total:</strong> ${total.toFixed(2)}</p>
            ) : (
              <>
                <p><strong>Before Promo:</strong> ${total.toFixed(2)}</p>
                <p><strong>Discount ({discount}%):</strong> -${(total * discount / 100).toFixed(2)}</p>
                <p><strong>After Promo:</strong> ${finalTotal.toFixed(2)}</p>
              </>
            )}
          </div>

          <Link to="/checkout" className="btn">Checkout</Link>
        </>
      )}
    </div>
  );
};

export default Cart;
