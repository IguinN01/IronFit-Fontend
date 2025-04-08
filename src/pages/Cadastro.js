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
      const nome = resultado.user.displayName;
      const uid = resultado.user.uid;

      const resposta = await fetch("https://ironfit-backend.onrender.com/check-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const dados = await resposta.json();

      if (dados.existe) {
        login(token);
        alert("Login com Google realizado!");
        navigate(-1);
      } else {
        const novoUsuario = {
          nome,
          email,
          uid,
        };

        const respostaCadastro = await fetch("https://ironfit-backend.onrender.com/cadastro", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(novoUsuario),
        });

        if (respostaCadastro.ok) {
          await respostaCadastro.json();
          login(token);
          alert("Cadastro realizado e login efetuado com sucesso!");
          navigate(-1);
        } else {
          alert("Erro ao criar conta automaticamente.");
        }
      }
    } catch (erro) {
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
        <button onClick={loginComGoogle}>Cadastrar com Google</button>
        <Link to="/login">
          <p>Já tem uma conta? Faça Login</p>
        </Link>
      </div>
    </main>
  );
};

export default Cadastro;