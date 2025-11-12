import React from 'react';
import './Profile.css';

const Profile = () => {
  return (
    <div className="profile-page">
      <div className="profile-card">
        <img src="/profilePic.png" alt="Profile" className="profile-pic" />
        <h2>Akshita Jaiswal</h2>
        <p>Email: akshitajaiswal2908@gmail.com</p>
        <p>Phone: +91 7223092908</p>
      </div>
    </div>
  );
};

export default Profile;
