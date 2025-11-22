import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import useAppStore from "../../../app/store";
import Button from "../../../components/Button/Button";
import styles from "./LoginForm.module.css";
import sharedStyles from "./AuthModal.module.css";

const LoginForm = () => {
  const { t } = useTranslation("auth");
  const { openAuthModal } = useAppStore();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className={sharedStyles.formContainer} onSubmit={handleSubmit}>
      <h2 className={sharedStyles.title}>{t("login.title")}</h2>

      <div className={sharedStyles.inputGroup}>
        <label>{t("login.emailLabel")}</label>
        <input
          type="email"
          placeholder={t("login.emailPlaceholder")}
          className={sharedStyles.input}
          required
        />
      </div>

      <div className={sharedStyles.inputGroup}>
        <label>{t("login.passwordLabel")}</label>
        <div className={sharedStyles.passwordWrapper}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder={t("login.passwordPlaceholder")}
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

      <div
        className={styles.forgotLink}
        onClick={() => openAuthModal("forgot-password")}
      >
        {t("login.forgotPassword")}
      </div>

      <Button variant="primary" size="large" type="submit">
        {t("login.loginBtn")}
      </Button>

      <div className={sharedStyles.divider}>{t("login.or")}</div>

      <Button
        variant="outline"
        size="large"
        type="button"
        className={sharedStyles.googleBtn}
      >
        <FcGoogle size={20} /> {t("login.googleBtn")}
      </Button>

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
