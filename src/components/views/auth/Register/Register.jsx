import RegisterMain from "@/components/views/auth/Register/RegisterMain"
import "./register.css"

function Register() {
  return (
    <div className="register-container">
      <div className="register">
        <div className="register-side register-side-left"></div>
         <RegisterMain/>
        <div className="register-side register-side-right"></div>
      </div>
    </div>
  )
}

export default Register