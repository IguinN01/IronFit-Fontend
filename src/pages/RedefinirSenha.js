import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { getAuth, verifyPasswordResetCode, confirmPasswordReset } from 'firebase/auth';
import { app } from '../firebase';

import "../css/pages/RedefinirSenha/redefinir.css";

const RedefinirSenha = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmacaoSenha, setMostrarConfirmacaoSenha] = useState(false);

  const [erro, setErro] = useState('');
  const [email, setEmail] = useState('');
  const [codigoValido, setCodigoValido] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const oobCode = searchParams.get('oobCode');

  const validarSenha = (senha) => {
    return /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@#$]{8,32}$/.test(senha);
  };

  useEffect(() => {
    const validarCodigo = async () => {
      try {
        const emailRecuperado = await verifyPasswordResetCode(auth, oobCode);
        setEmail(emailRecuperado);
        setCodigoValido(true);
      } catch (err) {
        setErro('Link inválido ou expirado. Solicite uma nova redefinição de senha.');
      }
    };

    if (oobCode) {
      validarCodigo();
    }
  }, [auth, oobCode]);

  const tratarEnvio = async (e) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    if (novaSenha !== confirmarSenha) {
      setErro('As senhas não coincidem.');
      setCarregando(false);
      return;
    }

    if (!validarSenha(novaSenha)) {
      setErro('A senha deve ter entre 8 e 32 caracteres, incluir pelo menos uma letra maiúscula e um número. Apenas A-Z, a-z, 0-9, @, #, $.');
      setCarregando(false);
      return;
    }

    try {
      await confirmPasswordReset(auth, oobCode, novaSenha);

      const resposta = await fetch("https://ironfit-backend.onrender.com/redefinir_senha", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, novaSenha })
      });

      if (!resposta.ok) {
        throw new Error('Erro ao atualizar senha no servidor');
      }

      setSucesso(true);
      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 3000);
    } catch (err) {
      setErro('Erro ao redefinir a senha. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <main className='formulario' style={{ paddingTop: '92px' }}>
      <h2 className='titulo_redefinir'>Redefinir Senha</h2>

      {sucesso ? (
        <p>Senha redefinida com sucesso! Redirecionando para o login...</p>
      ) : codigoValido ? (
        <form onSubmit={tratarEnvio} className="form">
          <p>Redefinindo senha do E-Mail: <strong>{email}</strong></p>

          <div className='input'>
            <img className="input-person" src='/images/pages/CadastroLogin/cadeado.svg' alt="ALTERAR" />
            <input
              type={mostrarSenha ? 'text' : 'password'}
              id="novaSenha"
              className='inputs'
              placeholder='Nova senha:'
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
              required
              minLength={8}
              maxLength={32}
            />
            <button
              className='botao_mostrar_senha'
              type="button"
              onClick={() => setMostrarSenha(!mostrarSenha)}
            >
              <i className={`bi ${mostrarSenha ? "bi-eye-slash-fill" : "bi-eye-fill"}`}></i>
            </button>
          </div>

          <div className='input'>
            <img className="input-person" src='/images/pages/CadastroLogin/personCadeado.svg' alt="ALTERAR" />
            <input
              type={mostrarConfirmacaoSenha ? 'text' : 'password'}
              id="confirmarSenha"
              className='inputs'
              placeholder='Confirmar nova senha:'
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              required
              minLength={8}
              maxLength={32}
            />
            <button
              className='botao_mostrar_senha'
              type="button"
              onClick={() => setMostrarConfirmacaoSenha(!mostrarConfirmacaoSenha)}
            >
              <i className={`bi ${mostrarConfirmacaoSenha ? "bi-eye-slash-fill" : "bi-eye-fill"}`}></i>
            </button>
          </div>

          {erro && <p>{erro}</p>}

          <button className='botao_cadastro cadastro_margin_top' type="submit" disabled={carregando}>
            {carregando ? 'Redefinindo...' : 'Redefinir Senha'}
          </button>
        </form>
      ) : (
        <p>{erro}</p>
      )}
    </main>
  );
};

export default RedefinirSenha;