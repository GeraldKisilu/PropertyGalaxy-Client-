import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import viteLogo from '/vite.svg'
import HomePage from './HomePage'
import Agent from './Agent';
import './App.css'
import Register from './Register';
import Review from './Review';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/agent" element={<Agent />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reviews" element={<Review />} />
      </Routes>
    </Router>
  );
}

export default App;
