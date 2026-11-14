import { useState } from 'react';
import AdminNav from './components/AdminNav/AdminNav';
import './adminDashboard.css';
import AdminHome from './components/home/adminHome';
import type { AdminSection } from '../../Types/adminTypes';
import AdminInscripciones from './components/inscripciones/adminInscripciones';
import Categorias from '../compartidos/categorias/categorias';
import AdminUsuarios from './components/usuarios/usuarios';
import AdminPagos from './components/pagos/adminPagos';

const AdminDashboard = () => {
    const [activeSection, setActiveSection] = useState<AdminSection>('home');
    return (
        <div className="admin-dashboard-container">
            <AdminNav activeSection={activeSection} setActiveSection={setActiveSection} />
            <main className="admin-main-content">
                {activeSection === 'home' && <AdminHome />}
                {activeSection === 'inscripciones' && <AdminInscripciones />}
                {activeSection === 'categorias' && <Categorias />}
                {activeSection === 'usuarios' && <AdminUsuarios />}
                {activeSection === 'pagos' && <AdminPagos />}
                {activeSection === 'configuracion' && <h1>Configuración</h1>}
            </main>
        </div>
    );
};

export default AdminDashboard;