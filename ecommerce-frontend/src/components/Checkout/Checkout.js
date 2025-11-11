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
    productId: item.backendId || item.id, // make sure ID exists in backend
    quantity: item.quantity
  }));

  const orderData = {
    items: orderItems,
    address,
    promoCode
  };

  console.log('Order payload:', orderData);

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
    <div className="checkout system-page">
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit}>
        <h2>Address</h2>
        <input
          type="text"
          placeholder="Full Name"
          required
          onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Phone Number"
          required
          onChange={(e) => setAddress({ ...address, phoneNumber: e.target.value })}
        />
        <input
          type="text"
          placeholder="Address Line 1"
          required
          onChange={(e) => setAddress({ ...address, addressLine1: e.target.value })}
        />
        <input
          type="text"
          placeholder="Address Line 2"
          onChange={(e) => setAddress({ ...address, addressLine2: e.target.value })}
        />
        <input
          type="text"
          placeholder="City"
          required
          onChange={(e) => setAddress({ ...address, city: e.target.value })}
        />
        <input
          type="text"
          placeholder="State"
          required
          onChange={(e) => setAddress({ ...address, state: e.target.value })}
        />
        <input
          type="text"
          placeholder="Zip Code"
          required
          onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
        />
        <input
          type="text"
          placeholder="Country"
          required
          onChange={(e) => setAddress({ ...address, country: e.target.value })}
        />
        <input
          type="text"
          placeholder="Promo Code"
          onChange={(e) => setPromoCode(e.target.value)}
        />
        <button type="submit" className="btn">Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;
