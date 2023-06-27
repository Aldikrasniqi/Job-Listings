import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../Store/Slice';

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const auth = useSelector((state) => state.auth.value);
  const dispatch = useDispatch();
  const useri = {
    imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  };
  const user = auth?.user;
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    // Add any additional logic for logging out (e.g., clearing localStorage, redirecting, etc.)
    navigate('/login');
  };

  return (
    <div className="App">
      <nav className="bg-slate-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex space-x-4">
              <div>
                <Link
                  to="/"
                  className="flex items-center py-5 px-2 text-white hover:text-gray-300"
                >
                  <img
                    src="https://flowbite.com/docs/images/logo.svg"
                    className="h-8 mr-3"
                    alt="FlowBite Logo"
                  />
                  <span className="font-bold text-xl">Job Listings</span>
                </Link>
              </div>

              <div className="hidden md:flex items-center space-x-1">
                <Link
                  to="/about"
                  className="py-5 px-3 text-zinc-200 hover:text-white text-base active:text-white hover:underline"
                >
                  About
                </Link>
                <Link
                  to="/docs"
                  className="py-5 px-3 text-zinc-200 hover:text-white text-base hover:underline"
                >
                  Docs
                </Link>
              </div>
            </div>

            {auth && auth.token ? (
              <div className="hidden md:flex items-center space-x-1 text-zinc-200 hover:text-white">
                <div className="relative">
                  <button
                    onClick={toggleMenu}
                    className="flex items-center focus:outline-none"
                  >
                    <img
                      className="h-8 w-8 rounded-full"
                      src={useri.imageUrl}
                      alt={useri.name}
                    />
                  </button>
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-auto bg-white rounded-md shadow-lg py-2">
                      <span className="px-4 py-2 text-sm text-gray-700 font-bold">
                        {user.email}
                      </span>

                      <hr className="my-1 border-gray-300" />
                      <span className="block px-4 py-2 text-sm text-gray-700 font-bold hover:bg-gray-100 w-full text-left">
                        <Link to="/favorites">Favorites</Link>
                      </span>
                      <button
                        onClick={handleLogout}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-1 text-zinc-200 hover:text-white">
                <Link to="/login" className="py-5 px-3">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="py-2 px-4 bg-white hover:bg-slate-700 text-slate-900 hover:text-white rounded-lg transition duration-300"
                >
                  Signup
                </Link>
              </div>
            )}

            <div className="md:hidden flex items-center text-white">
              <button
                className="mobile-menu-button"
                onClick={toggleMenu}
                aria-label="Toggle Menu"
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="mobile-menu md:hidden">
            <Link
              to="/about"
              className="block py-2 px-4 text-sm hover:bg-gray-200 text-white"
            >
              About
            </Link>
            <Link
              to="/docs"
              className="block py-2 px-4 text-sm hover:bg-gray-200 text-white"
            >
              Docs
            </Link>

            {auth && auth.token ? (
              <button
                onClick={handleLogout}
                className="block py-2 px-4 text-sm hover:bg-gray-200 text-white w-full text-left"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block py-2 px-4 text-sm hover:bg-gray-200 text-white"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block py-2 px-4 text-sm hover:bg-gray-200 text-white"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        )}
      </nav>
    </div>
  );
};

export default Header;
