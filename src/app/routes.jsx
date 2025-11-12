import { Routes, Route } from 'react-router-dom';

import HomePage from '../features/home/HomePage.jsx';
import LoginPage from '../features/auth/LoginPage.jsx';
import RegisterPage from '../features/auth/RegisterPage.jsx';
import DashboardPage from '../features/dashboard/DashboardPage.jsx';
import DestinationsPage from '../features/destinations/DestinationsPage.jsx';
import DestinationDetails from '../features/destinations/DestinationDetails.jsx';
import FlightsPage from '../features/flights/FlightsPage.jsx';
import HotelsPage from '../features/hotels/HotelsPage.jsx';
import HotelDetails from '../features/hotels/HotelDetails.jsx';
import PackagesPage from '../features/packages/PackagesPage.jsx';
import PackageDetails from '../features/packages/PackageDetails.jsx';
import BookingPage from '../features/bookings/BookingPage.jsx';
import BookingSummary from '../features/bookings/BookingSummary.jsx';
import ContactPage from '../features/contact/ContactPage.jsx';
import ReviewsPage from '../features/reviews/ReviewsPage.jsx';
import NotFoundPage from '../features/shared/pages/NotFoundPage.jsx';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/home" element={<HomePage />} />

    <Route path="/auth/login" element={<LoginPage />} />
    <Route path="/auth/register" element={<RegisterPage />} />

    <Route path="/dashboard/*" element={<DashboardPage />} />

    <Route path="/destinations" element={<DestinationsPage />} />
    <Route path="/destinations/:destinationId" element={<DestinationDetails />} />

    <Route path="/flights" element={<FlightsPage />} />

    <Route path="/hotels" element={<HotelsPage />} />
    <Route path="/hotels/:hotelId" element={<HotelDetails />} />

    <Route path="/packages" element={<PackagesPage />} />
    <Route path="/packages/:packageId" element={<PackageDetails />} />

    <Route path="/bookings" element={<BookingPage />} />
    <Route path="/bookings/summary" element={<BookingSummary />} />

    <Route path="/contact" element={<ContactPage />} />
    <Route path="/reviews" element={<ReviewsPage />} />

    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default AppRoutes;
