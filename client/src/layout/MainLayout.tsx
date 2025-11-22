import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

type MainLayoutProps = {
  isAuthenticated: boolean;
  onLogout: () => void;
};

function MainLayout({ isAuthenticated, onLogout }: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isAuthenticated={isAuthenticated} onLogout={onLogout} />
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
