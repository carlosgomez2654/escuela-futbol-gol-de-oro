import React, { useState } from 'react';

interface ClassItem {
  id: number;
  teacherName: string;
  location: string;
  time: string;
  day: string;
  category: string;
}

export const Lugar: React.FC = () => {
  const [classes, setClasses] = useState<ClassItem[]>([
    {
      id: 1,
      teacherName: 'Prof. Carlos Gómez',
      location: 'Cancha Sintética Principal - Sede Norte',
      time: '04:00 PM - 06:00 PM',
      day: 'Lunes',
      category: 'Sub-15',
    },
  ]);

  const [teacherName, setTeacherName] = useState('');
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('');
  const [day, setDay] = useState('Lunes');
  const [category, setCategory] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacherName || !location || !time || !category) return;

    const newClass: ClassItem = {
      id: Date.now(),
      teacherName,
      location,
      time,
      day,
      category,
    };

    setClasses([...classes, newClass]);

    setTeacherName('');
    setLocation('');
    setTime('');
    setCategory('');
  };

  // Función para eliminar un horario por su ID
  const deleteClass = (id: number) => {
    setClasses(classes.filter((cls) => cls.id !== id));
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 text-success fw-bold">
        ⚽ Programación de Clases y Canchas
      </h2>

      <div className="card shadow-sm p-4 mb-5 bg-light border-0">
        <h4 className="mb-3 text-dark">Asignar Horario de Clase</h4>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold">Profesor</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ej. Prof. Carlos Gómez"
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">Categoría / Grupo</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ej. Sub-12 / Infantil"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label fw-semibold">Día de la semana</label>
              <select
                className="form-select"
                value={day}
                onChange={(e) => setDay(e.target.value)}
              >
                <option value="Lunes">Lunes</option>
                <option value="Martes">Martes</option>
                <option value="Miércoles">Miércoles</option>
                <option value="Jueves">Jueves</option>
                <option value="Viernes">Viernes</option>
                <option value="Sábado">Sábado</option>
                <option value="Domingo">Domingo</option>
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label fw-semibold">Hora de la clase</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ej. 03:00 PM - 05:00 PM"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label fw-semibold">Lugar / Sede o Cancha</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ej. Cancha 2 - Sede Central"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>

            <div className="col-12 text-end mt-4">
              <button type="submit" className="btn btn-success px-4 py-2 fw-bold">
                Guardar y Publicar Horario
              </button>
            </div>
          </div>
        </form>
      </div>

      <h3 className="mb-3 text-secondary">Horarios Asignados</h3>
      <div className="row">
        {classes.length === 0 ? (
          <p className="text-muted">No hay clases programadas por el momento.</p>
        ) : (
          classes.map((cls) => (
            <div className="col-md-4 mb-3" key={cls.id}>
              <div className="card h-100 shadow-sm border-start border-success border-4 d-flex flex-column justify-content-between">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="badge bg-success">{cls.day}</span>
                    {/* Botón de eliminar en cada tarjeta */}
                    <button
                      onClick={() => deleteClass(cls.id)}
                      className="btn btn-outline-danger btn-sm border-0"
                      title="Eliminar horario"
                    >
                      🗑️
                    </button>
                  </div>
                  <h5 className="card-title fw-bold text-dark">{cls.category}</h5>
                  <p className="card-text mb-1 text-muted">
                    <strong>Profesor:</strong> {cls.teacherName}
                  </p>
                  <p className="card-text mb-1 text-muted">
                    <strong>🕒 Hora:</strong> {cls.time}
                  </p>
                  <p className="card-text text-muted">
                    <strong>📍 Lugar:</strong> {cls.location}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};