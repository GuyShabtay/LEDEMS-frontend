import React from 'react';
import Navbar from './components/Navbar/Navbar';
import HomePage from './components/HomePage/HomePage';
import SuspectProfile from './components/SuspectProfile/SuspectProfile';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import AddEvidence from './components/AddEvidence/AddEvidence';
import AddSuspect from './components/AddSuspect/AddSuspect';
import EditEvidence from './components/EditEvidence';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import './App.css';

const App=()=> {
  const router = createHashRouter( [
    {
    path: '/',
    element: <Login />
    },
    {
    path: '/login',
    element: <Login />
    },
    {
    path: '/register',
    element: <Register />
    },
    {
    path: '/home-page',
    element: <HomePage />
    },
    {
    path: '/suspect-profile',
    element: <SuspectProfile />
    },
    {
    path: '/add-suspect',
    element: <AddSuspect />
    },
    {
    path: '/add-evidence',
    element: <AddEvidence />
    },
    {
    path: '/edit-evidence',
    element: <EditEvidence />
    },
    ]);

  return (
      <div id='app'>
        <div id='main-background'></div>
        <Navbar />
        <RouterProvider router={router}/>
      </div>
  );
}

export default App;
