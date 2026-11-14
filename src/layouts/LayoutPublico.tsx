import { Outlet } from 'react-router';
import { Navbar } from '../components/navbar/navbar';
import { Footer } from '../components/footer/footer';

// Estructura que comparten todas las páginas públicas
export function LayoutPublico() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-container">
        {/* Aquí React Router pone la página de la ruta actual */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}