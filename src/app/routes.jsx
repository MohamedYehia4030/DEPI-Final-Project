import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../features/screens/homeScreen/HomeScreen';
import AboutPage from '../features/screens/aboutScreen/AboutScreen';
import ContactPage from '../features/screens/contactScreen/ContactScreen';
import PackagesPage from '../features/screens/packageScreen/PackagesScreen';
import SearchPage from '../features/screens/searchScreen/SearchScreen';
import DashboardPage from '../features/screens/dashboardScreen/DashboardScreen';
import BookingScreen from '../features/screens/bookingScreen/BookingScreen';
import AuthPage from '../features/screens/authScreen/AuthScreen';
import NotFoundPage from '../features/screens/shared/NotFoundPage/NotFoundScreen';
import ErrorPage from '../features/screens/shared/Error/ErrorScreen';
import FAQPage from '../features/screens/shared/FAQ/FAQScreen';
import PrivacyPolicyPage from '../features/screens/shared/PrivacyPolicy/PrivacyPolicyScreen';
import TermsOfServicePage from '../features/screens/shared/TermsOfService/TermsOfServiceScreen';
import PackageDetails from '../features/packages/components/PackageDetails/PackageDetails';
import AuthCallback from '../features/auth/components/AuthCallback/AuthCallback';

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
      <Route path="/booking" element={<BookingScreen />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/privacy" element={<PrivacyPolicyPage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="/terms" element={<TermsOfServicePage />} />
      <Route path="/terms-of-service" element={<TermsOfServicePage />} />
      <Route path="/error" element={<ErrorPage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
    </Routes>
  );
};

export default AppRoutes;
