import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cpf } from 'cpf-cnpj-validator';

import { useCarrinho } from '../context/CarrinhoContext';

export default function PagamentoCredito({ aoTokenizar }) {
  const { totalCarrinho, limparCarrinho } = useCarrinho();
  const [mensagemSucesso, setMensagemSucesso] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');
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
          cardExpirationDate: {
            id: "cardExpirationDate",
            placeholder: "MM/AA"
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

            const inputNumeroCartao = document.getElementById("numero-cartao");
            if (inputNumeroCartao) {
              inputNumeroCartao.maxLength = 19;

              inputNumeroCartao.addEventListener("input", (e) => {
                let value = e.target.value.replace(/\D/g, "");
                value = value.slice(0, 19);

                const partes = value.match(/.{1,4}/g);
                e.target.value = partes ? partes.join(" ") : "";
              });
            }

            const inputVencimento = document.getElementById("cardExpirationDate");
            if (inputVencimento) {
              inputVencimento.maxLength = 5;

              inputVencimento.addEventListener("input", (e) => {
                let value = e.target.value.replace(/\D/g, "");
                if (value.length >= 3) {
                  value = value.slice(0, 4).replace(/(\d{2})(\d{1,2})/, "$1/$2");
                }
                e.target.value = value;
              });
            }
          },
          onSubmit: event => {
            event.preventDefault();

            const vencimento = document.getElementById("cardExpirationDate").value.trim();
            const [mes, ano] = vencimento.split('/');

            if (!/^\d{2}\/\d{2}$/.test(vencimento) || !mes || !ano) {
              setMensagemErro("❌ Vencimento inválido. Use o formato MM/AA.");
              return;
            }

            const dados = window._cardForm.getCardFormData();

            if (!cpf.isValid(dados.identificationNumber)) {
              setMensagemErro("❌ CPF inválido.");
              setMensagemSucesso('');
              return;
            }

            const numeroCartao = document.getElementById("numero-cartao").value;
            const numeroCartaoLimpo = numeroCartao.replace(/\D/g, '');
            if (numeroCartaoLimpo.length !== 16) {
              setMensagemSucesso('');
              setMensagemErro("❌ Número do cartão inválido. Ele deve conter 16 dígitos.");
              return;
            }

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

            fetch('https://ironfit-backend.onrender.com/pagamento-credito', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(dadosParaEnvio)
            })
              .then(response => response.json())
              .then(data => {
                console.log('✅ Backend respondeu:', data);
              })
              .catch(error => {
                console.error('❌ Erro ao enviar dados para o backend:', error);
              });

            setTimeout(() => {
              limparCarrinho();
            }, 4500);

            setMensagemErro('');
            setMensagemSucesso("✅ Pagamento realizado com sucesso!");
            setFormVisivel(false);

            setTimeout(() => {
              navigate('/');
            }, 4500);
          }
        }
      });
    }
  }, [totalCarrinho, limparCarrinho, aoTokenizar, navigate]);

  return (
    <>
      {formVisivel && (
        <form id="formulario-pagamento">
          <input type="text" id="nome-cartao" placeholder="Nome no cartão" />
          <input type="email" id="email-comprador" placeholder="Email" />
          <input type="text" id="numero-cartao" placeholder="Número do cartão" />
          <input type="text" id="cardExpirationDate" placeholder="MM/AA" required />
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
      {mensagemErro && (
        <p style={{ marginTop: '10px' }}>
          {mensagemErro}
        </p>
      )}
    </>
  );
}