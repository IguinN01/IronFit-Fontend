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
    if (window.MercadoPago) {
      const mp = new window.MercadoPago(process.env.REACT_APP_MERCADO_PAGO_PUBLIC_KEY);
      setMercadoPago(mp);
    } else {
      console.warn("⚠️ SDK do Mercado Pago ainda não foi carregado.");
    }
  }, []);

  useEffect(() => {
    if (mercadoPago && !cardForm) {
      const total = calcularTotalCarrinho().toFixed(2);

      const cardFormInstance = mercadoPago.cardForm({
        amount: total,
        autoMount: true,
        form: {
          id: "form-checkout",
          cardholderName: { id: "form-checkout__cardholderName", placeholder: "Nome como está no cartão" },
          cardholderEmail: { id: "form-checkout__cardholderEmail", placeholder: "E-mail" },
          cardNumber: { id: "form-checkout__cardNumber", placeholder: "Número do cartão" },
          expirationDate: { id: "form-checkout__expirationDate", placeholder: "MM/AA" },
          securityCode: { id: "form-checkout__securityCode", placeholder: "Código de segurança" },
          installments: { id: "form-checkout__installments", placeholder: "Parcelas" },
          identificationType: { id: "form-checkout__identificationType", placeholder: "Tipo de documento" },
          identificationNumber: { id: "form-checkout__identificationNumber", placeholder: "Número do documento" },
          issuer: { id: "form-checkout__issuer", placeholder: "Banco emissor" },
        },
        callbacks: {
          onFormMounted: (error) => {
            if (error) return console.warn("Erro ao montar form:", error);
            console.log("✅ Formulário montado com sucesso!");
          }
        },
      });

      setCardForm(cardFormInstance);
    }
  }, [mercadoPago, cardForm, calcularTotalCarrinho]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErroPagamento(null);
    setStatus("");

    try {
      if (!cardForm) throw new Error("Formulário não está pronto.");

      const dados = await cardForm.getCardFormData();
      console.log("🔍 Dados do formulário:", dados);

      if (!dados.token) throw new Error("Token do cartão não foi gerado.");

      const payload = {
        token: dados.token,
        payment_method_id: dados.paymentMethodId,
        issuer_id: dados.issuerId,
        transaction_amount: Number(dados.amount),
        installments: Number(dados.installments),
        payer: {
          email: dados.cardholderEmail,
          identification: {
            type: dados.identificationType,
            number: dados.identificationNumber,
          },
        },
      };

      const response = await axios.post("https://ironfit-backend.onrender.com/pagamento-cartao", payload);

      setStatus("✅ Pagamento realizado com sucesso!");
      console.log("✅ Resposta do pagamento:", response.data);
    } catch (error) {
      console.error("❌ Erro ao processar pagamento:", error);
      setErroPagamento(error.response?.data?.error || error.message || "Erro ao processar pagamento.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form id="form-checkout" onSubmit={handleSubmit}>
      <input type="text" id="form-checkout__cardholderName" placeholder="Nome como está no cartão" />
      <input type="email" id="form-checkout__cardholderEmail" placeholder="E-mail" />
      <input type="text" id="form-checkout__cardNumber" placeholder="Número do cartão" />
      <input type="text" id="form-checkout__expirationDate" placeholder="MM/AA" />
      <input type="text" id="form-checkout__securityCode" placeholder="Código de segurança" />
      <select id="form-checkout__installments"></select>
      <select id="form-checkout__identificationType">
        <option value="CPF">CPF</option>
        <option value="CNPJ">CNPJ</option>
      </select>
      <input type="text" id="form-checkout__identificationNumber" placeholder="Número do documento" />
      <select id="form-checkout__issuer"></select>

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Processando..." : "Pagar"}
      </button>

      {erroPagamento && <p style={{ color: 'red' }}>{erroPagamento}</p>}
      {status && <p style={{ color: 'green' }}>{status}</p>}
    </form>
  );
};

export default PagamentoCartao;