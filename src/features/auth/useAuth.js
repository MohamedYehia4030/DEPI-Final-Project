    import { useState } from 'react';
// import { authAPI } from './authAPI';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      // const userData = await authAPI.login(email, password);
      // setUser(userData);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // ... other functions like register, logout

  return { user, isLoading, error, login /*, register, logout */ };
};

export default useAuth;