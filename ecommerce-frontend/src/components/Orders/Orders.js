import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders } from '../../services/api';
import { setOrders } from '../../redux/ordersSlice';
import './Orders.css';

const Orders = () => {
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadOrders = async () => {
      const res = await fetchOrders();
      dispatch(setOrders(res.data));
    };
    loadOrders();
    const interval = setInterval(loadOrders, 30000);
    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div className="orders system-page">
      <h1>My Orders</h1>
      {orders.map((order) => (
        <div key={order.id} className="order-card">
          <p>Order ID: {order.id}</p>
          <p>Status: {order.status}</p>
          <p>Total: ${order.finalAmount}</p>
          <p>Address: {order.address.fullName}, {order.address.city}</p>
          <ul>
            {order.items.map((item) => (
              <li key={item.id}>{item.product.title} - Qty: {item.quantity}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Orders;