import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

type NavbarProps = {
  isAuthenticated: boolean;
  onLogout: () => void;
};

function Navbar({ isAuthenticated, onLogout }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const transitionEffect =
    'hover:text-amber-200 transition-colors duration-400';

  // Reset menu state when resizing above md breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2, when: 'afterChildren' },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
  };

  const closeMenu = () => setIsOpen(false);

  const handleLogoutClick = () => {
    onLogout();
    closeMenu();
    navigate('/'); // optional: send them home after logout
  };

  const baseLinks = [
    { to: '/about', label: 'About' },
    { to: '/service', label: 'Service' },
    { to: '/project', label: 'Project' },
    { to: '/education', label: 'Education' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header>
      <div className="flex justify-between items-center px-6 py-4 bg-[#71C9CE] text-white w-screen fixed top-0 h-20 z-50 shadow-lg">
        <Link to="/" className="text-2xl font-bold">
          <img
            src="/logo.svg"
            alt="Logo"
            className="p-1 h-12 w-12 object-cover"
          />
        </Link>

        {/* Hamburger Button */}
        <button
          className="md:hidden hover:cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FontAwesomeIcon
            icon={faBars}
            className={`text-2xl transition-colors duration-400 ${
              isOpen ? 'text-amber-200' : 'text-white hover:text-amber-200'
            }`}
          />
        </button>

        {/* Animated Dropdown Menu (Mobile) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden absolute top-20 left-0 w-full bg-[#71C9CE] flex flex-col items-center text-gray-50 z-40 shadow-lg"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {baseLinks.map((link) => (
                <motion.div key={link.to} variants={itemVariants}>
                  <Link
                    to={link.to}
                    className={`block p-4 ${transitionEffect}`}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Auth section (mobile) */}
              <motion.div variants={itemVariants}>
                <Link
                  to="/admin"
                  className={`block p-4 ${transitionEffect}`}
                  onClick={closeMenu}
                >
                  {isAuthenticated ? 'Admin' : 'Login'}
                </Link>
              </motion.div>

              {isAuthenticated && (
                <motion.div variants={itemVariants}>
                  <button
                    type="button"
                    className="block p-4 w-full text-center hover:text-amber-200 transition-colors duration-400"
                    onClick={handleLogoutClick}
                  >
                    Logout
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop Navbar */}
        <nav className="hidden md:flex items-center text-gray-50">
          {baseLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`p-4 ${transitionEffect}`}
            >
              {link.label}
            </Link>
          ))}

          {/* Auth section (desktop) */}
          <Link to="/admin" className={`p-4 ${transitionEffect}`}>
            {isAuthenticated ? 'Admin' : 'Login'}
          </Link>

          {isAuthenticated && (
            <button
              type="button"
              className={`ml-2 px-3 py-1 rounded-md border border-white/70 text-sm ${transitionEffect}`}
              onClick={handleLogoutClick}
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
