import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import useAppStore from "../../../store/useAppStore";
import Button from "../../../components/Button/Button";
import styles from "./RegisterForm.module.css";
import sharedStyles from "./AuthModal.module.css";
import { useAuthStore } from "../../../store/useAuthStore";

const RegisterForm = () => {
  const { t } = useTranslation("auth");
  const { openAuthModal } = useAppStore();

  // --- Form State ---
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState(null);
  const [agreed, setAgreed] = useState(false);
  // ------------------

  // ⬅️ NEW: Get register action and loading state from Auth Store
  const register = useAuthStore((state) => state.register);
  const isLoading = useAuthStore((state) => state.isLoading);

  const API_URL = "Your API URL here/api/v1/auth";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);

    // Basic client-side validation
    if (!name || !email || !password) {
      setLocalError(t("register.fillAllFields", "Please fill all fields."));
      return;
    }
    try {
      await register(name, email, password); // CALL AUTH STORE ACTION
      // On success the store will close the modal. Optionally we could show a toast.
    } catch (error) {
      setLocalError(error.message || t("register.errorGeneric", "Registration failed."));
    }
  };

  return (
    <form className={sharedStyles.formContainer} onSubmit={handleSubmit}>
      <h2 className={sharedStyles.title}>{t("register.title")}</h2>

      {/* 🎯 FIX 2: Removed inline style, using sharedStyles.errorMessage CSS */}
      {localError && (
        <div className={sharedStyles.errorMessage}>{localError}</div>
      )}

      {/* Name Input - BIND VALUE/ONCHANGE */}
      <div className={sharedStyles.inputGroup}>
        <label>{t("register.nameLabel")}</label>
        <input
          type="text"
          placeholder={t("register.namePlaceholder")}
          className={sharedStyles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>

      {/* Email Input - BIND VALUE/ONCHANGE */}
      <div className={sharedStyles.inputGroup}>
        <label>{t("register.emailLabel")}</label>
        <input
          type="email"
          placeholder={t("register.emailPlaceholder")}
          className={sharedStyles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>

      {/* Password Input - BIND VALUE/ONCHANGE/DISABLE */}
      <div className={sharedStyles.inputGroup}>
        <label>{t("register.passwordLabel")}</label>
        <div className={sharedStyles.passwordWrapper}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder={t("register.passwordPlaceholder")}
            className={sharedStyles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
          <button
            type="button"
            className={sharedStyles.eyeBtn}
            onClick={() => setShowPassword(!showPassword)}
            disabled={isLoading}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}{" "}
          </button>
        </div>
      </div>

      

      {/* Terms Checkbox - BIND VALUE/ONCHANGE */}
      <div className={styles.termsWrapper}>
        <input
          type="checkbox"
          id="terms"
          className={styles.termsCheckbox}
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          required
        />
        <label htmlFor="terms" className={styles.termsText}>
          {t("register.agree")} {" "}
          <a href="/terms" className={styles.termsLink} target="_blank" rel="noreferrer">
            {t("register.terms")} {" "}
          </a>
          {t("register.and")} {" "}
          <a href="/privacy" className={styles.termsLink} target="_blank" rel="noreferrer">
            {t("register.privacy")}
          </a>
        </label>
      </div>

      {/* ... Terms and Google buttons remain the same ... */}
      <Button
        variant="primary"
        size="large"
        type="submit"
        className={sharedStyles.submitBtn}
        disabled={!agreed || isLoading} // require agreement and not loading
      >
        {isLoading ? t("register.registering", "Signing Up...") : t("register.button")}
      </Button>

      <div className={sharedStyles.divider}>{t("login.or")}</div>
      <Button
        variant="outline"
        size="large"
        type="button"
        className={sharedStyles.googleBtn}
        onClick={() => {
          const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";
          window.location.href = `${API_BASE}/api/auth/google`;
        }}
        disabled={isLoading}
      >
        <FcGoogle /> {t("register.googleBtn")}
      </Button>

      {/* ... footer text remains the same ... */}
      <div className={sharedStyles.footerText}>
        {t("register.hasAccount")}{" "}
        <span
          className={sharedStyles.link}
          onClick={() => openAuthModal("login")}
        >
          {t("register.loginLink")}
        </span>
      </div>
    </form>
  );
};
export default RegisterForm;
