
function VerifyingAccountMain({email}) {
  
  return (
    <div className="verifying-account-main-container">
      <h3>Enviamos un link de verificacion temporal a <span>{email}</span></h3>
      <p>Si no encuentra el mail revise la casilla de 'Spam'</p>
    </div>
  )
}

export default VerifyingAccountMain