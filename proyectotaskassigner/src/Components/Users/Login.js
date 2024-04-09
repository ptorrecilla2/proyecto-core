import React, { useEffect, useState } from "react";
import { login, getAuthToken } from "../../Services/AuthService";
import "../Styles/Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    login(email, password).then((handleLogin) => {
      if (handleLogin) {
        navigate("/profile");
      } else {
        alert("Error al iniciar sesi�n");
        navigate("/login");
      }
    });
  };

  return (
    <>
      <div className="b-login">
        <div className="container mt-5 mb-5 rounded shadow">
          <div className="row align-items-stretch">
            {/*imagen del login*/}
            <div className="col bg d-none d-lg-block col-md-5 col-lg-5 col-xl-6 rounded-start"></div>

            {/*formulario de login*/}
            <div className="col bg-white p-5 rounded-end">
              <h2 className="text-center fw-bold mt-5 py-5">Bienvenido</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="Email" className="form-label">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="Email"
                    aria-describedby="emailHelp"
                    value={email}
                    onChange={handleEmailChange}
                  />
                  <div id="emailHelp" className="form-text">
                    Nunca compartiremos tu correo electrónico con nadie más.
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="Password" className="form-label">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="Password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Iniciar Sesión
                  </button>
                </div>
                <div className="my-3">
                  <span>
                    ¿No tienes cuenta? <a href="#">Registrate</a>
                  </span>
                  <br />
                  <span>
                    ¿Olvidaste tu contraseña?{" "}
                    <a href="#">Recuperar contraseña</a>
                  </span>
                </div>
              </form>

              <div className="container w-100 my-5">
                <div className="row text-center">
                  <div className="col-12">Iniciar Sesión con...</div>
                  <div className="row">
                    <div className="col">
                      <button className="btn btn-outline-primary btn-sm w-100 my-1">
                        <div className="row align-items-center">
                          <div className="col-1 d-none d-md-block">
                            <i className="bi bi-facebook fs-3 text-primary"></i>
                          </div>
                          <div className="col-10 col-md-10 text-center">
                            Facebook
                          </div>
                        </div>
                      </button>
                    </div>

                    <div className="col">
                      <button className="btn btn-outline-danger btn-sm w-100 my-1">
                        <div className="row align-items-center">
                          <div className="col-1 d-none d-md-block">
                            <i className="bi bi-google fs-3 text-danger"></i>
                          </div>
                          <div className="col-12 col-md-10 text-center">
                            Google
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
