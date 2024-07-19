import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './SuspectProfile.css';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Evidence from '../Evidence/Evidence'; 
import axios from 'axios';
import FilterDropBox from '../FilterDropBox.jsx'; 
import SortDropBox from '../SortDropBox.jsx';
import { useSnackbar } from 'notistack';


const SuspectProfile = () => {
  const location = useLocation();
  const [suspect, setSuspect] = useState(location.state?.suspect);
  const [evidences, setEvidences] = useState([]);
  const [sortOrder, setSortOrder] = useState('desc'); 
  const [type, setType] = useState('all'); 
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();


  useEffect(() => {
    if (suspect) {
      fetchEvidences();
    }
  }, [suspect]);

  const fetchEvidences = async () => {
    try {
      const response = await axios.get(`https://ledems-backend.onrender.com/evidences/${suspect.id}`);
      const evidencesData = response.data;
      setEvidences(evidencesData);
    } catch (error) {
      enqueueSnackbar('Error fetching evidences', { variant: 'error' });
    }
  };

  const filteredEvidences = evidences.filter(evidence => type === 'all' || evidence.type === type);

  const sortedEvidences = [...filteredEvidences].sort((a, b) => {
    const dateA = new Date(a.date); 
    const dateB = new Date(b.date);
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  if (!suspect) {
    return <div>No suspect data available</div>;
  }

  const handleAddEvidence = async () => {
    navigate('/add-evidence', { state: { suspect } });
  };
  
  return (
    <div id="suspect-profile">
      <Link to="/home-page" className="btn-primary btn-back">
        <KeyboardBackspaceIcon />
      </Link>
      <h1>{suspect.name}</h1>
      <h2>ID: {suspect.id}</h2>
      <div id="drop-boxes">
      <FilterDropBox id="typerr" type={type} setType={setType}/>
      <SortDropBox className="drop-box" sortOrder={sortOrder} setSortOrder={setSortOrder}/>
      </div>
        <AddToPhotosIcon id="add-evidence-icon" onClick={handleAddEvidence}/>
      <div className="evidences-container">
        {sortedEvidences.length > 0 && (
          sortedEvidences.map((evidence) => (
            <Evidence key={evidence.id} evidence={evidence} />
        )))}
      </div> 
    </div>
  );
};

export default SuspectProfile;
