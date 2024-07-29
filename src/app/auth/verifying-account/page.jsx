"use client";

import { useState, useEffect } from 'react';

function VerifyingAccountPage() {
  const [timeLeft, setTimeLeft] = useState(3599); // 3600 seconds = 1 hour

  useEffect(() => {
    // Si el tiempo ha llegado a 0, no hacemos nada
    if (timeLeft === 0) return;

    // Establecemos un intervalo que decrementa el tiempo cada segundo
    const intervalId = setInterval(() => {
      setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
    }, 1000);

    // Limpiamos el intervalo cuando el componente se desmonta o el tiempo cambia
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  // Convertimos el tiempo restante en horas, minutos y segundos
  const formatTime = (seconds) => {
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <p>Un link de verificación ha sido enviado a tu email.</p>
      <p>El link expirará en: {formatTime(timeLeft)}</p>
    </div>
  );
}

export default VerifyingAccountPage;