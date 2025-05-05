import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cpf } from 'cpf-cnpj-validator';

import { useCarrinho } from '../context/CarrinhoContext';

export default function PagamentoCredito({ aoTokenizar, valorTotal }) {
  const verificarLogin = () => {
    const token = localStorage.getItem("token");
    return token && token !== '';
  };

  const { limparCarrinho } = useCarrinho();
  const [mensagemSucesso, setMensagemSucesso] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');
  const [formVisivel, setFormVisivel] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!window._cardForm || !window._cardForm.mounted) {
      if (window._cardForm) {
        try {
          window._cardForm.unmount();
        } catch (erro) {
          console.warn("⚠️ Formulário ainda não estava montado:", erro);
        }
        delete window._cardForm;
      }

      const mercadopago = new window.MercadoPago("TEST-118c78db-f963-423b-bafe-bbf415ea5ba6", {
        locale: 'pt-BR'
      });

      window._cardForm = mercadopago.cardForm({
        amount: String(valorTotal),
        autoMount: true,
        form: {
          id: "formulario-pagamento",
          cardholderName: { id: "nome-cartao", placeholder: "Nome impresso no cartão" },
          cardholderEmail: { id: "email-comprador", placeholder: "E-mail" },
          cardNumber: { id: "numero-cartao", placeholder: "Número do cartão" },
          cardExpirationDate: { id: "cardExpirationDate", placeholder: "MM/AA" },
          securityCode: { id: "codigo-seguranca", placeholder: "CVC" },
          identificationNumber: { id: "numero-documento", placeholder: "CPF" },
          issuer: { id: "bandeira-cartao" },
          installments: { id: "parcelas" }
        },
        callbacks: {
          onFormMounted: error => {
            if (error) {
              console.warn("❌ Erro ao montar o formulário:", error);
            } else {
              console.log("✅ Formulário montado com sucesso.");
            }
          },
          onSubmit: async event => {
            event.preventDefault();

            setMensagemErro("");
            setMensagemSucesso("");

            const nomeCartao = document.getElementById("nome-cartao").value.trim();
            const email = document.getElementById("email-comprador").value.trim();
            const numeroCartao = document.getElementById("numero-cartao").value.trim();
            const vencimento = document.getElementById("cardExpirationDate").value.trim();
            const cvc = document.getElementById("codigo-seguranca").value.trim();
            const cpfValor = document.getElementById("numero-documento").value.trim();
            const dados = window._cardForm.getCardFormData();

            const campos = [
              { nome: "Nome no cartão", valor: nomeCartao },
              { nome: "Email", valor: email },
              { nome: "Número do cartão", valor: numeroCartao },
              { nome: "Vencimento", valor: vencimento },
              { nome: "CVC", valor: cvc },
              { nome: "CPF", valor: cpfValor },
            ];

            const campoVazio = campos.find(campo => campo.valor === "");

            if (campoVazio) {
              setMensagemErro(`❌ O campo "${campoVazio.nome}" deve ser preenchido.`);
              return;
            }

            if (!/^\d{2}\/\d{2}$/.test(vencimento)) {
              setMensagemErro("❌ Vencimento inválido. Use o formato MM/AA.");
              return;
            }

            const [mes, ano] = vencimento.split("/");

            if (!mes || !ano) {
              setMensagemErro("❌ Data de vencimento incompleta.");
              return;
            }

            if (cvc.length < 3) {
              setMensagemErro("❌ O código de segurança (CVC) deve ter ao menos 3 dígitos.");
              return;
            }

            const numeroCartaoLimpo = numeroCartao.replace(/\D/g, '');
            if (numeroCartaoLimpo.length !== 16) {
              setMensagemErro("❌ Número do cartão inválido. Ele deve conter 16 dígitos.");
              return;
            }

            if (!cpf.isValid(dados.identificationNumber)) {
              setMensagemErro("❌ CPF inválido.");
              return;
            }

            if (!dados.token) {
              console.warn("❌ Token não foi gerado:", dados);
              setMensagemErro("❌ Erro ao gerar o token do cartão.");
              return;
            }

            const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
            const frete = parseFloat(localStorage.getItem("frete")) || 0;

            const dadosParaEnvio = {
              token: dados.token,
              paymentMethodId: dados.paymentMethodId,
              issuerId: dados.issuerId,
              installments: Number(dados.installments),
              identificationNumber: dados.identificationNumber,
              identificationType: "CPF",
              email: dados.cardholderEmail,
              amount: String(valorTotal),
              carrinho: carrinho.map(item => ({
                nome: item.nome,
                imagem: item.imagens,
                valor: item.preco,
                quantidade: item.quantidade || 1
              })),
              frete
            };

            console.log("📦 Dados enviados para o backend (cartão):", dadosParaEnvio);

            try {
              const resposta = await fetch('https://ironfit-backend.onrender.com/pagamento-credito', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(dadosParaEnvio)
              });

              const token = localStorage.getItem("token");
              if (!token) {
                setMensagemErro("❌ Você precisa estar logado para finalizar o pagamento.");
                return;
              }

              const resultado = await resposta.json();
              console.log('✅ Backend respondeu:', resultado);

              setMensagemErro('');
              setMensagemSucesso("✅ Pagamento realizado com sucesso!");
              setFormVisivel(false);

              setTimeout(() => {
                limparCarrinho();
                navigate('/');
              }, 4500);
            } catch (erro) {
              console.error("❌ Erro no pagamento:", erro);
              setMensagemErro("❌ Falha ao processar o pagamento.");
            }
          }
        }
      });

      window._cardForm.mounted = true;

      const nomeCartaoInput = document.getElementById("nome-cartao");
      if (nomeCartaoInput) {
        nomeCartaoInput.setAttribute("maxlength", "30");
        nomeCartaoInput.addEventListener("input", (e) => {
          e.target.value = e.target.value.replace(/[^A-Za-zÀ-ÿ\s]/g, '');
        });
      }

      const emailInput = document.getElementById("email-comprador");
      if (emailInput) {
        emailInput.setAttribute("maxlength", "75");
      }

      const numeroCartaoInput = document.getElementById("numero-cartao");
      if (numeroCartaoInput) {
        numeroCartaoInput.setAttribute("maxlength", "19");
        numeroCartaoInput.addEventListener("input", (e) => {
          let valor = e.target.value.replace(/\D/g, '');
          valor = valor.slice(0, 16);
          valor = valor.replace(/(\d{4})(?=\d)/g, '$1 ');
          e.target.value = valor;
        });
      }

      const vencimentoInput = document.getElementById("cardExpirationDate");
      if (vencimentoInput) {
        vencimentoInput.setAttribute("maxlength", "5");
      }

      const cvcInput = document.getElementById("codigo-seguranca");
      if (cvcInput) {
        cvcInput.setAttribute("maxlength", "4");
        cvcInput.addEventListener("input", (e) => {
          e.target.value = e.target.value.replace(/\D/g, '');
        });
      }

      const cpfInput = document.getElementById("numero-documento");
      if (cpfInput) {
        cpfInput.setAttribute("maxlength", "11");
        cpfInput.addEventListener("input", (e) => {
          e.target.value = e.target.value.replace(/\D/g, '');
        });
      }
    }
  }, [valorTotal, limparCarrinho, navigate]);

  return (
    <>
      {!verificarLogin() ? (
        <div style={{ color: "red", marginTop: "20px" }}>
          <p>Você precisa estar logado para realizar o pagamento com cartão de crédito.</p>
          <p><a href="/login" style={{ color: "blue" }}>Clique aqui para fazer login.</a></p>
        </div>
      ) : (
        <>
          {formVisivel && (
            <form id="formulario-pagamento">
              <input type="text" id="nome-cartao" placeholder="Nome no cartão" />
              <input type="email" id="email-comprador" placeholder="Confirme seu E-Mail" />
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
      )}
    </>
  );
}