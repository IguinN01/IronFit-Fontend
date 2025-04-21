import { useState } from 'react';
import { useCarrinho } from '../context/CarrinhoContext';
import PagamentoCredito from '../components/PagamentoCredito';
import PagamentoPix from '../components/PagamentoPix';

const Checkout = () => {
  const { carrinho, alterarQuantidade, removerDoCarrinho } = useCarrinho();
  const [metodoPagamento, setMetodoPagamento] = useState('credito');

  const precoTotal = carrinho
    .reduce((total, produto) => total + produto.preco * produto.quantidade, 0)
    .toFixed(2);

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
      } else {
        alert("Falha no pagamento: " + resultado.mensagem || resultado.message);
        console.error("Erro:", resultado);
      }

    } catch (erro) {
      console.error("Erro na requisição:", erro);
      alert("Ocorreu um erro ao processar o pagamento.");
    }
  };

  return (
    <div className="pagina-checkout" style={{ paddingTop: "142px" }}>
      {carrinho.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          <h3>Itens no Carrinho</h3>
          <div style={{ maxHeight: "300px", overflowY: "auto" }}>
            {carrinho.map((produto) => (
              <li key={produto.idproduto}>
                <img src={produto.imagens} alt={produto.nome} width="60" />
                <div>
                  <p>{produto.nome}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button onClick={() => alterarQuantidade(produto.idproduto, -1)}>-</button>
                    <span>{produto.quantidade}</span>
                    <button onClick={() => alterarQuantidade(produto.idproduto, 1)}>+</button>
                  </div>
                  <p>Subtotal: R$ {(produto.preco * produto.quantidade).toFixed(2)}</p>
                </div>
                <button onClick={() => removerDoCarrinho(produto.idproduto)}>
                  Remover
                </button>
              </li>
            ))}
          </div>

          <p>
            <strong>Total: R$ {precoTotal}</strong>
          </p>

          <hr />

          <div>
            <h1>Finalizar Compra</h1>

            <div style={{ marginBottom: '16px' }}>
              <label>
                <input
                  type="radio"
                  value="credito"
                  checked={metodoPagamento === 'credito'}
                  onChange={() => setMetodoPagamento('credito')}
                />
                Cartão de Crédito
              </label>

              <label style={{ marginLeft: '16px' }}>
                <input
                  type="radio"
                  value="pix"
                  checked={metodoPagamento === 'pix'}
                  onChange={() => setMetodoPagamento('pix')}
                />
                PIX
              </label>
            </div>

            {metodoPagamento === 'credito' ? (
              <PagamentoCredito aoTokenizar={handlePagamento} />
            ) : (
              <PagamentoPix />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;