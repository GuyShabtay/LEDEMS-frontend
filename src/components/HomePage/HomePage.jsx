import React from 'react';
import './HomePage.css';
import SearchBox from '../SearchBox';
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div id='home-page'>
      <div id='main-background'></div>
      <SearchBox/>
      <h1>or</h1>
      <Link to="/add-suspect" className='btn-primary'>Add a new suspect</Link>
    </div>
  );
}

export default HomePage;
