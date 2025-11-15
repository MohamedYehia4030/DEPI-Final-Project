import React from 'react';
import Navbar from '../features/shared/components/Navbar/Navbar';
import Footer from '../features/shared/components/Footer/Footer';
import AppRoutes from './routes';
import AuthModal from '../features/auth/AuthModal';
import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <AppRoutes />
      </main>
      <Footer />
    </>
  );
}

export default App;