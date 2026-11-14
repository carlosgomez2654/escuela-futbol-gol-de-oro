import { Route, Routes } from 'react-router';
import { LayoutPublico } from './layouts/LayoutPublico';
import { ScrollAlInicio } from './components/ScrollAlInicio';
import { Inicio } from './pages/Inicio';
import { NoEncontrada } from './pages/NoEncontrada';
import { Horarios } from './components/horarios/horarios';
import { Precios } from './components/precios/precios';
import { Inscripcion } from './components/inscripcion/inscripcion';
import AdminDashboard from './components/admin/adminDashboard';
import ProfesoresDashboard from './components/profesores/profesoresDashboard';
import PadresDashboard from './components/padres/padresDashboard';
import JugadoresDashboard from './components/jugadores/jugadoresDashboard';
import { Login } from './pages/login/Login';
import { RutaProtegida } from './auth/RutaProtegida';

import './App.css';

function App() {
  return (
    <>
      <ScrollAlInicio />

      <Routes>
        {/* Páginas públicas: todas comparten Navbar y Footer */}
        <Route element={<LayoutPublico />}>
          <Route path="/" element={<Inicio />} />
          <Route path="/horarios" element={<Horarios />} />
          <Route path="/precios" element={<Precios />} />
          <Route path="/inscripcion" element={<Inscripcion />} />
          <Route path="/login" element={<Login />} />
        </Route>

        
        <Route element={<RutaProtegida rolesPermitidos={['admin']} />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
        <Route element={<RutaProtegida rolesPermitidos={['profesor']} />}>
          <Route path="/profesor" element={<ProfesoresDashboard />} />
        </Route>
        <Route element={<RutaProtegida rolesPermitidos={['padre']} />}>
          <Route path="/padre" element={<PadresDashboard />} />
        </Route>
        <Route element={<RutaProtegida rolesPermitidos={['jugador']} />}>
          <Route path="/jugador" element={<JugadoresDashboard />} />
        </Route>

        {/* Cualquier otra dirección */}
        <Route path="*" element={<NoEncontrada />} />
      </Routes>
    </>
  );
}

export default App;