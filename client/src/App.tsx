import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';

import Home from './pages/Home';
import About from './pages/About';
import Education from './pages/Education';
import Project from './pages/Project';
import Service from './pages/Service';
import Contact from './pages/Contact';
import MainLayout from './layout/MainLayout';
import PageWrapper from './utils/PageWrapper';
import Admin from './pages/Admin';
import Login from './pages/Login';

function App() {
  const location = useLocation();

  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem('admin_token'))
  );

  const handleLogin = (token: string) => {
    localStorage.setItem('admin_token', token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setIsAuthenticated(false);
  };

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          element={
            <MainLayout
              isAuthenticated={isAuthenticated}
              onLogout={handleLogout}
            />
          }
        >
          <Route
            path="/"
            element={
              <PageWrapper>
                <Home />
              </PageWrapper>
            }
          />
          <Route
            path="/about"
            element={
              <PageWrapper>
                <About />
              </PageWrapper>
            }
          />
          <Route
            path="/education"
            element={
              <PageWrapper>
                <Education />
              </PageWrapper>
            }
          />
          <Route
            path="/project"
            element={
              <PageWrapper>
                <Project />
              </PageWrapper>
            }
          />
          <Route
            path="/service"
            element={
              <PageWrapper>
                <Service />
              </PageWrapper>
            }
          />
          <Route
            path="/contact"
            element={
              <PageWrapper>
                <Contact />
              </PageWrapper>
            }
          />

          {/* Admin route: Admin if logged in, Login page if not */}
          <Route
            path="/admin"
            element={
              <PageWrapper>
                {isAuthenticated ? <Admin /> : <Login onLogin={handleLogin} />}
              </PageWrapper>
            }
          />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;
