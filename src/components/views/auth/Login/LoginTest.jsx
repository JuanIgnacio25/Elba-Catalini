import LoginMain from "@/components/views/auth/Login/LoginMain"
import "./login.css"

function LoginTest() {
  return (
    <div className="login-container">
      <div className="login">
        <div className="login-side login-side-left"></div>
        <LoginMain/>
        <div className="login-side login-side-right"></div>
      </div>
    </div>
  )
}

export default LoginTest