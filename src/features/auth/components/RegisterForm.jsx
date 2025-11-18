import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import useAppStore from "../../../app/store";
import Button from "../../../components/Button/Button";

import styles from "./RegisterForm.module.css"; // الخاص
import sharedStyles from "./AuthModal.module.css"; // المشترك

const RegisterForm = () => {
  const { t } = useTranslation("auth");
  const { openAuthModal } = useAppStore();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register Submitted");
  };

  return (
    <form className={styles.registerForm} onSubmit={handleSubmit}>
      <h2 className={sharedStyles.title}>{t("register.title")}</h2>

      {/* Name Input */}
      <div className={sharedStyles.inputGroup}>
        <label>{t("register.nameLabel")}</label>
        <input
          type="text"
          placeholder={t("register.namePlaceholder")}
          className={sharedStyles.input}
          required
        />
      </div>

      {/* Email Input */}
      <div className={sharedStyles.inputGroup}>
        <label>{t("register.emailLabel")}</label>
        <input
          type="email"
          placeholder={t("register.emailPlaceholder")}
          className={sharedStyles.input}
          required
        />
      </div>

      {/* Password Input */}
      <div className={sharedStyles.inputGroup}>
        <label>{t("register.passwordLabel")}</label>
        <div className={sharedStyles.passwordWrapper}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder={t("register.passwordPlaceholder")}
            className={sharedStyles.input}
            required
          />
          <button
            type="button"
            className={sharedStyles.eyeBtn}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>
      </div>

      {/* 🌟 Terms Checkbox (ستايل خاص) */}
      <div className={styles.termsWrapper}>
        <input type="checkbox" id="terms" className={styles.checkbox} required />
        <label htmlFor="terms" className={styles.termsText}>
          {t("register.agree")}{" "}
          <span className={styles.termsLink}>{t("register.terms")}</span>
        </label>
      </div>

      <Button
        variant="primary"
        size="large"
        type="submit"
        className={sharedStyles.submitBtn}
      >
        {t("register.button")}
      </Button>

      <div className={sharedStyles.divider}>{t("register.or")}</div>

      <Button
        variant="outline"
        size="large"
        type="button"
        className={sharedStyles.googleBtn}
      >
        <FcGoogle size={20} /> {t("register.googleButton")}
      </Button>

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