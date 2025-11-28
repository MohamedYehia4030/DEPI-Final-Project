// /src/pages/AuthCallback.jsx or /src/components/Auth/AuthCallback.jsx

import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../../../store/auth/useAuthStore';
import useAppStore from '../../../../store/auth/useAppStore';
import Loader from '../../../../components/Loader/Loader';

const AuthCallback = () => {
  const { t } = useTranslation('auth');
  const location = useLocation();
  const navigate = useNavigate();
  const setGoogleAuth = useAuthStore(state => state.setGoogleAuth); // You'll need to add this action to your useAuthStore
  const closeAuthModal = useAppStore(state => state.closeAuthModal);

  useEffect(() => {
    // 1. Parse URL parameters (query string)
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const name = params.get('name');
    const email = params.get('email');
    const error = params.get('error');

    // 2. Handle Authentication Failure
    if (error) {
      console.error("Google sign-in failed.");
      navigate('/login', { replace: true }); // Redirect to login page on failure
      return;
    }

    // 3. Handle Successful Authentication
    if (token && name && email) {
      // Structure the user object to match your local storage/store format
      const userData = { token, name, email };

      // ⬅️ CRITICAL: Call a store action to save the user data
      setGoogleAuth(userData); 
      
      closeAuthModal(); // Close the auth modal
      navigate('/', { replace: true }); // Redirect to the home page
    } else {
      // Handle missing parameters or unexpected state
      navigate('/login', { replace: true });
    }
  }, [location.search, navigate, setGoogleAuth, closeAuthModal]);

  // Render a loading state while processing the redirect
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <Loader />
      <p style={{ marginTop: '20px' }}>{t('authenticatingGoogle', 'Authenticating with Google...')}</p>
    </div>
  );
};

export default AuthCallback;