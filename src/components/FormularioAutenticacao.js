import React, { useState } from 'react';

const FormularioAutenticacao = ({ aoEnviar, ehCadastro }) => {
  const [dadosFormulario, setDadosFormulario] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmacaoSenha: '',
  });

  const tratarMudanca = (e) => {
    const { name, value } = e.target;
    setDadosFormulario((estadoAnterior) => ({
      ...estadoAnterior,
      [name]: value,
    }));
  };

  const tratarEnvio = (e) => {
    e.preventDefault();
    aoEnviar(dadosFormulario);
  };

  return (
    <form onSubmit={tratarEnvio}>
      {ehCadastro && (
        <div>
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={dadosFormulario.nome}
            onChange={tratarMudanca}
            required
          />
        </div>
      )}
      <div>
        <label htmlFor="email">E-mail:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={dadosFormulario.email}
          onChange={tratarMudanca}
          required
        />
      </div>
      <div>
        <label htmlFor="senha">Senha:</label>
        <input
          type="password"
          id="senha"
          name="senha"
          value={dadosFormulario.senha}
          onChange={tratarMudanca}
          required
        />
      </div>
      {ehCadastro && (
        <div>
          <label htmlFor="confirmacaoSenha">Confirmar Senha:</label>
          <input
            type="password"
            id="confirmacaoSenha"
            name="confirmacaoSenha"
            value={dadosFormulario.confirmacaoSenha}
            onChange={tratarMudanca}
            required
          />
        </div>
      )}
      <button type="submit">{ehCadastro ? 'Cadastrar' : 'Entrar'}</button>
    </form>
  );
};

export default FormularioAutenticacao;