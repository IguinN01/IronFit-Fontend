import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCarrinho } from "../context/CarrinhoContext";

const PagamentoCartao = () => {
  const { carrinho } = useCarrinho();
  const [mercadoPago, setMercadoPago] = useState(null);
  const [cardForm, setCardForm] = useState(null);
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [erroPagamento, setErroPagamento] = useState(null);

  const calcularTotalCarrinho = () => {
    return carrinho.reduce((total, item) => total + item.preco * item.quantidade, 0);
  };

  useEffect(() => {
    const mp = new window.MercadoPago(process.env.REACT_APP_MERCADO_PAGO_PUBLIC_KEY);
    setMercadoPago(mp);
  }, []);

  useEffect(() => {
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
  }, [mercadoPago]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErroPagamento(null);

    try {
      if (!cardForm) {
        throw new Error("cardForm não inicializado ainda");
      }

      const cardFormData = await cardForm.getCardFormData();
      console.log("🔍 Dados retornados de cardForm:", cardFormData);

      if (!cardFormData.token || cardFormData.token.trim() === "") {
        throw new Error("Token do cartão não foi gerado. Verifique os campos.");
      }

      cardFormData.cardholder = {
        name: document.getElementById("form-nome").value,
        identification: {
          type: cardFormData.identificationType,
          number: cardFormData.identificationNumber,
        }
      };

      delete cardFormData.cardholderName;
      delete cardFormData.identificationType;
      delete cardFormData.identificationNumber;
      delete cardFormData.merchantAccountId;

      const payload = {
        token: cardFormData.token,
        payment_method_id: cardFormData.paymentMethodId,
        issuer_id: cardFormData.issuerId,
        transaction_amount: Number(cardFormData.amount),
        installments: Number(cardFormData.installments),
        payer: {
          email: cardFormData.cardholderEmail,
          identification: {
            type: cardFormData.cardholder.identification.type,
            number: cardFormData.cardholder.identification.number,
          },
        },
      };

      const response = await fetch("https://ironfit-backend.onrender.com/pagamento-cartao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("❌ Erro ao pagar: ", data);
        throw new Error(data?.error || "Erro desconhecido");
      }

      console.log("✅ Pagamento realizado com sucesso:", data);
      setStatus("Pagamento realizado com sucesso!");
    } catch (err) {
      console.error("❌ Erro no handleSubmit:", err.message);
      setErroPagamento(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form id="form-pagamento" onSubmit={handleSubmit}>
      <input type="text" id="form-nome" placeholder="Nome no cartão" />
      <input type="email" id="form-email" placeholder="E-mail" />
      <input type="text" id="form-numero" placeholder="Número do cartão" />
      <input type="text" id="form-validade" placeholder="MM/AA" />
      <input type="text" id="form-cvv" placeholder="CVV" />
      <select id="form-parcelas"></select>
      <select id="form-tipo-doc">
        <option value="CPF">CPF</option>
        <option value="CNPJ">CNPJ</option>
      </select>
      <input type="text" id="form-doc" placeholder="Documento (CPF)" />
      <select id="form-banco"></select>

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Processando..." : "Pagar"}
      </button>

      {erroPagamento && <p style={{ color: 'red' }}>{erroPagamento}</p>}
      {status && <p>{status}</p>}
    </form>
  );
};

export default PagamentoCartao;