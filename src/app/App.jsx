import React from 'react';
import Navbar from '../layout/Navbar/Navbar';
import Footer from '../layout/Footer/Footer';
import AppRoutes from './routes';
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