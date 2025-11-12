import AppRoutes from './routes.jsx';
import '../styles/globals.css';
import './App.css';
import Navbar from '../features/shared/components/Navbar.jsx';

function App() {
  return (
    <div className="app">
      <Navbar />
      <AppRoutes />
    </div>
  );
}

export default App;
