// src/components/Navbar/UserAccountButton.jsx

import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiUser } from 'react-icons/fi';
import { useAuthStore } from '../../../../store/auth/useAuthStore';
import useAppStore from '../../../../store/auth/useAppStore';
import { Link, useNavigate } from 'react-router-dom';
import styles from './UserAccountButton.module.css';

const UserAccountButton = () => {
  const { t } = useTranslation('auth');
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const openAuthModal = useAppStore((s) => s.openAuthModal);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onDoc(e) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  const handleToggle = (e) => {
    e.stopPropagation();
    // if not logged in, open auth modal instead
    if (!user) {
      openAuthModal && openAuthModal();
      return;
    }
    setOpen((v) => !v);
  };

  const handleLogout = () => {
    logout && logout();
    setOpen(false);
    navigate('/');
  };

  const avatarContent = () => {
    if (user?.avatar) {
      return <img src={user.avatar} alt={user.name || 'avatar'} className={styles.avatarImg} />;
    }
    // Show user initial or default icon
    if (user?.name) {
      return <span className={styles.avatarInitial}>{user.name.charAt(0).toUpperCase()}</span>;
    }
    return <FiUser className={styles.avatarIcon} />;
  };

  return (
    <div className={styles.container} ref={ref}>
      <button className={styles.avatarBtn} onClick={handleToggle} aria-haspopup="true" aria-expanded={open}>
        {avatarContent()}
      </button>

      {open && user && (
        <div className={styles.dropdown} role="menu">
          <div className={styles.header}>
            <div className={styles.headerAvatar}>{avatarContent()}</div>
            <div className={styles.headerInfo}>
              <div className={styles.name}>{user.name}</div>
              <div className={styles.email}>{user.email}</div>
            </div>
          </div>

          <div className={styles.actions}>
            <Link to="/dashboard" className={styles.actionItem} onClick={() => setOpen(false)}>{t('userAccount.myTickets')}</Link>
          </div>

          <div className={styles.footer}>
            <button className={styles.logout} onClick={handleLogout}>{t('userAccount.logout')}</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAccountButton;