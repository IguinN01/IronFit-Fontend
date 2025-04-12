import React, { useEffect, useState } from "react";
import axios from "axios";

import { useCarrinho } from "../context/CarrinhoContext";

const PagamentoCartao = () => {
  const { carrinho } = useCarrinho();
  const [mercadoPago, setMercadoPago] = useState(null);
  const [cardForm, setCardForm] = useState(null);
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const calcularTotalCarrinho = () => {
    return carrinho.reduce((total, item) => total + item.preco * item.quantidade, 0);
  };

  useEffect(() => {
    const mp = new window.MercadoPago(process.env.REACT_APP_MERCADO_PAGO_PUBLIC_KEY);
    setMercadoPago(mp);

    if (mercadoPago && !cardForm) {
      const cardFormInstance = mercadoPago.cardForm({
        amount: calcularTotalCarrinho().toFixed(2),
        autoMount: true,
        form: {
          id: "form-pagamento",
          cardholderName: { id: "form-nome", placeholder: "Nome no cartão" },
          cardholderEmail: { id: "form-email", placeholder: "E-mail" },
          cardNumber: { id: "form-numero", placeholder: "Número do cartão" },
          expirationDate: { id: "form-validade", placeholder: "MM/AA" },
          securityCode: { id: "form-cvv", placeholder: "CVV" },
          installments: { id: "form-parcelas" },
          identificationType: { id: "form-tipo-doc" },
          identificationNumber: { id: "form-doc", placeholder: "Documento (CPF)" },
          issuer: { id: "form-banco" },
        },
        callbacks: {
          onFormMounted: error => {
            if (error) return console.error("Erro ao montar o formulário", error);
          }
        }
      });
      setCardForm(cardFormInstance);
    }
  }, [mercadoPago, cardForm]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const {
        token,
        paymentMethodId,
        issuerId,
        installments,
        amount,
        payer
      } = cardForm.getCardFormData();

      const response = await axios.post("https://ironfit-backend.onrender.com/pagamento-cartao", {
        token,
        payment_method_id: paymentMethodId,
        issuer_id: issuerId,
        transaction_amount: Number(amount),
        installments: Number(installments),
        payer
      });

      console.log("Resposta do pagamento:", response.data);
      setStatus("Pagamento realizado com sucesso!");
    } catch (error) {
      console.error("Erro ao pagar:", error.response?.data || error);
      setStatus("Erro ao processar o pagamento.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form id="form-pagamento" onSubmit={handleSubmit} style={{ paddingTop: "122px" }}>
      <input type="text" id="form-nome" />
      <input type="email" id="form-email" />
      <input type="text" id="form-numero" />
      <input type="text" id="form-validade" />
      <input type="text" id="form-cvv" />
      <select id="form-parcelas"></select>
      <select id="form-tipo-doc"></select>
      <input type="text" id="form-doc" />
      <select id="form-banco"></select>

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Processando..." : "Pagar"}
      </button>
      <p>{status}</p>
    </form>
  );
};

export default PagamentoCartao;