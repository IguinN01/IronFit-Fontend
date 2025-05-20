import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { ArrowLeft } from "lucide-react";

import { AuthContext } from '../context/AuthContext';

import "../css/pages/Perfil/perfil.css";

const Perfil = () => {
  const { user, logout, atualizarEmailLocal } = useContext(AuthContext);
  const [dadosUsuario, setDadosUsuario] = useState(null);
  const [temSenha, setTemSenha] = useState(null);
  const [pedidos, setPedidos] = useState([]);

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

  const carregarPedidos = async () => {
    if (!user?.id) return;

    try {
      const token = localStorage.getItem('token');
      const resposta = await fetch(`https://ironfit-backend.onrender.com/usuario/${user.id}/pedidos`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const pedidosData = await resposta.json();
      setPedidos(pedidosData);
    } catch (erro) {
      console.error('Erro ao carregar pedidos:', erro);
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
    carregarPedidos();
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
    <>
      <div className="perfil-container">
        <button className='voltar_perfil' type="button" onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
        </button>

        <div className='div_img_perfil'>
          <img src="./images/global/Icon_circulo_128.svg" alt="Ícone" />
        </div>
        <h1 className='titulo_perfil'>Meu <b>Perfil</b></h1>
        <p className='bem-vindo_texto'>Bem-vindo! Aqui você pode ver, editar seus dados e ver seus últimos pedidos.</p>

        {dadosUsuario ? (
          <div>
            <div className='div_info_perfil'>
              <p className='info_perfil'><strong>Nome:</strong> {dadosUsuario.nome}</p>
              <p className='info_perfil'><strong>E-mail atual:</strong> {dadosUsuario.email}</p>
              <p className='info_perfil'><strong>Conta criada em:</strong> {new Date(dadosUsuario.criado_em).toLocaleString('pt-BR')}</p>
            </div>

            <hr style={{ margin: '20px 0', width: '100vw', }} />

            <div className='atualizar_perfil'>
              <h3 className='atualizar_titulo'>Atualizar E-mail</h3>
              <input
                className='input_atualizar'
                type="email"
                id="AtualizarEmail"
                value={novoEmail}
                onChange={(e) => setNovoEmail(e.target.value)}
              />
              <button className='botao_atualizar' onClick={atualizarEmail}>
                Atualizar E-mail
              </button>
              {mensagemEmail && <p style={{ marginTop: '10px' }}>{mensagemEmail}</p>}
            </div>

            <hr style={{ margin: '20px 0' }} />

            <div className='div_redefinir_senha'>
              <h3 className='redefinir_titulo'>{temSenha === false ? 'Definir Senha' : 'Alterar Senha'}</h3>

              <div className='div_inputs_redefinir'>
                <div className='div_input_redefinir'>
                  {temSenha && (
                    <>
                      <label className='titulo_input_redefinir'>Senha atual:</label><br />
                      <input
                        className='input_atualizar'
                        type={mostrarSenha ? 'text' : 'password'}
                        id="senhaAtual"
                        value={senhaAtual}
                        onChange={(e) => setSenhaAtual(e.target.value)}
                      />
                    </>
                  )}
                </div>

                <div className='div_input_redefinir'>
                  <label className='titulo_input_redefinir'>Nova senha:</label><br />
                  <input
                    className='input_atualizar'
                    type={mostrarSenha ? 'text' : 'password'}
                    id="novaSenha"
                    value={novaSenha}
                    onChange={(e) => setNovaSenha(e.target.value)}
                  />
                </div>

                <div className='div_input_redefinir'>
                  <label className='titulo_input_redefinir'>Confirmar nova senha:</label><br />
                  <input
                    className='input_atualizar'
                    type={mostrarSenha ? 'text' : 'password'}
                    id="confirmarNovaSenha"
                    value={confirmarSenha}
                    onChange={(e) => setConfirmarSenha(e.target.value)} y
                  />
                </div>
              </div>

              <div className='div_mostrar'>
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

              <button className='botao_atualizar' onClick={atualizarSenha}>
                {temSenha === false ? 'Definir Senha' : 'Atualizar Senha'}
              </button>
              {mensagemSenha && <p style={{ marginTop: '10px' }}>{mensagemSenha}</p>}
            </div>
          </div>
        ) : (
          <p className='carrgando'>Carregando informações...</p>
        )}

        <hr style={{ margin: '20px 0' }} />

        <button className='botao_sair' onClick={handleLogout}>Sair</button>

        <hr style={{ margin: '20px 0' }} />

        <div className="produtos-container">
          <h3>Últimos Pedidos</h3>
          {pedidos.length > 0 ? (
            pedidos.map((pedido, index) => (
              <div key={index} className="pedido-card">
                <p><strong>Pedido #{pedido.id}</strong></p>
                <ul className="pedido-itens">
                  {pedido.itens.map((item, idx) => (
                    <li key={idx} className="pedido-item">
                      <img src={item.imagem} alt={item.nome} />
                      <div className="pedido-info">
                        <p>{item.nome}</p>
                        <p>R${item.valor}</p>
                        <p>Quantidade: {item.quantidade}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="pedido-footer">
                  <p><strong>Frete:</strong> R${pedido.frete}</p>
                  <p><strong>Total:</strong> R${pedido.total}</p>
                  <p><strong>Data do Pedido:</strong> {new Date(pedido.data_pedido).toLocaleString('pt-BR')}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="sem-pedidos">Você ainda não fez nenhum pedido.</p>
          )}
        </div>

        <hr />
      </div>
    </>
  );
};

export default Perfil;