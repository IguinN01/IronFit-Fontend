import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';

import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { app } from "../firebase";

const FormularioAutenticacao = ({ aoEnviar, ehCadastro, emailGoogle = "", nomeGoogle = "" }) => {
  const [dadosFormulario, setDadosFormulario] = useState({
    nome: nomeGoogle || '',
    email: emailGoogle || '',
    senha: '',
    confirmacaoSenha: '',
    lembrar: false
  });

  useEffect(() => {
    setDadosFormulario(prevState => ({
      ...prevState,
      nome: nomeGoogle,
      email: emailGoogle
    }));
  }, [nomeGoogle, emailGoogle]);

  const { loginComGoogle } = useContext(AuthContext);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmacaoSenha, setMostrarConfirmacaoSenha] = useState(false);
  const [erro, setErro] = useState('');
  const auth = getAuth(app);
  const navigate = useNavigate();

  const validarNome = (nome) => /^[A-Za-zÀ-ÖØ-öø-ÿÇç ]+$/u.test(nome);

  const verificarDominioEmail = (email) => {
    const regex = /@([a-zA-Z0-9.-]+)$/;
    const resultado = email.match(regex);
    if (resultado) {
      const dominio = resultado[1];
      const dominiosPermitidos =
        ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com',
          'aol.com', 'live.com', 'msn.com', 'yandex.com', 'protonmail.com'];
      return dominiosPermitidos.includes(dominio);
    }
    return false;
  };

  const validarSenha = (senha) => {
    return /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@#$]{8,32}$/.test(senha);
  };

  const tratarMudanca = (e) => {
    const { name, value, type, checked } = e.target;
    let novoValor = value;
    if (name === "nome") {
      if (value.length > 100) return;
      novoValor = value.toLowerCase().replace(/(^|\s)([a-záéíóúâêîôûàèìòùç])/g, (_, sep, letra) => sep + letra.toUpperCase());
    }
    if (name === "email") {
      if (value.length > 100) return;
      novoValor = value.toLowerCase();
    }
    setDadosFormulario((estadoAnterior) => ({
      ...estadoAnterior,
      [name]: type === "checkbox" ? checked : novoValor,
    }));
  };

  const tratarEnvio = async (e) => {
    e.preventDefault();
    setErro('');

    const dadosCorrigidos = {
      ...dadosFormulario,
      nome: dadosFormulario.nome.trim(),
    };

    if (ehCadastro) {
      if (!validarNome(dadosCorrigidos.nome)) {
        setErro('O nome deve conter apenas letras e espaços.');
        return;
      }
      if (!validarSenha(dadosCorrigidos.senha)) {
        setErro('A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula e um número.');
        return;
      }
      if (dadosCorrigidos.senha !== dadosCorrigidos.confirmacaoSenha) {
        setErro('As senhas não coincidem.');
        return;
      }
      if (!verificarDominioEmail(dadosCorrigidos.email)) {
        setErro('O domínio do email não é permitido.');
        return;
      }
    }

    try {
      const sucesso = await aoEnviar(dadosCorrigidos);
      if (sucesso && sucesso.token) {
        if (dadosFormulario.lembrar) {
          localStorage.setItem('token', sucesso.token);
        } else {
          sessionStorage.setItem('token', sucesso.token);
        }
      } else {
        setErro("Erro ao processar a autenticação ou cadastro.");
      }
    } catch (erro) {
      setErro("Erro inesperado ao enviar os dados.");
    }
  };

  const handleGoogleLogin = async () => {
    const resultado = await loginComGoogle();
  
    if (resultado.sucesso) {
      alert("Login com Google realizado com sucesso!");
      navigate(-1);
    } else {
      alert("Erro ao autenticar com Google");
    }
  };

  const recuperarSenha = async () => {
    if (!dadosFormulario.email) {
      setErro('Digite um e-mail válido para recuperação de senha.');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, dadosFormulario.email, {
        url: 'https://academia-iron.web.app/redefinir_senha',
        handleCodeInApp: true,
      });
      alert('E-mail de recuperação enviado! Verifique sua caixa de entrada.');
    } catch (erro) {
      if (erro.code === 'auth/user-not-found') {
        setErro('Não existe uma conta com esse e-mail.');
      } else if (erro.code === 'auth/invalid-email') {
        setErro('O e-mail fornecido é inválido.');
      } else {
        setErro('Erro ao enviar e-mail de recuperação.');
      }
    }
  };

  return (
    <form className='form' onSubmit={tratarEnvio}>
      {ehCadastro && (
        <div className='input'>
          <img className="input-person" src='/images/pages/CadastroLogin/person.svg' alt="ALTERAR" />
          <input
            placeholder='Nome:'
            className='inputs'
            type="text"
            id="nome"
            name="nome"
            value={dadosFormulario.nome}
            onChange={tratarMudanca}
            required
          />
        </div>
      )}

      <div className='input'>
        <img className="input-person" src='/images/pages/CadastroLogin/person.svg' alt="ALTERAR" />
        <input
          className='inputs'
          placeholder='E-Mail:'
          type="email"
          id="email"
          name="email"
          value={dadosFormulario.email}
          onChange={tratarMudanca}
          required
        />
      </div>

      <div className='input'>
        <img className="input-person" src='/images/pages/CadastroLogin/person.svg' alt="ALTERAR" />
        <input
          type={mostrarSenha ? 'text' : 'password'}
          className='inputs'
          placeholder='Senha:'
          id="senha"
          name="senha"
          value={dadosFormulario.senha}
          onChange={tratarMudanca}
          required
          minLength={8}
          maxLength={32}
        />
        <button
          type="button"
          onClick={() => setMostrarSenha(!mostrarSenha)}
        >
          <i className={`bi ${mostrarSenha ? "bi-eye-slash-fill" : "bi-eye-fill"}`}></i>
        </button>
      </div>

      {ehCadastro && (
        <div className='input'>
          <img className="input-person" src='/images/pages/CadastroLogin/person.svg' alt="ALTERAR" />
          <input
            type={mostrarConfirmacaoSenha ? 'text' : 'password'}
            className='inputs'
            placeholder='Confirmar Senha:'
            id="confirmacaoSenha"
            name="confirmacaoSenha"
            value={dadosFormulario.confirmacaoSenha}
            onChange={tratarMudanca}
            required
            minLength={8}
            maxLength={32}
          />
          <button
            type="button"
            onClick={() => setMostrarConfirmacaoSenha(!mostrarConfirmacaoSenha)}
          >
            <i className={`bi ${mostrarConfirmacaoSenha ? "bi-eye-slash-fill" : "bi-eye-fill"}`}></i>
          </button>
        </div>
      )}

      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      <button type="submit">{ehCadastro ? 'Cadastrar' : 'Entrar'}</button>
      {!ehCadastro && (
        <>
          <button type="button" onClick={recuperarSenha}>Esqueci a senha</button>
          <button type="button" onClick={handleGoogleLogin}>Login com Google</button>
        </>
      )}
    </form>
  );
};

export default FormularioAutenticacao;