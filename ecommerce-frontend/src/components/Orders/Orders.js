import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders, cancelOrder } from '../../services/api';
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

  const handleCancel = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;
    try {
      await cancelOrder(orderId);
      const updatedOrders = await fetchOrders();
      dispatch(setOrders(updatedOrders.data));
    } catch (error) {
      console.error('Cancel failed:', error.response?.data || error);
      alert('Failed to cancel order. Please try again.');
    }
  };

  return (
    <div className="orders system-page">
      <h1>My Orders</h1>
      {orders.length === 0 ? (
        <p className="no-orders">No orders found.</p>
      ) : (
        [...orders]
          .sort((a, b) => {
            const orderPriority = { pending: 1, delivered: 2, cancelled: 3 };
            return (
              (orderPriority[a.status.toLowerCase()] || 99) -
              (orderPriority[b.status.toLowerCase()] || 99)
            );
          })
          .map((order) => (
            <div
              key={order.id}
              className={`order-card ${order.status.toLowerCase()}`}
            >
              <div className="order-header">
                <h3>Order #{order.id}</h3>
                <span className={`status ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </div>

              <p><strong>Total:</strong> ₹{order.finalAmount}</p>
              <p><strong>Address:</strong> {order.address.fullName}, {order.address.city}</p>

              <ul className="order-items">
                {order.items.map((item) => (
                  <li key={item.id}>
                    <span>{item.product.title}</span> — Qty: {item.quantity}
                  </li>
                ))}
              </ul>

              {order.status.toLowerCase() === 'pending' && (
                <div className="order-footer">
                  <button
                    className="cancel-btn"
                    onClick={() => handleCancel(order.id)}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          ))
      )}
    </div>
  );
};

export default Orders;
