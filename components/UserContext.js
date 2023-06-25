// UserContext.js
import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    // Check if user data exists in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      // Parse the stored user data and set it as the current user
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    // Update localStorage whenever the user state changes
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const clearUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser,clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
