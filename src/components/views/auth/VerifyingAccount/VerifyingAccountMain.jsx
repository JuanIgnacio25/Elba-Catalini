function VerifyingAccountMain({ email }) {
  const decodedEmail = email ? decodeURIComponent(email) : "tu correo"; // Evita errores si email es undefined

  return (
    <div className="flex flex-col justify-center items-center text-center w-[84%]  p-6 gap-4">
      <h3 className="text-black sm:text-base lg:text-xl font-bold">
        Enviamos un link de verificación temporal a{" "}
        <span className="text-red-600 text-base sm:text-lg lg:text-xl font-bold">
          {decodedEmail}
        </span>
      </h3>
      <p className="text-xs  sm:text-sm text-gray-700 font-bold leading-relaxed">
        Si no encuentra el mail, revise la casilla de <span className="sr-only">correo no deseado</span> <strong>Spam</strong>.
      </p>
    </div>
  );
}

export default VerifyingAccountMain;