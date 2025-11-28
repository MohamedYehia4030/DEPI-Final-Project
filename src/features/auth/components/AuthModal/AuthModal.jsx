import useAppStore from "../../../../store/auth/useAppStore";
import Modal from "../../../../components/Modal/Modal";
import ForgotPasswordForm from "../ForgotPasswordForm/ForgotPasswordForm";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";

const AuthModal = () => {
  // 1. ⬅️ CRITICAL FIX: Use a selector to only subscribe to necessary state
  const isAuthModalOpen = useAppStore((state) => state.isAuthModalOpen);
  const authView = useAppStore((state) => state.authView);
  const closeAuthModal = useAppStore((state) => state.closeAuthModal);

  // 3. Conditional Rendering Logic (The internal "router")
  let ContentComponent = null;

  if (authView === "login") {
    ContentComponent = LoginForm;
  } else if (authView === "register") {
    ContentComponent = RegisterForm;
  } else if (authView === "forgot-password") {
    ContentComponent = ForgotPasswordForm;
  }

  // If modal is closed or view is invalid, render nothing
  if (!isAuthModalOpen || !ContentComponent) {
    return null;
  }

  // 4. Render the Modal wrapper and the determined content
  return (
    <Modal
      isOpen={isAuthModalOpen}
      onClose={closeAuthModal}
      // You may pass the ContentComponent itself as children
    >
      <ContentComponent />
    </Modal>
  );
};

export default AuthModal;
