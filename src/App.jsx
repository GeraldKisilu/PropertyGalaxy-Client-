import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import viteLogo from '/vite.svg'
import HomePage from './HomePage'
import Agent from './Agent';
import './App.css'
import Register from './Register';
import Review from './Review';
import Login from './login';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import ConfirmEmail from './ConfirmEmail';
import PropertyList from './PropertyList';
import PropertyDetails from './PropertyDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/agent" element={<Agent />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reviews" element={<Review />} />
        <Route path='/' element = {<Login/>} />
        <Route path='/forgot-password' element = {<ForgotPassword/>} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/confirm-email" element={<ConfirmEmail/>} />
        <Route path="/properties" element={<PropertyList />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        
      </Routes>
    </Router>
  );
}

export default App;
