import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../features/home/HomePage';
import AboutPage from '../features/about/AboutPage';
import ContactPage from '../features/contact/ContactPage';
import PackagesPage from '../features/packages/PackagesPage';
import PackageDetails from '../features/packages/PackageDetails';
import SearchPage from '../features/search/SearchPage';
import DashboardPage from '../features/dashboard/DashboardPage';
import BookingPage from '../features/bookings/BookingPage';
import NotFoundPage from '../features/pages/NotFoundPage/NotFoundPage';
import ErrorPage from '../features/pages/Error/ErrorPage';
import FAQPage from '../features/pages/FAQ/FAQPage';
import PrivacyPolicyPage from '../features/pages/PrivacyPolicy/PrivacyPolicyPage';
import TermsOfServicePage from '../features/pages/TermsOfService/TermsOfServicePage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/packages" element={<PackagesPage />} />
      <Route path="/packages/:id" element={<PackageDetails />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/booking" element={<BookingPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="/terms-of-service" element={<TermsOfServicePage />} />
      <Route path="/error" element={<ErrorPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;