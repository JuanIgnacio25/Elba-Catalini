function LoginMain() {
  return (
    <div className="login-main-container">
      <h1 className="login-main-title">Iniciar Sesion</h1>
      <div className="login-main-data-container">
        <div className="login-main-data">
          <p>Correo Electronico</p>
          <input />
        </div>
        <div className="login-main-data"> 
          <p>Contraseña</p>
          <input />
        </div>
      </div>
      <button className="login-main-button">Iniciar Sesion</button>
    </div>
  );
}

export default LoginMain;
