import Link from "next/link"

function LoginMainFallback() {
    return (
      <div className="login-main-container">
        <h1 className="login-main-title">Iniciar Sesion</h1>
        <div className="login-main-data-container">
          <div className="login-main-data">
            <p>Correo Electronico</p>
            <input
              placeholder="Usuario@gmail.com"
            />
          </div>
          <div className="login-main-data">
            <p>Contraseña</p>
            <input
              placeholder="********"
            />
          </div>
          <div className="login-main-forgotpassword">
            <Link href="/auth/password-recovery">¿Olvidaste la contraseña?</Link>
          </div>
        </div>
        <button className="login-main-button">Iniciar Sesion</button>
      </div>
  )
}

export default LoginMainFallback