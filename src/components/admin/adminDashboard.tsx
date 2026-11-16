import { useState } from 'react';
import AdminHome from './components/home/adminHome';
import AdminInscripciones from './components/inscripciones/adminInscripciones';
import Categorias from '../compartidos/categorias/categorias';
import AdminUsuarios from './components/usuarios/usuarios';
import AdminPagos from './components/pagos/adminPagos';
import { MenuDashboard, type OpcionMenu } from '../compartidos/menuDashboard/MenuDashboard';
import type { AdminSection } from '../../Types/adminTypes';

const opciones: OpcionMenu<AdminSection>[] = [
  { seccion: 'home', texto: '📊 Resumen' },
  { seccion: 'inscripciones', texto: '📥 Inscripciones' },
  { seccion: 'categorias', texto: '📁 Categorías' },
  { seccion: 'usuarios', texto: '👥 Usuarios' },
  { seccion: 'pagos', texto: '💳 Pagos' },
  { seccion: 'configuracion', texto: '⚙️ Configuración' },
];

const AdminDashboard = () => {
  const [seccionActiva, setSeccionActiva] = useState<AdminSection>('home');

  return (
    <div>
      <MenuDashboard
        titulo="Panel Admin"
        opciones={opciones}
        seccionActiva={seccionActiva}
        onSeleccionar={setSeccionActiva}
      />

      <main>
        {seccionActiva === 'home' && <AdminHome />}
        {seccionActiva === 'inscripciones' && <AdminInscripciones />}
        {seccionActiva === 'categorias' && <Categorias  eliminarAlumno={true}/>}
        {seccionActiva === 'usuarios' && <AdminUsuarios />}
        {seccionActiva === 'pagos' && <AdminPagos />}
        {seccionActiva === 'configuracion' && <h1>Configuración</h1>}
      </main>
    </div>
  );
};

export default AdminDashboard;
