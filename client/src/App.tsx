import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Home from './pages/Home';
import About from './pages/About';
import Education from './pages/Education';
import Project from './pages/Project';
import Service from './pages/Service';
import Contact from './pages/Contact';
import MainLayout from './layout/MainLayout';
import PageWrapper from './utils/PageWrapper.tsx';

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode='wait'>
      <Routes location={location} key={location.pathname}>
        <Route element={<MainLayout />}>
          <Route
            path='/'
            element={
              <PageWrapper>
                <Home />
              </PageWrapper>
            }
          />
          <Route
            path='/about'
            element={
              <PageWrapper>
                <About />
              </PageWrapper>
            }
          />
          <Route
            path='/education'
            element={
              <PageWrapper>
                <Education />
              </PageWrapper>
            }
          />
          <Route
            path='/project'
            element={
              <PageWrapper>
                <Project />
              </PageWrapper>
            }
          />
          <Route
            path='/service'
            element={
              <PageWrapper>
                <Service />
              </PageWrapper>
            }
          />
          <Route
            path='/contact'
            element={
              <PageWrapper>
                <Contact />
              </PageWrapper>
            }
          />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;
