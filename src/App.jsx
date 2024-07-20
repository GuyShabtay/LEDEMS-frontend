import React from 'react';
import HomePage from './components/HomePage/HomePage';
import SuspectProfile from './components/SuspectProfile/SuspectProfile';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import AddEvidence from './components/AddEvidence/AddEvidence';
import AddSuspect from './components/AddSuspect/AddSuspect';
import EditEvidence from './components/EditEvidence';
import Layout from './components/Layout';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import './App.css';

const App = () => {
  const router = createHashRouter([
    {
      path: '/',
      element: <Layout><Login /></Layout>,
    },
    {
      path: '/login',
      element: <Layout><Login /></Layout>,
    },
    {
      path: '/register',
      element: <Layout><Register /></Layout>,
    },
    {
      path: '/home-page',
      element: <Layout><HomePage /></Layout>,
    },
    {
      path: '/suspect-profile',
      element: <Layout><SuspectProfile /></Layout>,
    },
    {
      path: '/add-suspect',
      element: <Layout><AddSuspect /></Layout>,
    },
    {
      path: '/add-evidence',
      element: <Layout><AddEvidence /></Layout>,
    },
    {
      path: '/edit-evidence',
      element: <Layout><EditEvidence /></Layout>,
    },
  ]);

  return (
    <div id='app'>
      <div id='main-background'></div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
