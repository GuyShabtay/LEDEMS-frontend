import React, { useState } from 'react';
import axios from 'axios';
import './AddSuspect.css';
import { Link, useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useSnackbar } from 'notistack';
import loader from '../../assets/images/loader.gif'


const AddSuspect = () => {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const regex = /^[0-9]*$/;
    if (!regex.test(id)) {
      enqueueSnackbar('ID must contain only digits', { variant: 'error' });
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post('https://ledems-backend.onrender.com/suspects', {
        id,
        name
      });
      enqueueSnackbar('Suspect added successfully', { variant: 'success' });
      navigate('/suspect-profile', { state: { suspect: response.data } });
    } catch (error) {
      if (error.response && error.response.data) {
        enqueueSnackbar(error.response.data.error, { variant: 'error' });
      } else {
        enqueueSnackbar('Error adding a suspect', { variant: 'error' });
      }
    };
    setLoading(false);
  };

  return (
    <div id='add-suspect'>
      <Link to="/home-page" className='btn-primary btn-back'><KeyboardBackspaceIcon/></Link>
      <div id='add-suspect-box'>
        <h1>Add suspect</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Full Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="id">ID:</label>
            <input
              type="text"
              id="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
          </div>
          <button type="submit" className='btn-primary'>Submit</button>
        </form>
      </div>
      {loading && <img src={loader} id='loader' />}
    </div>
  );
}

export default AddSuspect;
