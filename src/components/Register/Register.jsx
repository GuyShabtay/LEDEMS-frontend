import React, { useState,useEffect } from 'react';
import axios from 'axios';
import './Register.css';
import { Link,useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import loader from '../../assets/images/loader.gif';


const Register = () => {
  const [userName, setUserName] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();


  useEffect(() => {
    localStorage.clear();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const regex = /^[0-9]*$/;
    if (!regex.test(id)) {
      enqueueSnackbar('ID must contain only digits', { variant: 'error' });
    } else if (password !== confirmPassword) {
      enqueueSnackbar('Passwords do not match', { variant: 'error' });
    } else {
      try {
        setLoading(true);
        const response = await axios.post('https://ledems-backend.onrender.com/register', {
          userName,
          id,
          password
        });

        if (response.status === 200) {
          enqueueSnackbar('Successfully created a user', { variant: 'success' });
          navigate('/login');
        }
      } catch (error) {
        if (error.response && error.response.data) {
          enqueueSnackbar(error.response.data.error, { variant: 'error' });
        } else {
          enqueueSnackbar('Error creating a user', { variant: 'error' });
      }
    };
  };
  setLoading(false);
}

  return (
    <div id='register'>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="userName">Full Name</label>
        <input type="text" id="userName" value={userName} onChange={(e) => setUserName(e.target.value)} required/>
        <label htmlFor="id">Officer ID</label>
        <input type="text" id="id" value={id} onChange={(e) => setId(e.target.value)} required/>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
        <button className="btn-secondary" type="submit">Submit</button>
      </form>
      <div className='account-question'>
        <span>Already have an account?</span>
        <Link to="/login" id='login-btn'>Login</Link>
      </div>
      {loading && <img src={loader} id='loader' />}
    </div>
  );
};

export default Register;
