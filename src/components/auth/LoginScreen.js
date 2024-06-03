// Importa React y el hook useForm desde el archivo de hooks
import React from 'react';
import useForm from '../../hooks/useForm';

// Importa el hook useDispatch de react-redux y acciones de autenticación
import { useDispatch } from 'react-redux';
import { empezarLogin, empezarRegistro } from '../../actions/auth';

// Importa la librería SweetAlert2 para mostrar mensajes modales atractivos
import Swal from 'sweetalert2';

// Componente funcional para la pantalla de inicio de sesión y registro
export const LoginScreen = () => {
  // Obtiene el despachador de acciones de Redux
  const dispatch = useDispatch();

  // Define el estado inicial y funciones de control para los formularios de inicio de sesión y registro
  const [formLoginValues, handleLoginInputChange] = useForm({
    lEmail: 'julian@gmail.com',
    lPassword:'123456'
  });

  const [formRegistroValues, handleRegistroInputChange] = useForm({
    nNombre: 'Julian',
    rEmail: 'julian@gmail.com',
    rPassword1:'123456',
    rPassword2:'123456',
  });

  // Extrae los valores del estado para los formularios de inicio de sesión y registro
  const { lEmail, lPassword } = formLoginValues;
  const { rNombre, rEmail, rPassword1, rPassword2 } = formRegistroValues;

  // Manejador de inicio de sesión
  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Manejador de inicio de sesión ejecutado');
    // Despacha la acción de inicio de sesión con los datos del formulario
    dispatch(empezarLogin(lEmail, lPassword));
  };

  // Manejador de registro
  const handleRegistro = (e) => {
    e.preventDefault();
    // Verifica que las contraseñas coincidan antes de realizar el registro
    if (rPassword1 !== rPassword2) {
      return Swal.fire('Error', 'Las contraseñas deben ser iguales', 'error');
    }
    // Despacha la acción de registro con los datos del formulario
    dispatch(empezarRegistro(rEmail, rPassword1, rNombre));
  };

  // Renderiza el formulario de inicio de sesión y registro
  return (
    <div className="container login-container">
      <div className="row">
        {/* Formulario de inicio de sesión */}
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={handleLogin}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                name='lEmail'
                value={lEmail}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name='lPassword'
                value={lPassword}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group ">
              <input
                type="submit"
                className="btnSubmit"
                value="Login"
              />
            </div>
          </form>
        </div>

        {/* Formulario de registro */}
        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={handleRegistro}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name='rNombre'
                value={rNombre}
                onChange={handleRegistroInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name='rEmail'
                value={rEmail}
                onChange={handleRegistroInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name='rPassword1'
                value={rPassword1}
                onChange={handleRegistroInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                name='rPassword2'
                value={rPassword2}
                onChange={handleRegistroInputChange}
              />
            </div>

            <div className="form-group ">
              <input
                type="submit"
                className="btnSubmit"
                value="Crear cuenta"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Exporta el componente por defecto
export default LoginScreen;
