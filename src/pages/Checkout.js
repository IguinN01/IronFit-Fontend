import React, { useState } from "react";
import { useCarrinho } from "../context/CarrinhoContext";

const Checkout = () => {
  const { carrinho } = useCarrinho();

  const [endereco, setEndereco] = useState("");
  const [cpf, setCpf] = useState("");
  const [formaPagamento, setFormaPagamento] = useState("credito");
  const [cvc, setCvc] = useState("");

  const precoTotal = carrinho.reduce(
    (total, produto) => total + produto.preco * produto.quantidade,
    0
  ).toFixed(2);

  const finalizarCompra = () => {
    alert('Pedido finalizado com sucesso (a lógica será adicionada em breve)');
  };

  const finalizarPedido = async () => {
    if (!endereco || !cpf || !formaPagamento) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if ((formaPagamento === 'credito' || formaPagamento === 'debito') && !cvc) {
      alert("Por favor, informe o código de segurança (CVC).");
      return;
    }

    try {
      const pedido = {
        carrinho,
        endereco,
        cpf,
        formaPagamento,
        total: precoTotal,
      };

      // Aqui será enviada uma requisição ao backend para criar o pedido
      // e gerar a preferência de pagamento no Mercado Pago.

      alert("Pedido enviado com sucesso! Em breve redirecionaremos para o pagamento.");

    } catch (error) {
      console.error("Erro ao finalizar pedido:", error);
      alert("Ocorreu um erro ao processar o pedido.");
    }
  };

  return (
    <div className="pagina-checkout" style={{ paddingTop: '142px' }}>
      <h2>Finalizar Compra</h2>
      <h3>Itens no Carrinho</h3>

      {carrinho.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          <ul>
            {carrinho.map((produto) => (
              <li key={produto.idproduto}>
                <img src={produto.imagens} alt={produto.nome} width="60" />
                <div>
                  <p>{produto.nome}</p>
                  <p>Qtd: {produto.quantidade}</p>
                  <p>Subtotal: R$ {(produto.preco * produto.quantidade).toFixed(2)}</p>
                </div>
              </li>
            ))}
          </ul>
          <p><strong>Total: R$ {precoTotal}</strong></p>
        </>
      )}

      <hr />

      <h2>Endereço de Entrega</h2>
      <textarea
        placeholder="Digite o endereço completo..."
        value={endereco}
        onChange={e => setEndereco(e.target.value)}
        rows={3}
      />

      <h2>CPF</h2>
      <input
        type="text"
        placeholder="Digite seu CPF"
        value={cpf}
        onChange={e => setCpf(e.target.value)}
      />

      <h2>Forma de Pagamento</h2>
      <select
        value={formaPagamento}
        onChange={e => setFormaPagamento(e.target.value)}
      >
        <option value="credito">Cartão de Crédito</option>
        <option value="debito">Cartão de Débito</option>
        <option value="pix">PIX</option>
      </select>

      {(formaPagamento === 'credito' || formaPagamento === 'debito') && (
        <div>
          <h3>Código de Segurança (CVC)</h3>
          <input
            type="text"
            value={cvc}
            onChange={e => setCvc(e.target.value)}
            placeholder="Ex: 123"
          />
        </div>
      )}

      <button onClick={finalizarPedido} >
        Finalizar Pedido
      </button>
    </div >
  );
};

export default Checkout;