import React, { useEffect, useState } from 'react';
import { useCarrinho } from '../context/CarrinhoContext';
import { useNavigate } from 'react-router-dom';

export default function PagamentoCredito({ aoTokenizar }) {
  const { totalCarrinho, limparCarrinho } = useCarrinho();
  const [mensagemSucesso, setMensagemSucesso] = useState('');
  const [formVisivel, setFormVisivel] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (window._cardForm) {
      window._cardForm.unmount();
      delete window._cardForm;
    }

    const mercadopago = new window.MercadoPago("TEST-118c78db-f963-423b-bafe-bbf415ea5ba6", {
      locale: 'pt-BR'
    });

    if (!window._cardForm) {
      window._cardForm = mercadopago.cardForm({
        amount: String(totalCarrinho.toFixed(2)),
        autoMount: true,
        form: {
          id: "formulario-pagamento",
          cardholderName: {
            id: "nome-cartao",
            placeholder: "Nome impresso no cartão"
          },
          cardholderEmail: {
            id: "email-comprador",
            placeholder: "E-mail"
          },
          cardNumber: {
            id: "numero-cartao",
            placeholder: "Número do cartão"
          },
          cardExpirationMonth: {
            id: "cardExpirationMonth",
            placeholder: "MM"
          },
          cardExpirationYear: {
            id: "cardExpirationYear",
            placeholder: "YY"
          },
          securityCode: {
            id: "codigo-seguranca",
            placeholder: "CVC"
          },
          identificationNumber: {
            id: "numero-documento",
            placeholder: "CPF"
          },
          issuer: {
            id: "bandeira-cartao"
          },
          installments: {
            id: "parcelas"
          }
        },
        callbacks: {
          onFormMounted: error => {
            if (error) return console.warn("Erro ao montar o formulário:", error);
          },
          onSubmit: event => {
            event.preventDefault();

            const dados = window._cardForm.getCardFormData();

            if (!dados.token) {
              console.warn("❌ Token não foi gerado:", dados);
              return;
            }

            const dadosParaEnvio = {
              token: dados.token,
              paymentMethodId: dados.paymentMethodId,
              issuerId: dados.issuerId,
              installments: Number(dados.installments),
              identificationNumber: dados.identificationNumber,
              identificationType: "CPF",
              email: dados.cardholderEmail,
              amount: String(totalCarrinho)
            };

            console.log("📦 Dados enviados para o backend (cartão):", dadosParaEnvio);

            aoTokenizar(dadosParaEnvio);

            setTimeout(() => {
              limparCarrinho();
            }, 6000);

            setMensagemSucesso("✅ Pagamento realizado com sucesso!");
            setFormVisivel(false);

            setTimeout(() => {
              navigate('/');
            }, 3000);
          }
        }
      });
    }
  }, [totalCarrinho, aoTokenizar, navigate]);

  return (
    <>
      {formVisivel && (
        <form id="formulario-pagamento">
          <input type="text" id="nome-cartao" placeholder="Nome no cartão" />
          <input type="email" id="email-comprador" placeholder="Email" />
          <input type="text" id="numero-cartao" placeholder="Número do cartão" />

          <input
            type="text"
            id="cardExpirationMonth"
            name="cardExpirationMonth"
            placeholder="MM"
          />
          <input
            type="text"
            id="cardExpirationYear"
            name="cardExpirationYear"
            placeholder="YY"
          />

          <input type="text" id="codigo-seguranca" placeholder="CVC" />
          <input type="text" id="numero-documento" placeholder="CPF" />
          <select id="bandeira-cartao"></select>
          <select id="parcelas"></select>
          <button type="submit">Pagar</button>
        </form>
      )}

      {mensagemSucesso && (
        <p style={{ marginTop: '10px' }}>
          {mensagemSucesso}
        </p>
      )}
    </>
  );
}