import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

function MainLayout() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <main className='flex-1 pt-20'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
export default MainLayout;
