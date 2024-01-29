import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface LoginStatusContextType {
  isLoggedIn: boolean;
  handleLogin: () => void;
  handleLogout: () => void;
}

const LoginStatusContext = createContext<LoginStatusContextType | undefined>(undefined);

interface LoginStatusProviderProps {
  children: ReactNode;
}

const LoginStatusProvider: React.FC<LoginStatusProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in when the component mounts
    checkLoginStatus();
  }, []);

  const checkLoginStatus = () => {
    const userLoggedIn = Cookies.get('userLoggedIn') === 'true';

    if (userLoggedIn) {
      // User is logged in
      setIsLoggedIn(true);
    } else {
      // User is not logged in
      setIsLoggedIn(false);
    }
  };

  const handleLogin = () => {
    // Perform login logic (e.g., API request, authentication)
    // Once the user is successfully logged in, set the flag in a cookie with an expiration date
    Cookies.set('userLoggedIn', 'true'); // Expires in 7 days
    checkLoginStatus(); // Update login status
  };

  const handleLogout = () => {
    // Perform logout logic (e.g., API request, session cleanup)
    // Clear the cookie upon logout
    Cookies.remove('userLoggedIn');
    checkLoginStatus(); // Update login status
  };

  const contextValue: LoginStatusContextType = {
    isLoggedIn,
    handleLogin,
    handleLogout,
  };

  return (
    <LoginStatusContext.Provider value={contextValue}>
      {children}
    </LoginStatusContext.Provider>
  );
};

const useLoginStatus = (): LoginStatusContextType => {
  const context = useContext(LoginStatusContext);

  if (!context) {
    throw new Error('useLoginStatus must be used within a LoginStatusProvider');
  }

  return context;
};

export { LoginStatusProvider, useLoginStatus };
