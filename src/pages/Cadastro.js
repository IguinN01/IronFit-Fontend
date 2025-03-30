import React from 'react';
import { Link } from "react-router-dom";

import FormularioAutenticacao from '../components/FormularioAutenticacao';

import "../css/pages/CadastroLogin/cadastro_login.css";

const Cadastro = () => {
  const tratarCadastro = async (dadosFormulario) => {
    const { nome, email, senha, confirmacaoSenha } = dadosFormulario;
    const resposta = await fetch('https://ironfit-backend.onrender.com/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nome, email, senha, confirmacaoSenha }),
    });

    if (resposta.ok) {
      const dados = await resposta.json();
      localStorage.setItem('token', dados.token);
      alert('Cadastro realizado com sucesso!');
    } else {
      const erroDados = await resposta.json();
      alert(erroDados.error || 'Erro ao cadastrar');
    }
  };

  return (
    <div className='formulario'>
      <h2>Cadastrar</h2>
      <FormularioAutenticacao aoEnviar={tratarCadastro} ehCadastro={true} />
      <Link to="/login">
        <p>LOGIN</p>
      </Link>
    </div>
  );
};

export default Cadastro;