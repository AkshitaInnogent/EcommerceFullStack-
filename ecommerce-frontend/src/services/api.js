import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchProducts = () => api.get('/products');
export const fetchProductById = (id) => api.get(`/products/${id}`);
export const fetchProductsByCategory = (category) => api.get(`/products/category/${category}`);
export const validatePromoCode = (code) => api.post('/promo/validate', null, { params: { code } });
export const checkoutOrder = (orderData) => api.post('/orders/checkout', orderData);
export const fetchOrders = () => api.get('/orders');
export const fetchOrderById = (id) => api.get(`/orders/${id}`);
export const cancelOrder = (orderId) => api.delete(`/orders/${orderId}`);


export default api;