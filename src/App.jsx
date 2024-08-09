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
import FavoritesPage from './FavoritesPage';
import AddPropertyForm from './AddPropertyForm';
import PropertyPhotos from './PropertyPhotos';
import ContactForm from './ContactForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/agent-dashboard" element={<AgentDashboard />} />
        <Route path="/not-authorized" element={<NotAuthorized />} />
        <Route path="/agents" element={<Agent />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reviews" element={<Review />} />
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/confirm-email" element={<ConfirmEmail />} />
        <Route path="/properties" element={<PropertyList />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/agent-application" element={<AgentApplication />} />
        <Route path="/apply-agents" element={<AgentApplicationForm />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/add-property" element={<AddPropertyForm />} />
        <Route path="/property/:id/photos" element={<PropertyPhotos />} />
        <Route path="/contact" element={<ContactForm />} />
      </Routes>
    </Router>
  );
}

export default App;
