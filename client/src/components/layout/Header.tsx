import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import ROUTES from '../../routes/ROUTES';
import { useAuth } from '../../context/AuthContext';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  const { user, logout } = useAuth();

  const navLinks = [
    { label: 'Home', to: ROUTES.HOME },
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <NavLink to={ROUTES.HOME} className="flex items-center space-x-2" aria-label="Home">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <span className="text-xl font-bold text-gray-900">ReactApp</span>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6" aria-label="Main navigation">
            {navLinks.map(({ label, to }) => (
              <NavLink
                key={label}
                to={to}
                className={({ isActive }) =>
                  `font-medium transition-colors duration-200 ${isActive ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'}`
                }
              >
                {label}
              </NavLink>
            ))}

            {user ? (
              <>
                <NavLink to={ROUTES.PROFILE} className="text-blue-600 hover:text-blue-700 font-medium">Profile</NavLink>
                <NavLink to={ROUTES.DASHBOARD} className="text-blue-600 hover:text-blue-700 font-medium">Dashboard</NavLink>
                <button onClick={logout} className="text-red-600 hover:text-red-700 font-medium">Logout</button>
              </>
            ) : (
              <>
                <NavLink to={ROUTES.AUTH.LOGIN} className="text-blue-600 hover:text-blue-700 font-medium">Login</NavLink>
                <NavLink to={ROUTES.AUTH.REGISTER} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200">Sign Up</NavLink>
              </>
            )
            }


          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden bg-white border-t border-gray-200 px-4 py-4 space-y-3" aria-label="Mobile navigation">
            {navLinks.map(({ label, to }) => (
              <NavLink
                key={label}
                to={to}
                className="block text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </NavLink>
            ))}
            <div className="pt-2 border-t border-gray-200 space-y-2">
              <NavLink
                to={ROUTES.AUTH.LOGIN}
                className="block text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </NavLink>
              <NavLink
                to={ROUTES.AUTH.REGISTER}
                className="block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </NavLink>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
