import React from 'react';
import Navbar from '../layout/Navbar/Navbar';
import Footer from '../layout/Footer/Footer';
import AppRoutes from './routes';
import './App.css';
import AuthModal from '../features/auth/components/AuthModal';
import { Toaster } from 'sonner';
import Booking from "../components/Booking";

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