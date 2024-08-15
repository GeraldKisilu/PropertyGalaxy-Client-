import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import Agent from './Agent';
import './App.css';
import Register from './Register';
import Review from './ReviewForm';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import ConfirmEmail from './ConfirmEmail';
import PropertyList from './PropertyList';
import PropertyDetails from './PropertyDetails';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';
import NotAuthorized from './NotAuthorized';
import AgentApplication from './AgentApplication';
import AgentApplicationForm from './AgentApplicationForm';
import AgentDashboard from './AgentDashboard';
import AddPropertyForm from './AddPropertyForm';
import PropertyPhotos from './PropertyPhotos';
import AgentMessages from './AgentMessages';
import FavoritesPage from './FavoritesPage';
import ContactForm from './ContactForm';
import PaymentForm from './PaymentForm';
import UserPurchaseRequest from './UserPurchaseRequests';
import UserProfile from './UserProfile';
import AgentPayments from './AgentPayments';
import Payment from './Payment';
import AgentUserPayments from './AgentUserPayments';
// import ListingFee from './ListingFee';

import { RefreshProvider } from './RefreshContext';




import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ReviewList from './ReviewList';

import ReviewForm from './ReviewForm';

const stripePromise = loadStripe('pk_test_51PmLeaP08hlmzVcwDEzRNsjrtMFXRW5nVs7bsL1WiKo75dBm8zSwp5WT1nGuy7jUExHlkPt2EEli4QtuNKrQkL2200cSqbwlFQ');



function App() {
  return (
    <Router>

      <Elements stripe={stripePromise}>
        <Routes>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/agent-dashboard" element={<AgentDashboard />} />
          <Route path="/not-authorized" element={<NotAuthorized />} />
          <Route path="/agents" element={<Agent />} />
          <Route path="/register" element={<Register />} /> 
          <Route path="/reviews" element={<ReviewForm />} />
          <Route path="/" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/confirm-email" element={<ConfirmEmail />} />
          <Route path="/properties" element={<PropertyList />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/agent-application" element={<AgentApplication />} />
          <Route path="/apply-agents" element={<AgentApplicationForm />} />
          <Route path="/add-property" element={<AddPropertyForm />} />
          <Route path="/property/:id/photos" element={<PropertyPhotos />} />
          <Route path="/agent-messages" element={<AgentMessages />} />
          <Route path="/favourites-page" element={<FavoritesPage />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/payment" element={<PaymentForm />} />
          <Route path="/purchase-requests/:propertyId" element={<UserPurchaseRequest />} />
          <Route path = "/agent-payment" element = {<AgentPayments />} />
          <Route path="/user-payments/:propertyId" element={<AgentUserPayments/>} />
          {/* <Route path = "/reviews-list" element = {<Reviews />} /> */}
 
          {/* <Route path="/listingfee/:feeId" element={<ListingFee feeId={1} />} /> */}
          {/* <Route path = "/agent-payments" element = {<AgentPayments/>}/> */}
        </Routes>
      </Elements>
     


    
        


         

        
     


      



</Router>
  );
}

export default App;