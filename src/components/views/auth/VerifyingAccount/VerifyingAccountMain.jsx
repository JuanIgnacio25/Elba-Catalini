
function VerifyingAccountMain({email}) {
  
  const decodedEmail = decodeURIComponent(email);

  return (
    <div className="verifying-account-main-container">
      <h3>Enviamos un link de verificacion temporal a <span>{decodedEmail}</span></h3>
      <p>{"Si no encuentra el mail revise la casilla de 'Spam'"}</p>
    </div>
  )
}

export default VerifyingAccountMain