import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function EscolherPlano() {
  const location = useLocation();
  const planoInicial = location.state?.plano || '';

  const [planoSelecionado] = useState(planoInicial);
  const [email, setEmail] = useState('');

  const planosInfo = {
    'iron-warrior': {
      nome: 'Iron Warrior',
      valor: 'R$149,99',
      descricao: 'Desafie seus limites com treinos intensos e uma jornada de transformação física.',
      repeticoes: 1,
    },
    'iron-champion': {
      nome: 'Iron Champion',
      valor: 'R$119,99/mês',
      descricao: 'Para quem busca alcançar novos patamares, com avaliação física e acompanhamento contínuo.',
      repeticoes: 6,
    },
    'iron-legend': {
      nome: 'Iron Legend',
      valor: 'R$109,99/mês',
      descricao: 'Potencialize seus resultados com mais suporte e benefícios exclusivos para seu treino.',
      repeticoes: 12,
    },
  };

  const planoInfo = planosInfo[planoSelecionado];

  const hoje = new Date();
  const billingDay = 10;
  const anoAtual = hoje.getFullYear();
  const mesAtual = hoje.getMonth();

  let dataCobranca;
  if (hoje.getDate() <= billingDay) {
    dataCobranca = new Date(anoAtual, mesAtual, billingDay);
  } else {
    dataCobranca = new Date(anoAtual, mesAtual + 1, billingDay);
  }

  const dataExpiracao = new Date(dataCobranca);
  if (planoInfo) {
    dataExpiracao.setMonth(dataExpiracao.getMonth() + planoInfo.repeticoes);
  }

  const formatarData = (data) => {
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const criarAssinatura = async () => {
    if (!planoSelecionado || !email) {
      alert('Preencha o e-mail.');
      return;
    }

    try {
      const response = await fetch('https://ironfit-backend.onrender.com/assinatura/criar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plano: planoSelecionado,
          email,
          nome: 'Nome Fictício',
        }),
      });

      const data = await response.json();
      if (data && data.init_point) {
        window.location.href = data.init_point;
      } else {
        console.error(data);
        alert('Erro ao criar assinatura.');
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao criar assinatura.');
    }
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Digite seu e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <h1>Resumo do Plano</h1>

      {planoInfo && (
        <div>
          <h2>{planoInfo.nome}</h2>
          <p><strong>Valor:</strong> {planoInfo.valor}</p>
          <p>{planoInfo.descricao}</p>
          <p><strong>Primeira cobrança:</strong> {formatarData(dataCobranca)}</p>
          <p><strong>Plano expira em:</strong> {formatarData(dataExpiracao)}</p>
          <p>Você pode cancelar a qualquer momento antes do próximo ciclo.</p>
        </div>
      )}

      <button onClick={criarAssinatura}>
        Assinar
      </button>
    </div>
  );
}