import React from 'react';
import { useContext } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";

import { app } from "../firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import { ArrowLeft } from "lucide-react";

import FormularioAutenticacao from '../components/FormularioAutenticacao';
import { AuthContext } from '../context/AuthContext';

import "../css/pages/CadastroLogin/cadastro_login.css";

const Cadastro = () => {
  const location = useLocation();
  const emailGoogle = location.state?.email || "";
  const nomeGoogle = location.state?.nome || "";
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const auth = getAuth(app);

  const loginComGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const resultado = await signInWithPopup(auth, provider);
      const token = await resultado.user.getIdToken();
      const email = resultado.user.email;

      const resposta = await fetch("https://ironfit-backend.onrender.com/check-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const dados = await resposta.json();

      if (dados.existe) {
        login(token);
        alert("Login com Google realizado!");
        navigate("/");
      } else {
        alert("Conta não cadastrada. Redirecionando para o cadastro.");
        navigate("/register", { state: { email, nome: resultado.user.displayName } });
      }
    } catch (erro) {
      console.error("Erro no login com Google:", erro);
      alert("Erro ao autenticar com Google");
    }
  };

  const tratarCadastro = async (dadosFormulario) => {
    const { nome, email, senha, confirmacaoSenha } = dadosFormulario;

    try {
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
        return dados;
      } else {
        const erroDados = await resposta.json();
        console.log('Erro no cadastro:', erroDados);
        alert(erroDados.error || 'Erro ao cadastrar');
        return null;
      }
    } catch (erro) {
      console.error('Erro ao tentar se comunicar com o servidor:', erro);
      alert('Erro ao tentar se comunicar com o servidor');
      return null;
    }
  };

  return (
    <main>
      <div className='formulario'>
        <div className='titulos-botao'>
          <div className='titulos-cadastro'>
            <h2>Crie uma Conta</h2>
            <p>Por favor preencha todos os campos abaixo:</p>
          </div>

          <button className='voltar_cadastro' type="button" onClick={() => navigate(-1)}>
            <ArrowLeft size={24} />
          </button>
        </div>

        <FormularioAutenticacao aoEnviar={tratarCadastro} ehCadastro={true} emailGoogle={emailGoogle} nomeGoogle={nomeGoogle} />
        <button onClick={loginComGoogle}>Cadastrar com Google</button>
        <Link to="/login">
          <p>Já tem uma conta? Faça Login</p>
        </Link>
      </div>
    </main>
  );
};

export default Cadastro;