import './Navbar.css';
import { Link } from 'react-router-dom';
import logo from '../../../assets/icons/logo.jpg';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src={logo} alt="Voyago" className="w-100" />
      </div>
      <div className="navbar-nav">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </nav>
  );
};

export default Navbar;

