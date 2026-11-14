import { useState } from 'react';
import { Navigate,useNavigate } from 'react-router';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputForm from '../../components/customForm/components/CustomInput';
import { esquemaLogin, type DatosLogin } from './login.model';
import { useAuth } from '../../auth/authContexto';
import { RUTA_POR_ROL, USUARIOS_PRUEBA } from '../../auth/usuariosPrueba';


import '../../components/customForm/CustomForm.css';
import './login.css';

export function Login() {
  const { control, handleSubmit, setValue, formState: { errors } } = useForm<DatosLogin>({
    resolver: zodResolver(esquemaLogin),
    defaultValues: { email: '', password: '' },
  });

  const { usuario, iniciarSesion } = useAuth();
  const navigate = useNavigate();
  const [errorLogin, setErrorLogin] = useState('');

  const onSubmit: SubmitHandler<DatosLogin> = (datos) => {
    const usuario = iniciarSesion(datos.email, datos.password);

    if (!usuario) {
      setErrorLogin('Correo o contraseña incorrectos');
      return;
    }

    // Cada rol va a su propio dashboard
    navigate(RUTA_POR_ROL[usuario.rol]);
  };

  // Llena el formulario con un usuario de prueba (solo para la demo)
  const usarUsuarioPrueba = (email: string, password: string) => {
    setValue('email', email);
    setValue('password', password);
    setErrorLogin('');
  };

  if (usuario) {
    return <Navigate to={RUTA_POR_ROL[usuario.rol]} replace />;
  }

  return (
    <div className="login-pagina">
      <div className="form-container login-tarjeta">
        <div className="form-header">
          <span className="form-subtitle">// ZONA PRIVADA</span>
          <h2>INICIAR SESIÓN</h2>
          <p className="text-muted small mb-0">Para padres, jugadores, profesores y administradores</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column gap-3" noValidate>
          <InputForm name="email" control={control} label="CORREO ELECTRÓNICO" type="email" error={errors.email} />
          <InputForm name="password" control={control} label="CONTRASEÑA" type="password" error={errors.password} />

          {errorLogin && <div className="alert alert-danger small mb-0">❌ {errorLogin}</div>}

          <button type="submit" className="btn-submit mt-2">
            ENTRAR
          </button>
        </form>

        {/* Usuarios de prueba (se quitará cuando haya backend) */}
        <div className="login-demo mt-4">
          <p className="small fw-semibold text-muted mb-2">🧪 Usuarios de prueba (haz clic para llenar):</p>
          <div className="d-flex flex-wrap gap-2">
            {USUARIOS_PRUEBA.map((u) => (
              <button
                key={u.id}
                type="button"
                className="btn btn-sm btn-outline-secondary text-capitalize"
                onClick={() => usarUsuarioPrueba(u.email, u.password)}
              >
                {u.rol}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}