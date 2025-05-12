import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { useCarrinho } from '../context/CarrinhoContext';
import PagamentoCredito from '../components/PagamentoCredito';
import PagamentoPix from '../components/PagamentoPix';
import CalcularFrete from '../components/CalcularFrete';

import "../css/pages/Carrinho/checkout.css";
import "../css/pages/Carrinho/metodoPagamento.css";

const Checkout = () => {
  const { carrinho, alterarQuantidade, removerDoCarrinho } = useCarrinho();
  const [metodoPagamento, setMetodoPagamento] = useState('credito');
  const [frete, setFrete] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const usuarioLogado = token && token.trim() !== "";

  const precoTotal = carrinho
    .reduce((total, produto) => total + produto.preco * produto.quantidade, 0)
    .toFixed(2);

  const totalGeral = (parseFloat(precoTotal) + parseFloat(frete)).toFixed(2);

  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  localStorage.setItem("frete", frete);

  const handlePagamento = async (dadosPagamento) => {
    try {
      const resposta = await fetch("https://ironfit-backend.onrender.com/pagamento-credito", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(dadosPagamento)
      });

      const resultado = await resposta.json();

      if (resposta.ok) {
        console.log("Resultado:", resultado);

        alert("Pagamento e pedido realizados com sucesso!");

      } else {
        alert("Falha no pagamento: " + (resultado.mensagem || resultado.message));
        console.error("Erro:", resultado);
      }

    } catch (erro) {
      console.error("Erro na requisição:", erro);
      alert("Ocorreu um erro ao processar o pagamento.");
    }
  };

  return (
    <div className="pagina-checkout">
      {carrinho.length === 0 ? (
        <>
          <div className='pagamento_vazio'>
            <span>Seu carrinho está vazio.</span>
            <Link to="/todos_produtos">
              <span>Veja nossos Produtos!</span>
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className='div_titulo_pagamento'>
            <button onClick={() => navigate(-1)} className="botao-voltar_pagamento">
              ←
            </button>
            <h3 className='pagamento_titulo'>Seu <b>Carrinho</b></h3>
          </div>

          <div className='scroll-carrinho'>
            <ul className="lista_produtos">
              {carrinho.map((produto, index) => (
                <li className="item_produtos" key={index}>

                  <div className="img_desc_carrinho">
                    <Link to={`/produto/${produto.idproduto}`} className="produto-link">
                      <img className="img_lista_carrinho img_pagamento" src={produto.imagens} alt={produto.nome} width="50" />
                    </Link>

                    <div className="descricao_produtos_lista">
                      <div className="descricao_carrinho">
                        <Link to={`/produto/${produto.idproduto}`} className="produto-link">
                          <span className="nome_carrinho">{produto.nome}</span>
                        </Link>

                        <div className="ajuste_botao">
                          <Link to={`/produto/${produto.idproduto}`} className="produto-link">
                            <span>
                              Preço: R$
                              <motion.span
                                key={produto.preco * produto.quantidade}
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 5 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                              >
                                {(produto.preco * produto.quantidade).toFixed(2)}
                              </motion.span>
                            </span>
                          </Link>

                          <button className="botao_remover" onClick={() => removerDoCarrinho(produto.idproduto)}>&#x02A2F;
                          </button>
                        </div>
                      </div>

                      <div className="div_quantidade">
                        <button
                          className="botoes_carrinho" onClick={() => alterarQuantidade(produto.idproduto, -1)}>
                          -
                        </button>

                        <span className="span_quantidade">{produto.quantidade}</span>

                        <button className="botoes_carrinho"
                          onClick={() => alterarQuantidade(produto.idproduto, 1)}
                          disabled={produto.quantidade >= 5}>
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {frete === null && (
            <p className="preco_total subtotal_pagamento">Subtotal: R$ {precoTotal}</p>
          )}

          {frete !== null && (
            <motion.p
              className='preco_total total_pagamento'
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              Total: <b>R$ {totalGeral}</b>
            </motion.p>
          )}
          <hr className='hr_preco'></hr>

          <CalcularFrete
            carrinho={carrinho}
            onFreteSelecionado={(valorFrete) => setFrete(valorFrete)}
          />

          <hr />

          {frete !== null && !isNaN(totalGeral) && (
            <div className='div_metodo_pagamento'>
              {!usuarioLogado ? (
                <div className='texto_fazer_login'>
                  <p>Você precisa estar logado para finalizar o pagamento.</p>
                  <p><Link to="/login">Clique aqui para fazer login.</Link></p>
                </div>
              ) : (
                <>
                  <h2 className='titulo_finalizar'>Finalizar <b>Compra</b></h2>
                  <div className='radios_metodo'>
                    <label>
                      <input
                        type="radio"
                        id="radio"
                        value="credito"
                        checked={metodoPagamento === 'credito'}
                        onChange={() => setMetodoPagamento('credito')}
                      />
                      Cartão de Crédito
                    </label>

                    <label>
                      <input
                        type="radio"
                        id="radio"
                        value="pix"
                        checked={metodoPagamento === 'pix'}
                        onChange={() => setMetodoPagamento('pix')}
                      />
                      PIX
                    </label>
                  </div>

                  {metodoPagamento === 'credito' ? (
                    <PagamentoCredito aoTokenizar={handlePagamento} valorTotal={totalGeral} />
                  ) : (
                    <PagamentoPix />
                  )}
                </>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Checkout;