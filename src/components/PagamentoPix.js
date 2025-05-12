import { useState } from 'react';

export default function PagamentoPix({ amount = "10" }) {
  const [qrCodeBase64, setQrCodeBase64] = useState(null);
  const [paymentId, setPaymentId] = useState(null);
  const [pixCopiaECola, setPixCopiaECola] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);
  const [copiado, setCopiado] = useState(false);

  const verificarLogin = () => {
    const token = localStorage.getItem("token");
    return token && token !== '';
  };

  const gerarPagamentoPix = async () => {
    if (!verificarLogin()) {
      setErro('Você precisa estar logado para gerar o pagamento via Pix.');
      return;
    }

    setCarregando(true);
    setErro(null);
    setCopiado(false);

    try {
      const resposta = await fetch("https://ironfit-backend.onrender.com/pagamento-pix", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          email: localStorage.getItem("email"),
          amount,
        }),
      });

      const dados = await resposta.json();

      if (resposta.ok) {
        setQrCodeBase64(dados.qrCodeBase64);
        setPaymentId(dados.id);
        setPixCopiaECola(dados.pixCopiaECola);
      } else {
        setErro(dados.erro || "Erro ao gerar pagamento Pix");
      }
    } catch (e) {
      setErro("Erro na comunicação com o servidor.");
      console.error(e);
    }

    setCarregando(false);
  };

  const copiarCodigo = () => {
    if (pixCopiaECola) {
      navigator.clipboard.writeText(pixCopiaECola);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    }
  };

  return (
    <div>

      {!verificarLogin() && (
        <div className='texto_fazer_login'>
          <p>Você precisa estar logado para realizar o pagamento.</p>
          <p><a href="/login">Clique aqui para fazer login.</a></p>
        </div>
      )}

      {!qrCodeBase64 && verificarLogin() && (
        <>
          <div className='botao_gerar_pix'>
            <button className='botao_pix' onClick={gerarPagamentoPix} disabled={carregando}>
              {carregando ? "Gerando..." : "Gerar QR Code"}
            </button>
          </div>
        </>
      )}

      {erro && <p>{erro}</p>}

      {qrCodeBase64 && (
        <div className='info_pix'>
          <p>Escaneie o QR Code abaixo:</p>
          <img className='qrcode_pix' src={`data:image/png;base64,${qrCodeBase64}`} alt="QR Code Pix" />
          <div>
            <p>ID do Pagamento: {paymentId}</p>
            <p>Ou copie o código Pix:</p>
          </div>

          {pixCopiaECola && (
            <div>
              <span className='codigo_pix' style={{ display: 'block', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                {pixCopiaECola}
              </span>
              <button className='botao_pix' onClick={copiarCodigo}>
                {copiado ? "Copiado!" : "Copiar código"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}