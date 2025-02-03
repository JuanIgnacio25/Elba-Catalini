import { createContext, useState, useEffect, useContext } from 'react';
import { useSession } from 'next-auth/react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { data: session, status , update} = useSession();
  const [authState, setAuthState] = useState({
    session: null,
    status: "loading"
  });

  useEffect(() => {
    if (status !== "loading") {
      setAuthState({
        session,
        status,
      });
    }
  }, [session, status]);

  const refreshToken = () => {
    update();
  }

  return (
    <AuthContext.Provider value={{ authState , refreshToken}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);