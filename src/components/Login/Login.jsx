import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import './Login.css';
import { useSnackbar } from 'notistack';
import loader from '../../assets/images/loader.gif';

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const regex = /^[0-9]*$/;
    if (!regex.test(id)) {
      enqueueSnackbar('ID must contain only digits', { variant: 'error' });
      return
    }
    else if (!id || !password) {
      enqueueSnackbar('All fields are required', { variant: 'error' });
      return;
    } 
      try {
        setLoading(true);
        const response = await axios.post('https://ledems-backend.onrender.com/login', {
          id,
          password
        });
        sessionStorage.setItem('token', response.data.token);
        sessionStorage.setItem('userName', response.data.userName);
        navigate('/home-page');
        window.location.reload();
      }  catch (error) {
        if (error.response && error.response.data) {
          enqueueSnackbar(error.response.data.error, { variant: 'error' });
        } else {
          enqueueSnackbar('Error logging in', { variant: 'error' });
        }
      }
      setLoading(false);
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
      {loading && (<img src={loader} id='loader'/>)}
    </div>
  );
};

export default Login;
