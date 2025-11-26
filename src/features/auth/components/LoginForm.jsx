// src/components/Auth/LoginForm.jsx

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import useAppStore from "../../../store/useAppStore";
import { useAuthStore } from "../../../store/useAuthStore"; // ⬅️ NEW: Import Auth Store
import Button from "../../../components/Button/Button";
import styles from "./LoginForm.module.css";
import sharedStyles from "./AuthModal.module.css";

const LoginForm = () => {
  const { t } = useTranslation("auth");
  const { openAuthModal } = useAppStore();
  
  // --- Form State ---
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState(null);
  // ------------------

  // ⬅️ NEW: Get login action and loading state from Auth Store
 const login = useAuthStore(state => state.login);
const isLoading = useAuthStore(state => state.isLoading);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null); // Clear previous errors

    // Client-side validation to prevent repeated submits and browser validation quirks
    if (!email || !password) {
      setLocalError(t('login.fillAllFields', 'Please fill in both email and password'));
      return;
    }

    if (isLoading) return; // avoid duplicate submits

    try {
      await login(email, password); // ⬅️ CALL AUTH STORE ACTION
      // The modal closing is handled inside the useAuthStore.login function
    } catch (error) {
      setLocalError(error.message || t('login.errorGeneric', 'Login failed. Please check your credentials.'));
    }
  };
  
  return (
    <form className={sharedStyles.formContainer} onSubmit={handleSubmit}>
      <h2 className={sharedStyles.title}>{t("login.title")}</h2>
      
      {/* 🎯 FIX: Removed inline style, using sharedStyles.errorMessage CSS */}
      {localError && (
        <div className={sharedStyles.errorMessage}>
          {localError}
        </div>
      )}

      <div className={sharedStyles.inputGroup}>
        <label>{t("login.emailLabel")}</label>
        <input
          type="email"
          placeholder={t("login.emailPlaceholder")}
          className={sharedStyles.input}
          value={email} // ⬅️ BIND VALUE
          onChange={(e) => setEmail(e.target.value)} // ⬅️ UPDATE STATE
          required
          disabled={isLoading} // ⬅️ DISABLE ON LOADING
        />
      </div>

      <div className={sharedStyles.inputGroup}>
        <label>{t("login.passwordLabel")}</label>
        <div className={sharedStyles.passwordWrapper}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder={t("login.passwordPlaceholder")}
            className={sharedStyles.input}
            value={password} // ⬅️ BIND VALUE
            onChange={(e) => setPassword(e.target.value)} // ⬅️ UPDATE STATE
            required
            disabled={isLoading} // ⬅️ DISABLE ON LOADING
          />
          <button
            type="button"
            className={sharedStyles.eyeBtn}
            onClick={() => setShowPassword(!showPassword)}
            disabled={isLoading} // ⬅️ DISABLE ON LOADING
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}{" "}
          </button>
        </div>
      </div>

      <div
        className={styles.forgotLink}
        onClick={() => openAuthModal("forgot-password")}
      >
        {t("login.forgotPassword")}
      </div>

      <Button variant="primary" size="large" type="submit" disabled={isLoading}>
        {isLoading ? t("login.loggingIn", "Logging In...") : t("login.loginBtn")} 
      </Button>

      <div className={sharedStyles.divider}>{t("login.or")}</div>

      {/* ... Google button and footer text remains the same ... */}
      <Button
        variant="outline"
        size="large"
        onClick={() => {
          const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";
          window.location.href = `${API_BASE}/api/auth/google`;
        }}
      ><FcGoogle /> {t("login.googleBtn")}</Button>
      <div className={sharedStyles.footerText}>
        {t("login.noAccount")}{" "}
        <span
          className={sharedStyles.link}
          onClick={() => openAuthModal("register")}
        >
          {t("login.signUp")}
        </span>
      </div>
    </form>
  );
};

export default LoginForm;