import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './LoginForm.module.css';
import useAuth from './useAuth';
import validateEmail from '../../features/shared/utils/validateEmail';

const LoginForm = ({ onRegisterClick, onForgotClick }) => {
  const { t } = useTranslation('auth');
  const { login, isLoading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
      login(email, password);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>{t('login.title')}</h2>
      {/* ... form fields, buttons ... */}
      <button type="button" onClick={onRegisterClick}>{t('login.noAccount')}</button>
      <button type="button" onClick={onForgotClick}>{t('login.forgotPassword')}</button>
    </form>
  );
};

export default LoginForm;