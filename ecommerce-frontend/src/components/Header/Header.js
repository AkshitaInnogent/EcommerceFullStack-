import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import './Header.css';

const Header = () => {
  const cartItems = useSelector((state) => state.cart);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Ecommerce</Link>
      </div>
      <div className="icons">
        <Link to="/cart" className="cart-icon">
          Cart {cartCount > 0 && <span className="badge">{cartCount}</span>}
        </Link>
        <button onClick={() => setShowProfile(!showProfile)}>Profile</button>
        {showProfile && <ProfileMenu />}
      </div>
    </header>
  );
};

export default Header;