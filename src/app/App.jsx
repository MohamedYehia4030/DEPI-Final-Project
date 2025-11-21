import React from 'react';
import Navbar from '../layout/Navbar/Navbar';
import Footer from '../layout/Footer/Footer';
import AppRoutes from './routes';
import './App.css';
import AuthModal from '../features/auth/components/AuthModal';
import Testimonials from '../features/reviews/Testimonials/Testimonials';

function App() {
  return (
    <>
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