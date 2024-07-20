import React, { useState } from 'react';
import './AddEvidence.css';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../assets/firebase";
import { v4 } from "uuid";
import TypeDropBox from '../TypeDropBox';
import loader from '../../assets/images/loader.gif'

const AddEvidence = () => {
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const location = useLocation();
  const [suspect, setSuspect] = useState(location.state?.suspect);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [imageUpload, setImageUpload] = useState(null);
  const [fileUrl, setFileUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadFile = async () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    const snapshot = await uploadBytes(imageRef, imageUpload);
    const url = await getDownloadURL(snapshot.ref);
    setFileUrl(url);
    return url; 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!type || !description || !file) {
      enqueueSnackbar('All fields are required', { variant: 'error' });
      return;
    }
    setLoading(true)
    const url = await uploadFile();
    const formData={suspectName:suspect.name,type,description,suspectId:suspect.id,fileName:file.name,fileUrl:url}

    try {
      const response = await axios.post('https://ledems-backend.onrender.com/evidences', formData);
      enqueueSnackbar('Evidence added successfully', { variant: 'success' });
      navigate(-1);
    } catch (error) {
      if (error.response && error.response.data) {
        enqueueSnackbar(error.response.data.error, { variant: 'error' });
      } else {
        enqueueSnackbar('Error adding evidence', { variant: 'error' });
      }
    }
    setLoading(false)
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setImageUpload(e.target.files[0]);
  };

  return (
    <div id='add-evidence'>
      <button className='btn-primary btn-back' onClick={()=>navigate(-1)}>
        <KeyboardBackspaceIcon />
      </button>
      <div id='add-evidence-box'>
        <h1>Add evidence</h1>
        <form onSubmit={handleSubmit}>
        <TypeDropBox type={type} setType={setType}/>
          <div className='form-group'>
            <label htmlFor='description'>
              Description:
            </label>
            <textarea
              id='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className='form-group' id='file-form-group'>
            <input
              type='file'
              id='file'
              onChange={handleFileChange}
            />
            <label htmlFor='file' id='file-label' className='btn-secondary'>
              Upload a file
            </label>
            {file && <span className='file-name'>{file.name}</span>}
          </div>
          <button type='submit' className='btn-primary' >
            Submit
          </button>
        </form>
      </div>
      {loading && (<img src={loader} id='loader'/>)}
    </div>
  );
};

export default AddEvidence;
