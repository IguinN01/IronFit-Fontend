import React from 'react';
import { useContext } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";

import { ArrowLeft } from "lucide-react";

import FormularioAutenticacao from '../components/FormularioAutenticacao';
import { AuthContext } from '../context/AuthContext';

import "../css/pages/CadastroLogin/cadastro_login.css";

const Cadastro = () => {
  const { loginComGoogle } = useContext(AuthContext);
  const location = useLocation();
  const emailGoogle = location.state?.email || "";
  const nomeGoogle = location.state?.nome || "";
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleGoogleLogin = async () => {
    const resultado = await loginComGoogle();

    if (resultado.sucesso) {
      alert("Login com Google realizado com sucesso!");
      navigate(-1);
    } else {
      alert("Erro ao autenticar com Google");
    }
  };

  const tratarCadastro = async (dadosFormulario) => {
    const { nome, email, senha, confirmacaoSenha } = dadosFormulario;

    try {
      const resposta = await fetch('https://ironfit-backend.onrender.com/cadastro', {
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
        login(dados.token);
        navigate(-1);
        return dados;
      } else {
        const erroDados = await resposta.json();
        alert(erroDados.error || 'Erro ao cadastrar');
        return null;
      }
    } catch (erro) {
      alert('Erro ao tentar se comunicar com o servidor');
      return null;
    }
  };

  return (
    <main>
      <div className='formulario'>
        <div className='titulos-botao'>
          <div className='titulos-cadastro'>
            <h2>Crie uma <b>Conta</b></h2>
            <p>Por favor preencha todos os campos abaixo:</p>
          </div>

          <button className='voltar_cadastro' type="button" onClick={() => navigate(-1)}>
            <ArrowLeft size={24} />
          </button>
        </div>

        <FormularioAutenticacao aoEnviar={tratarCadastro} ehCadastro={true} emailGoogle={emailGoogle} nomeGoogle={nomeGoogle} />
        <button onClick={handleGoogleLogin}>Cadastrar com Google</button>
        <Link to="/login">
          <p>Já tem uma conta? Faça Login</p>
        </Link>
      </div>
    </main>
  );
};

export default Cadastro;