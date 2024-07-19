import React, { useState, useEffect } from 'react';
import './AddEvidence/AddEvidence.css';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../assets/firebase';
import { v4 } from 'uuid';
import TypeDropBox from './TypeDropBox';
import loader from '../assets/images/loader.gif';

const EditEvidence = () => {
  const location = useLocation();
  const [evidence, setEvidence] = useState(location.state?.evidence);
  const [type, setType] = useState(evidence.type);
  const [description, setDescription] = useState(evidence.description);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [imageUpload, setImageUpload] = useState(null);
  const [fileName, setFileName] = useState(evidence.file_name);
  const [fileUrl, setFileUrl] = useState(evidence.file_url);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (evidence) {
      setType(evidence.type);
      setDescription(evidence.description);
    }
  }, [evidence]);

  const uploadFile = async () => {
    if (imageUpload == null) return fileUrl;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    const snapshot = await uploadBytes(imageRef, imageUpload);
    const url = await getDownloadURL(snapshot.ref);
    setFileUrl(url);
    return url;
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const url = await uploadFile();
    const formData = {
      type,
      description,
      fileName,
      fileUrl: url,
    };

    try {
      const response = await axios.put(
        `https://ledems-backend.onrender.com/evidences/${evidence.id}`,
        formData
      );
      enqueueSnackbar('Evidence updated successfully', { variant: 'success' });
      setLoading(false);
      navigate(-1);
    } catch (error) {
      if (error.response && error.response.data) {
        enqueueSnackbar(error.response.data.error, { variant: 'error' });
      } else {
        enqueueSnackbar('Error updating evidence', { variant: 'error' });
      }
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const changedFile = e.target.files[0];
    setFile(changedFile);
    setImageUpload(changedFile);
    setFileName(changedFile.name);
  };

  return (
    <div id='add-evidence'>
      <button className='btn-primary btn-back' onClick={() => navigate(-1)}>
        <KeyboardBackspaceIcon />
      </button>
      <div id='add-evidence-box'>
        <h1>Edit evidence</h1>
        <form onSubmit={handleSubmit}>
          <TypeDropBox type={type} setType={setType} />
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
              Change file
            </label>
            <span className='file-name'>{fileName}</span>
          </div>
          <button type='submit' className='btn-primary'>
            Submit
          </button>
        </form>
      </div>
      {loading && <img src={loader} id='loader' />}
    </div>
  );
};

export default EditEvidence;
