import React from 'react';
import { Link } from 'react-router-dom';
import './ProfileMenu.css';


const ProfileMenu = () => {
  return (
    <div className="profile-menu">
      <Link to="/profile">Profile</Link>
      <Link to="/orders">My Orders</Link>
      <button onClick={() => alert('Logged out')}>Logout</button>
    </div>
  );
};

export default ProfileMenu;