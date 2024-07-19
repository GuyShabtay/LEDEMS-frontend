import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import './Login.css';
import { useSnackbar } from 'notistack';

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id || !password) {
      enqueueSnackbar('All fields are required', { variant: 'error' });
      return;
    } 
      try {
        const response = await axios.post('https://ledems-backend.onrender.com/login', {
          id,
          password
        });
        sessionStorage.setItem('token', response.data.token);
        sessionStorage.setItem('userName', response.data.userName);
        enqueueSnackbar('Successfully logged in', { variant: 'success' });
        navigate('/home-page');
        window.location.reload();
      } catch (err) {
        enqueueSnackbar('Error logging in', { variant: 'error' });
      }
  };

  return (
    <div id='login'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="id">Officer ID</label>
        <input type="text" id="id" value={id} onChange={(e) => setId(e.target.value)} required />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="btn-secondary" type="submit">Submit</button>
      </form>
      <div className='account-question'>
        <span >Don't have an account?</span>
        <Link to="/register" id="register-btn">Register</Link>
      </div>
    </div>
  );
};

export default Login;
