import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiKey, FiMail, FiArrowLeft, FiArrowRight } from "react-icons/fi"; // أيقونات
import useAppStore from "../../../app/store";
import Button from "../../../components/Button/Button";

import styles from "./ForgotPasswordForm.module.css"; // الخاص
import sharedStyles from "./AuthModal.module.css"; // المشترك
import { dir } from "i18next";

const ForgotPasswordForm = () => {
  const { t } = useTranslation("auth");
  const { openAuthModal } = useAppStore();
  
  // State عشان نعرف إحنا بعتنا الإيميل ولا لسه
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // هنا المفروض نكلم الـ API
    console.log("Reset link sent to:", email);
    setIsSubmitted(true); // نقلب الشاشة
  };

  // --- 🌟 الحالة الثانية: تم الإرسال (Check Email) ---
  if (isSubmitted) {
    return (
      <div className={styles.forgotForm}>
        {/* أيقونة الرسالة */}
        <div className={sharedStyles.iconContainer}>
          <FiMail />
        </div>

        <h2 className={sharedStyles.title} style={{textAlign: 'center'}}>
          {t("forgot.checkEmailTitle")}
        </h2>

        <div className={styles.successContainer}>
          <p className={styles.successText}>
            {t("forgot.sentMessage")} <br/>
            <span className={styles.emailHighlight}>{email}</span>
          </p>

          <Button 
            variant="primary" 
            size="large" 
            onClick={() => window.open('mailto:')} // يفتح تطبيق الإيميل
          >
            {t("forgot.openEmailBtn")}
          </Button>

          <p className={styles.resendText}>
            {t("forgot.didntReceive")}{" "}
            <span className={sharedStyles.link} onClick={() => setIsSubmitted(false)}>
              {t("forgot.resend")}
            </span>
          </p>

          <button className={styles.backBtn} onClick={() => openAuthModal("login")}>
            ← {t("forgot.backToLogin")}
          </button>
        </div>
      </div>
    );
  }

  // --- 🌟 الحالة الأولى: فورم الإدخال ---
  return (
    <form className={styles.forgotForm} onSubmit={handleSubmit}>
      {/* أيقونة المفتاح */}
      <div className={sharedStyles.iconContainer}>
        <FiKey />
      </div>

      <h2 className={sharedStyles.title} style={{textAlign: 'center'}}>
        {t("forgot.title")}
      </h2>

      <p className={sharedStyles.subtitle}>
        {t("forgot.subtitle")}
      </p>

      <div className={sharedStyles.inputGroup}>
        <label>{t("forgot.emailLabel")}</label>
        <input
          type="email"
          placeholder={t("forgot.emailPlaceholder")}
          className={sharedStyles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <Button
        variant="primary"
        size="large"
        type="submit"
        className={sharedStyles.submitBtn}
      >
        {t("forgot.button")}
      </Button>

      <button 
        type="button" 
        className={styles.backBtn} 
        onClick={() => openAuthModal("login")}
      >
         {t("forgot.backToLogin")}
      </button>
    </form>
  );
};

export default ForgotPasswordForm;