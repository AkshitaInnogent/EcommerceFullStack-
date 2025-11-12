import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import './Header.css';
import { IoHomeOutline } from 'react-icons/io5';
import { FaShoppingCart, FaRegUserCircle, FaBell } from "react-icons/fa";

const Header = () => {
  const cartItems = useSelector((state) => state.cart);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const [showProfile, setShowProfile] = useState(false);
  const [notifications, setNotifications] = useState(3); // example count

  return (
    <header className="header">
      <div className="logo">
        <Link to="/"><IoHomeOutline size={28} /></Link>
      </div>

      <div className="title">
        <h1>LuxKart</h1>
      </div>

      <div className="icons">
        <Link to="/cart" className="cart-icon">
          <FaShoppingCart size={25} />
          {cartCount > 0 && <span className="badge">{cartCount}</span>}
        </Link>

        <div className="notification-icon">
          <FaBell size={24} />
        </div>

        <button className="profile-btn" onClick={() => setShowProfile(!showProfile)}>
          <FaRegUserCircle size={25} />
        </button>

        {showProfile && <ProfileMenu />}
      </div>
    </header>
  );
};

export default Header;
