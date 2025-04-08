import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

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
    <AuthContext.Provider value={{ authToken, user, login, logout, atualizarEmailLocal }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };