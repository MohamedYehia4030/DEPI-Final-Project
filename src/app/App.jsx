import React from 'react';
import Navbar from '../layout/Navbar/Navbar';
import Footer from '../layout/Footer/Footer';
import AppRoutes from './routes';
import './App.css';
import AuthModal from '../features/auth/components/AuthModal';
import Testimonials from '../features/reviews/Testimonials/Testimonials';
import { Toaster } from 'sonner';

function App() {
  return (
    <>
      <Toaster position="top-center" richColors />
      <AuthModal />
      <Navbar />
      <main>
        <AppRoutes />
      </main>
      <Footer />
    </>
  );
}

export default App;