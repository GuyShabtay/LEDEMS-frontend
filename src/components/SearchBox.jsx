import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import { useSnackbar } from 'notistack';
import loader from '../assets/images/loader.gif';

export default function SearchBox() {
  const [searchId, setSearchId] = useState('');
  const [suspect, setSuspect] = useState(null);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);


  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://ledems-backend.onrender.com/suspects/${searchId}`);
      setSuspect(response.data);
    } catch (error) {
      enqueueSnackbar('ID does not exist in the system', { variant: 'error' });
      setSuspect(null); 
    }
    setLoading(false);
  };

  // useEffect(() => {
  //   if (suspect) {
  //     navigate('/suspect-profile', { state: { suspect } });
  //   }
  // }, [suspect, navigate]);

  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-end', color: 'black' }}>
        <AccountCircle sx={{ color: 'black', mr: 1, my: 0.5, fontSize: 35 }} />
        <TextField 
          id="input-with-sx" 
          label="Search for a suspect by ID" 
          variant="standard" 
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          InputProps={{ style: { fontSize: 20 } }} 
          InputLabelProps={{ style: { fontSize: 20 } }} 
        />
        <button className='btn-primary' onClick={handleSearch} style={{margin:'0 0 0 15px',alignSelf: 'flex-end', padding:'5px 15px'}}><SearchIcon/></button>
      </Box>
      {loading && <img src={loader} id='loader' />}
    </Box>
  );
}
