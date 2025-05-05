import React, { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import { signInWithPopup, GoogleAuthProvider, getIdToken } from 'firebase/auth';
import { auth } from '../firebase';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  const logout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
    setUser(null);
  };

  const login = async (token) => {
    try {
      localStorage.setItem('token', token);
      setAuthToken(token);

      const decoded = jwtDecode(token);
      const email = decoded.email;

      const response = await fetch(`https://ironfit-backend.onrender.com/usuarios/email/${email}`);
      const dados = await response.json();

      setUser({ id: dados.id, nome: dados.nome, email: dados.email });
    } catch (error) {
      console.error("Erro ao logar:", error);
      logout();
    }
  };

  const loginComGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const resultado = await signInWithPopup(auth, provider);
      const idToken = await getIdToken(resultado.user);

      const resposta = await fetch("https://ironfit-backend.onrender.com/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      const dados = await resposta.json();

      if (!resposta.ok || !dados.token) {
        throw new Error(dados?.mensagem || "Erro ao autenticar com Google");
      }

      await login(dados.token); 
      return { sucesso: true };
    } catch (erro) {
      console.error("Erro no login com Google:", erro);
      logout();
      return { sucesso: false, erro };
    }
  };

  const atualizarEmailLocal = (novoEmail) => {
    setUser((prev) => ({ ...prev, email: novoEmail }));
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const email = decoded.email;

        fetch(`https://ironfit-backend.onrender.com/usuarios/email/${email}`)
          .then(res => res.json())
          .then(dados => {
            setUser({ id: dados.id, nome: dados.nome, email: dados.email });
          })
          .catch(() => logout());
      } catch (erro) {
        logout();
      }
    } else {
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      authToken,
      user,
      login,
      logout,
      loginComGoogle,
      atualizarEmailLocal
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };

export const useAuth = () => useContext(AuthContext);