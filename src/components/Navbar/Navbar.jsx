import React, { useState } from 'react';
import './Navbar.css';
import logo from '../../assets/images/logo.png';
import logoImage from '../../assets/images/evidence.png';

const Navbar = () => { 
  const [userName, setUserName] = useState(localStorage.getItem('userName'));

  const handleLogout = () => {
    if(userName)
    {
    localStorage.clear(); 
    setUserName(null); 
    window.location.href = '/login'; 
    }
  };

  return (
    <div id='navbar'>
      <div id='logo'>
        <img src={logoImage} alt="Logo Icon" id='logo-icon' />
        <img src={logo} alt="Logo Text" id='logo-text' />
      </div>
      {userName && <p>Hi, {userName}</p>}
      <div>
      <button className='btn-secondary' onClick={handleLogout}>Log out</button>
      </div>
    </div>
  );
}

export default Navbar;
