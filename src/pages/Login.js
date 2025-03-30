import React from 'react';
import { Link } from "react-router-dom";

import FormularioAutenticacao from '../components/FormularioAutenticacao';

import "../css/pages/CadastroLogin/cadastro_login.css"; 

const Login = () => {
  const tratarLogin = async (dadosFormulario) => {
    const { email, senha } = dadosFormulario;
    const resposta = await fetch('https://ironfit-backend.onrender.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, senha }),
    });

    if (resposta.ok) {
      const dados = await resposta.json();
      localStorage.setItem('token', dados.token);
      alert('Login realizado com sucesso!');

    } else {
      const erroDados = await resposta.json();
      alert(erroDados.error || 'Erro ao fazer login');
    }
  };

  return (
    <div className='formulario'>
      <h2>Entrar</h2>
      <FormularioAutenticacao aoEnviar={tratarLogin} ehCadastro={false} />
      <Link to="/register">
        <p>CADASTRAR</p>
      </Link>
    </div>
  );
};

export default Login;