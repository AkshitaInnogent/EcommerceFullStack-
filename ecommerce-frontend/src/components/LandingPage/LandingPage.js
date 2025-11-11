import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts, fetchProductsByCategory } from '../../services/api';
import ProductCard from '../ProductCard/ProductCard';
import './LandingPage.css';


const LandingPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchProducts().then((res) => {
      setProducts(res.data);
      setCategories([...new Set(res.data.map((p) => p.category))]);
    });
  }, []);

  const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) &&
      (selectedCategory === '' || p.category === selectedCategory)
  );

  return (
    <div className="landing-page system-page">
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <div className="products-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default LandingPage;