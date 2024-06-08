import React from 'react';
import useForm from '../../hooks/useForm';
import { useDispatch } from 'react-redux';
import { empezarLogin, empezarRegistro } from '../../actions/auth';
import Swal from 'sweetalert2';


export const LoginScreen = () => {
  const dispatch = useDispatch();

  const [formLoginValues, handleLoginInputChange] = useForm({
    lEmail: 'example@gmail.com',
    lPassword: '123456'
  });

  const [formRegistroValues, handleRegistroInputChange] = useForm({
    rNombre: 'Pedro',
    rEmail: 'pedro@gmail.com',
    rPassword1: '123456',
    rPassword2: '123456',
  });

  const { lEmail, lPassword } = formLoginValues;
  const { rNombre, rEmail, rPassword1, rPassword2 } = formRegistroValues;

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(empezarLogin(lEmail, lPassword));
  };

  const handleRegistro = (e) => {
    e.preventDefault();
    if (rPassword1 !== rPassword2) {
      return Swal.fire('Error', 'Las contraseñas deben ser iguales', 'error');
    }
    dispatch(empezarRegistro(rEmail, rPassword1, rNombre));
  };

  return (
    <div className="container login-container">
      <div className="login-form-1">
        <h3>Ingreso</h3>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Correo"
              name='lEmail'
              value={lEmail}
              onChange={handleLoginInputChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Contraseña"
              name='lPassword'
              value={lPassword}
              onChange={handleLoginInputChange}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              className="btnSubmit"
              value="Entrar"
            />
          </div>
        </form>
      </div>

      <div className="login-form-2">
        <h3>Registro</h3>
        <form onSubmit={handleRegistro}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Nombre"
              name='rNombre'
              value={rNombre}
              onChange={handleRegistroInputChange}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              placeholder="Correo"
              name='rEmail'
              value={rEmail}
              onChange={handleRegistroInputChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Contraseña"
              name='rPassword1'
              value={rPassword1}
              onChange={handleRegistroInputChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Repita la contraseña"
              name='rPassword2'
              value={rPassword2}
              onChange={handleRegistroInputChange}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              className="btnSubmit"
              value="Crear cuenta"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
