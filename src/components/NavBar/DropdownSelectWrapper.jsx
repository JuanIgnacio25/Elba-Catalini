import { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react"; // Importamos el hook useSession
import DropdownSelectFallback from "@/components/Fallbacks/DropdownSelectFallback";

// Carga diferida de DropdownSelect
const DropdownSelect = dynamic(
  () => import("@/components/NavBar/DropdownSelect"),
  { ssr: false, loading: () => <DropdownSelectFallback /> }
);

const DropdownSelectWrapper = () => {
  const { data: session, status } = useSession(); // Estado de la sesión
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Aquí verificamos si la sesión ya está cargada
    if (status !== "loading") {
      setIsLoading(false); // Cuando ya no está en loading, actualizamos el estado
    }
  }, [status]); // Se ejecuta cuando el estado cambia

  // Si estamos en estado "loading", mostramos el fallback
  if (isLoading || status === "loading") {
    return <DropdownSelectFallback />;
  }

  return (
    <Suspense fallback={<DropdownSelectFallback />}>
      <DropdownSelect />
    </Suspense>
  );
};

export default DropdownSelectWrapper;