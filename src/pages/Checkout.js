import React, { useEffect, useState } from "react";

import { useAuth } from '../context/AuthContext';
import { useCarrinho } from '../context/CarrinhoContext';
import PagamentoCartao from '../components/PagamentoCartao';

import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

const Checkout = () => {
  const [cpf, setCpf] = useState("");
  const [formaPagamento, setFormaPagamento] = useState("credito");
  const [cvc, setCvc] = useState("");
  const [preferenceId, setPreferenceId] = useState(null);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const { carrinho } = useCarrinho();

  const precoTotal = carrinho
    .reduce((total, produto) => total + produto.preco * produto.quantidade, 0)
    .toFixed(2);

  useEffect(() => {
    initMercadoPago("TEST-118c78db-f963-423b-bafe-bbf415ea5ba6", {
      locale: "pt-BR",
    });
  }, []);

  return (
    <div className="pagina-checkout" style={{ paddingTop: "142px" }}>

      {carrinho.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          <h3>Itens no Carrinho</h3>
          <ul>
            {carrinho.map((produto) => (
              <li key={produto.idproduto}>
                <img src={produto.imagens} alt={produto.nome} width="60" />
                <div>
                  <p>{produto.nome}</p>
                  <p>Qtd: {produto.quantidade}</p>
                  <p>
                    Subtotal: R$ {(produto.preco * produto.quantidade).toFixed(2)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <p>
            <strong>Total: R$ {precoTotal}</strong>
          </p>
        </>
      )}

      <hr />

      <div>
        <h1>Finalizar Compra</h1>
        <PagamentoCartao />
      </div>
    </div>
  );
};

export default Checkout;