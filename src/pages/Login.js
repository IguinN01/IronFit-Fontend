import React from 'react';
import { Link, useNavigate } from "react-router-dom";

import { ArrowLeft } from "lucide-react";

import FormularioAutenticacao from '../components/FormularioAutenticacao';

import "../css/pages/CadastroLogin/cadastro_login.css";


const Login = () => {
  const navigate = useNavigate();
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
    <main>
      <div className='formulario'>
        <div className='titulos-botao'>
          <h2>Faça Login</h2>
          <p>Seja bem-vindo novamente</p>

          <button type="button" onClick={() => navigate(-2)}>
            <ArrowLeft size={24} />
          </button>
        </div>

        <FormularioAutenticacao aoEnviar={tratarLogin} ehCadastro={false} />
        <Link to="/register">
          <p>Ainda não tem uma conta? Cadastre-se</p>
        </Link>
      </div>
    </main>
  );
};

export default Login;