import useAppStore from '../../../app/store';
import Modal from '../../../components/Modal/Modal';
import ForgotPasswordForm from './ForgotPasswordForm';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthModal = () => {
  // 1. Listen to the store. 
  // React re-renders this component because 'isAuthModalOpen' changed to true.
  const { isAuthModalOpen, closeAuthModal, authView } = useAppStore();

  return (
    // 2. Pass the state to the Generic Shell (Modal)
    <Modal 
      isOpen={isAuthModalOpen} 
      onClose={closeAuthModal} 
    >
      {/* 3. Decide WHAT to render based on 'authView' */}
      {authView === 'login' && <LoginForm />}
      {authView === 'register' && <RegisterForm />}
      {authView === 'forgot-password' && <ForgotPasswordForm/>}
    </Modal>
  );
};

export default AuthModal;