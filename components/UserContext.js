// UserContext.js
import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user?.length > 0) {
      ls?.setItem("user", JSON.stringify(user));
    }
  }, [user, ls]);

  useEffect(() => {
    if (ls && ls.getItem("user")) {
      setUser(JSON.parse(ls.getItem("user")));
    }
  }, [ls]);

  const clearUser = () => {
    ls?.removeItem("user");
    setUser(null);
  };
  
  return (
    <UserContext.Provider value={{ user, setUser,clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
