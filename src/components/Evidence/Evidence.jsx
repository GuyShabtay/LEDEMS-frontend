import React,{useState,useEffect} from 'react';
import './Evidence.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteModal from '../DeleteModal/DeleteModal';
import { useSnackbar } from 'notistack';
import loader from '../../assets/images/loader.gif';

const Evidence = ({ evidence }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isDelete) {
      handleDelete();
    }
  }, [isDelete]);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`https://ledems-backend.onrender.com/evidences/${evidence.id}`);
      setIsModalOpen(false);
      window.location.reload();
    } catch (error) {
      enqueueSnackbar('Error deleting evidence:', { variant: 'error' });
    }
    setLoading(false);
  };

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEdit = () => {
    navigate('/edit-evidence', { state: { evidence } });
  };

  return (
    <div id='evidence'>
      <ul>
        <li>Upload date: {new Date(evidence.date).toLocaleDateString()}</li>
        <li>Type: {evidence.type}</li>
        <li>Description: {evidence.description}</li>
        <a href={evidence.file_url} target='_blank' rel='noopener noreferrer'>
          <button id='btn-view-file' className='btn-secondary'>
            View file
          </button>
        </a>
        </ul>
        <div id="edit-delete-buttons">
        <button onClick={handleEdit} className='btn-secondary btn-icons' id='edit-icon'>
          <EditIcon />
        </button>
        <button onClick={handleDeleteClick} className='btn-secondary btn-icons' id='delete-icon'>
          <DeleteIcon/>
        </button>
        </div>
        <DeleteModal
        show={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleDelete}
      />
      {loading && <img src={loader} id='loader' />}

    </div>
  );
};

export default Evidence;
