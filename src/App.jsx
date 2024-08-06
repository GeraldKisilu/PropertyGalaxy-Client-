import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import viteLogo from '/vite.svg'
import HomePage from './HomePage'
import Agent from './Agent';
import './App.css'
import Register from './Register';
import Review from './Review';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import ConfirmEmail from './ConfirmEmail';
import PropertyList from './PropertyList';
import PropertyDetails from './PropertyDetails';
import AdminDashboard from './AdminDashboard'
import UserDashboard from './UserDashboard'
import NotAuthorized from './NotAuthorized'
import AgentApplication from './AgentApplication';
import AgentApplicationForm from './AgentApplicationForm';
import AgentDashboard from './AgentDashboard';
import ContactForm from './ContactForm';

function App() {
  return (
    <Router>
      <Routes>
       <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />

        <Route path="/agent-dashboard" element={<AgentDashboard />} />

         <Route path="/not-authorized" element={<NotAuthorized />} />
         {/* <Route path="/homepage" element={<HomePage />} /> */}
        <Route path="/agents" element={<Agent />} />
        <Route path="/register" element={<Register />} /> 
        <Route path="/reviews" element={<Review />} />
        <Route path='/' element = {<Login/>} />
        <Route path='/forgot-password' element = {<ForgotPassword/>} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/confirm-email" element={<ConfirmEmail/>} />
        <Route path="/properties" element={<PropertyList />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/agent-application" element={<AgentApplication/>} />
        <Route path="/apply-agents" element={<AgentApplicationForm/>}/>
        <Route path="/contact" element={<ContactForm />} />
        
=======
        {/* <Route path='/user-list' element = {<UserList/>}/> */}


      </Routes>
    </Router>
  );
}

export default App;
