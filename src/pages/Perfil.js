import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';

const Perfil = () => {
  const { user, logout, atualizarEmailLocal } = useContext(AuthContext);
  const [dadosUsuario, setDadosUsuario] = useState(null);
  const [temSenha, setTemSenha] = useState(null);

  const [novoEmail, setNovoEmail] = useState('');
  const [mensagemEmail, setMensagemEmail] = useState('');

  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mensagemSenha, setMensagemSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const navigate = useNavigate();

  const carregarDados = async () => {
    if (!user?.id) return;

    try {
      const token = localStorage.getItem('token');
      const resposta = await fetch(`https://ironfit-backend.onrender.com/usuario/${user.id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await resposta.json();
      setDadosUsuario(data);
      setNovoEmail(data.email);
    } catch (erro) {
      console.error('Erro ao carregar dados do usuário:', erro);
    }
  };

  const verificarTemSenha = async () => {
    if (!user?.id) return;

    try {
      const resposta = await fetch(`https://ironfit-backend.onrender.com/usuario/${user.id}/tem_senha`);
      const dados = await resposta.json();
      setTemSenha(dados.temSenha);
    } catch (erro) {
      console.error('Erro ao verificar senha:', erro);
    }
  };

  useEffect(() => {
    carregarDados();
    verificarTemSenha();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleLogout = () => {
    logout();
    setTimeout(() => navigate('/'), 10);
  };

  const atualizarEmail = async () => {
    setMensagemEmail('');
    try {
      const token = localStorage.getItem('token');
      const resposta = await fetch(`https://ironfit-backend.onrender.com/usuario/${user.id}/email`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ novoEmail })
      });

      const resultado = await resposta.json();

      if (!resposta.ok) {
        setMensagemEmail(resultado.error || 'Erro ao atualizar o e-mail.');
      } else {
        setMensagemEmail('✅ E-mail atualizado com sucesso!');
        setDadosUsuario(prev => ({ ...prev, email: novoEmail }));
        atualizarEmailLocal(novoEmail);
      }
    } catch (err) {
      setMensagemEmail('Erro ao conectar com o servidor.');
    }
  };

  const validarSenha = (senha) => {
    return /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@#$]{8,32}$/.test(senha);
  };

  const atualizarSenha = async () => {
    setMensagemSenha('');

    if (!novaSenha || (!senhaAtual && temSenha)) {
      setMensagemSenha('Por favor, preencha todos os campos.');
      return;
    }

    if (!validarSenha(novaSenha)) {
      setMensagemSenha('A senha deve ter entre 8 e 32 caracteres, conter pelo menos uma letra maiúscula e um número.');
      return;
    }

    if (novaSenha !== confirmarSenha) {
      setMensagemSenha('As senhas não coincidem.');
      return;
    }

    try {
      const token = localStorage.getItem('token');

      const body = temSenha
        ? { senhaAtual, novaSenha }
        : { novaSenha };

      const resposta = await fetch(`https://ironfit-backend.onrender.com/usuario/${user.id}/senha`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });

      const resultado = await resposta.json();

      if (!resposta.ok) {
        setMensagemSenha(resultado.error || 'Erro ao atualizar a senha.');
      } else {
        setMensagemSenha(temSenha ? '✅ Senha atualizada com sucesso!' : '✅ Senha definida com sucesso!');
        setSenhaAtual('');
        setNovaSenha('');
        setConfirmarSenha('');
        setTemSenha(true);
      }
    } catch (erro) {
      setMensagemSenha('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div style={{ paddingTop: '92px', maxWidth: '500px', margin: '0 auto' }}>
      {dadosUsuario?.foto && (
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <img
            src={dadosUsuario.foto}
            alt="Foto de perfil"
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              objectFit: 'cover',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
            }}
          />
        </div>
      )}
      <h1>Meu Perfil</h1>
      <p>Bem-vindo! Aqui você pode ver e editar seus dados.</p>

      {dadosUsuario ? (
        <div>
          <p><strong>Nome:</strong> {dadosUsuario.nome}</p>
          <p><strong>E-mail atual:</strong> {dadosUsuario.email}</p>
          <p><strong>Conta criada em:</strong> {new Date(dadosUsuario.criado_em).toLocaleString('pt-BR')}</p>

          <hr style={{ margin: '20px 0' }} />

          <div>
            <h3>Atualizar E-mail</h3>
            <input
              type="email"
              id="AtualizarEmail"
              value={novoEmail}
              onChange={(e) => setNovoEmail(e.target.value)}
              style={{ padding: '8px', width: '300px', overflow:'hidden' }}
            />
            <button onClick={atualizarEmail} style={{ marginTop: '10px' }}>
              Atualizar e-mail
            </button>
            {mensagemEmail && <p style={{ marginTop: '10px' }}>{mensagemEmail}</p>}
          </div>

          <hr style={{ margin: '20px 0' }} />

          <div>
            <h3>{temSenha === false ? 'Definir Senha' : 'Alterar Senha'}</h3>

            {temSenha && (
              <>
                <label>Senha atual:</label><br />
                <input
                  type={mostrarSenha ? 'text' : 'password'}
                  id="senhaAtual"
                  value={senhaAtual}
                  onChange={(e) => setSenhaAtual(e.target.value)}
                  style={{ padding: '8px', width: '300px', overflow:'hidden', marginBottom: '10px' }}
                />
              </>
            )}

            <label>Nova senha:</label><br />
            <input
              type={mostrarSenha ? 'text' : 'password'}
              id="novaSenha"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
              style={{ padding: '8px', width: '300px', overflow:'hidden', marginBottom: '10px' }}
            />

            <label>Confirmar nova senha:</label><br />
            <input
              type={mostrarSenha ? 'text' : 'password'}
              id="confirmarNovaSenha"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              style={{ padding: '8px', width: '300px', overflow:'hidden', marginBottom: '10px' }}
            />

            <div style={{ marginBottom: '10px' }}>
              <input
                type="checkbox"
                id="mostrarSenha"
                checked={mostrarSenha}
                onChange={() => setMostrarSenha(!mostrarSenha)}
              />
              <label htmlFor="mostrarSenha" style={{ marginLeft: '5px' }}>
                Mostrar senhas
              </label>
            </div>

            <button onClick={atualizarSenha}>
              {temSenha === false ? 'Definir Senha' : 'Atualizar Senha'}
            </button>
            {mensagemSenha && <p style={{ marginTop: '10px' }}>{mensagemSenha}</p>}
          </div>
        </div>
      ) : (
        <p>Carregando informações...</p>
      )}

      <button onClick={handleLogout} style={{ marginTop: '30px' }}>Sair</button>
    </div>
  );
};

export default Perfil;