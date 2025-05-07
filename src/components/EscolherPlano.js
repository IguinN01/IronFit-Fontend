import { useState } from 'react';
import { useLocation } from "react-router-dom";

import "../css/pages/EscolhaPlano/Planos.css";

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

  const dataCobranca = new Date();

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
    <>
      <div className='div_assinatura'>
        {planoInfo && (
          <div className='bloco_assinatura'>
            <div>
              <h2
                className="nome_assinatura"
                dangerouslySetInnerHTML={{
                  __html: planoInfo.nome.replace(/(Warrior|Champion|Legend)/, '<b>$1</b>'),
                }}
              ></h2>
              <p className='descricao_assinatura'>{planoInfo.descricao}</p>

              <div className='bloco_valor_descricao'>
                <div className='valores_assinatura'>
                  <p><strong>Valor:</strong> {planoInfo.valor}</p>
                  <p><strong>Primeira cobrança:</strong> {formatarData(dataCobranca)}</p>
                  <p><strong>Plano expira em:</strong> {formatarData(dataExpiracao)}</p>
                </div>

                <div className='div_planos_assinatura'>
                  {planoSelecionado === 'iron-legend' && (
                    <div className="plano_semestral_assinatura">
                      <div className="beneficios_plano">
                        <p className="texto_beneficios"><b className="certo">&#10003;</b>
                          Todos os benefícios do Plano Iron Chapion
                        </p>
                        <p className="texto_beneficios"><b className="certo">&#10003;</b>
                          Maior desconto (economize R$480,00 no ano)
                        </p>
                        <p className="texto_beneficios"><b className="certo">&#10003;</b>
                          Brinde exclusivo para novos assinantes
                        </p>
                      </div>
                    </div>
                  )}

                  {planoSelecionado === 'iron-champion' && (
                    <div className="plano_anual_assinatura">
                      <div className="beneficios_plano">
                        <p className="texto_beneficios"><b className="certo">&#10003;</b>
                          Todos os benefícios do Plano Iron Warrior
                        </p>
                        <p className="texto_beneficios"><b className="certo">&#10003;</b>
                          Desconto especial (economize R$120,00 em 6 meses)
                        </p>
                        <p className="texto_beneficios"><b className="certo">&#10003;</b>
                          Avaliação física gratuita a cada 3 meses
                        </p>
                      </div>
                    </div>
                  )}

                  {planoSelecionado === 'iron-warrior' && (
                    <div className="plano_mensal_assinatura">
                      <div className="beneficios_plano">
                        <p className="texto_beneficios"><b className="certo">&#10003;</b>
                          Acesso ilimitado à academia
                        </p>
                        <p className="texto_beneficios"><b className="certo">&#10003;</b>
                          Participação em aulas coletivas
                        </p>
                        <p className="texto_beneficios"><b className="certo">&#10003;</b>
                          Suporte básico de treino
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Digite seu e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='input_assinatura'
                />
                <button className='botao_assinatura' onClick={criarAssinatura}>
                  Assinar
                </button>
              </div>

              <p className='info_assinatura'>Você pode cancelar a qualquer momento antes do próximo ciclo.</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}