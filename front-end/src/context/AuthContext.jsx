import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from sessionStorage on first render
  useEffect(() => {
    const currentUser = sessionStorage.getItem("user");
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    } else setUser(undefined);
  }, []);

  // Corrected onLogin function
  const onLogin = (userData) => {
    setUser(userData);
    sessionStorage.setItem("user", JSON.stringify(userData));
  };

  // Corrected onLogout function
  const onLogout = () => {
    setUser(null);
    sessionStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, onLogin, onLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
