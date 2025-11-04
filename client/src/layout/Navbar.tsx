import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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

  // Variants for container (stagger timing)
  const menuVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        when: 'beforeChildren',
        staggerChildren: 0.1, // adds stagger
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2, when: 'afterChildren' },
    },
  };

  // Variants for each individual link
  const itemVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <header>
      <div className='flex justify-between items-center px-6 py-4 bg-[#71C9CE] text-white w-screen fixed top-0 h-20 z-50 shadow-lg'>
        <Link to='/' className='text-2xl font-bold'>
          <img
            src='/logo.svg'
            alt='Logo'
            className='p-1 h-12 w-12 object-cover'
          />
        </Link>

        {/* Hamburger Button */}
        <button
          className='md:hidden hover:cursor-pointer'
          onClick={() => setIsOpen(!isOpen)}
        >
          <FontAwesomeIcon
            icon={faBars}
            className={`text-2xl transition-colors duration-400 ${
              isOpen ? 'text-amber-200' : 'text-white hover:text-amber-200'
            }`}
          />
        </button>

        {/* Animated Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className='md:hidden absolute top-20 left-0 w-full bg-[#71C9CE] flex flex-col items-center text-gray-50 z-40 shadow-lg'
              variants={menuVariants}
              initial='hidden'
              animate='visible'
              exit='exit'
            >
              {[
                { to: '/about', label: 'About' },
                { to: '/service', label: 'Service' },
                { to: '/project', label: 'Project' },
                { to: '/education', label: 'Education' },
                { to: '/contact', label: 'Contact' },
              ].map((link) => (
                <motion.div key={link.to} variants={itemVariants}>
                  <Link
                    to={link.to}
                    className={`block p-4 ${transitionEffect}`}
                    onClick={closeMenu} // closes menu on selection
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Normal Navbar (Desktop) */}
        <nav className='hidden md:block text-gray-50'>
          <Link to='/about' className={`p-4 ${transitionEffect}`}>
            About
          </Link>
          <Link to='/service' className={`p-4 ${transitionEffect}`}>
            Service
          </Link>
          <Link to='/project' className={`p-4 ${transitionEffect}`}>
            Project
          </Link>
          <Link to='/education' className={`p-4 ${transitionEffect}`}>
            Education
          </Link>
          <Link to='/contact' className={`p-4 ${transitionEffect}`}>
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
