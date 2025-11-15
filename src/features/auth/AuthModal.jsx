import React, { useState } from "react";
import styles from "./AuthModal.module.css";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
// import { useAppStore } from '../../app/store'; // Example of using global state

const AuthModal = () => {
  // const { isAuthModalOpen, closeAuthModal } = useAppStore();
  const [view, setView] = useState("login"); // 'login', 'register', 'forgot'

  let content;
  if (view === "login") {
    content = (
      <LoginForm
        onRegisterClick={() => setView("register")}
        onForgotClick={() => setView("forgot")}
      />
    );
  } else if (view === "register") {
    content = <RegisterForm onLoginClick={() => setView("login")} />;
  } else {
    content = <ForgotPasswordForm onLoginClick={() => setView("login")} />;
  }

  // if (!isAuthModalOpen) return null;

  return (
    <Modal
      onClose={() => {
        /* closeAuthModal() */
      }}
    >
      {content}
    </Modal>
  );
};

export default AuthModal;
