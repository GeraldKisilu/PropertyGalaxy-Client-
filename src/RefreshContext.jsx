// RefreshContext.jsx
import React, { createContext, useState, useContext } from 'react';

// Create a context for refresh functionality
const RefreshContext = createContext();

// Create a provider component
export const RefreshProvider = ({ children }) => {
  const [refresh, setRefresh] = useState(false);

  // Function to toggle the refresh state
  const triggerRefresh = () => setRefresh(prev => !prev);

  return (
    <RefreshContext.Provider value={{ refresh, triggerRefresh }}>
      {children}
    </RefreshContext.Provider>
  );
};

// Custom hook to use the refresh context
export const useRefresh = () => useContext(RefreshContext);
