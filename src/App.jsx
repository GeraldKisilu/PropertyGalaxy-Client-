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

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51PmLeaP08hlmzVcwDEzRNsjrtMFXRW5nVs7bsL1WiKo75dBm8zSwp5WT1nGuy7jUExHlkPt2EEli4QtuNKrQkL2200cSqbwlFQ');

import Payment from './Payment';
import ListingFee from './ListingFee';

import { RefreshProvider } from './RefreshContext';
import Notification from './Notification'; // Import Notification component

function App() {
  const [notification, setNotification] = useState(null); // State for notification

  const handleBoostSuccess = (city, price, image) => {
    setNotification({ city, price, image }); // Set notification with property details
  };

  const handleCloseNotification = () => {
    setNotification(null); // Close the notification
  };

  return (
    <Router>
      <Elements stripe={stripePromise}>
        <RefreshProvider>
          {notification && (
            <Notification 
              city={notification.city} 
              price={notification.price} 
              image={notification.image}
              onClose={handleCloseNotification} 
            />
          )}
          <Routes>
            <Route path="/" element={<HomePage onBoostSuccess={handleBoostSuccess} />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/agent-dashboard" element={<AgentDashboard />} />
            <Route path="/not-authorized" element={<NotAuthorized />} />
            <Route path="/login" element={<Login />} />
            <Route path="/agents" element={<Agent />} />
            <Route path="/register" element={<Register />} /> 
            <Route path="/reviews" element={<Review />} />
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
            <Route path="/payment/:feeId" element={<Payment feeId={1} />} />
            <Route path="/listingfee/:feeId" element={<ListingFee feeId={1} />} />
          </Routes>
        </RefreshProvider>
      </Elements>
    </Router>
  );
}

export default App;
