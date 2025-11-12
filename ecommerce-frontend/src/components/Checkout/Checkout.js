import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkoutOrder } from '../../services/api';
import { clearCart } from '../../redux/cartSlice';
import { addOrder } from '../../redux/ordersSlice';
import './Checkout.css';

const Checkout = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: '',
    phoneNumber: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

  const [promoCode, setPromoCode] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderItems = cart.map(item => ({
      productId: item.backendId || item.id,
      quantity: item.quantity
    }));

    const orderData = {
      items: orderItems,
      address,
      promoCode
    };

    try {
      const res = await checkoutOrder(orderData);
      dispatch(addOrder(res.data));
      dispatch(clearCart());
      navigate('/orders');
    } catch (error) {
      console.error('Checkout failed:', error.response?.data || error);
      alert('Checkout failed: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Checkout</h1>
      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="form-section">
          <h2>Shipping Address</h2>
          <div className="input-grid">
            <input type="text" placeholder="Full Name" required onChange={(e) => setAddress({ ...address, fullName: e.target.value })} />
            <input type="text" placeholder="Phone Number" required onChange={(e) => setAddress({ ...address, phoneNumber: e.target.value })} />
          </div>

          <input type="text" placeholder="Address Line 1" required onChange={(e) => setAddress({ ...address, addressLine1: e.target.value })} />
          <input type="text" placeholder="Address Line 2" onChange={(e) => setAddress({ ...address, addressLine2: e.target.value })} />

          <div className="input-grid">
            <input type="text" placeholder="City" required onChange={(e) => setAddress({ ...address, city: e.target.value })} />
            <input type="text" placeholder="State" required onChange={(e) => setAddress({ ...address, state: e.target.value })} />
          </div>

          <div className="input-grid">
            <input type="text" placeholder="Zip Code" required onChange={(e) => setAddress({ ...address, zipCode: e.target.value })} />
            <input type="text" placeholder="Country" required onChange={(e) => setAddress({ ...address, country: e.target.value })} />
          </div>
        </div>

        <div className="form-section">
          <h2>Promo Code</h2>
          <input type="text" placeholder="Enter promo code (optional)" onChange={(e) => setPromoCode(e.target.value)} />
        </div>

        <button type="submit" className="place-order-btn">Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;
