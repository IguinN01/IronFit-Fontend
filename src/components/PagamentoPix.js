import { useState } from 'react';
import { useNavigate } from 'react-router-dom';  

export default function PagamentoPix({ amount = "10" }) {
  const [qrCodeBase64, setQrCodeBase64] = useState(null);
  const [paymentId, setPaymentId] = useState(null);
  const [pixCopiaECola, setPixCopiaECola] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);
  const [copiado, setCopiado] = useState(false);
  const navigate = useNavigate();  

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
    <div style={{ marginTop: "20px" }}>
      <h3>Pagamento via Pix</h3>

      {!verificarLogin() && (
        <div style={{ color: "red", marginBottom: "10px" }}>
          <p>Você precisa estar logado para realizar o pagamento via Pix.</p>
          <p><a href="/login" style={{ color: "blue" }}>Clique aqui para fazer login.</a></p>
        </div>
      )}

      {!qrCodeBase64 && verificarLogin() && (
        <button onClick={gerarPagamentoPix} disabled={carregando}>
          {carregando ? "Gerando..." : "Gerar QR Code"}
        </button>
      )}

      {erro && <p style={{ color: "red" }}>{erro}</p>}

      {qrCodeBase64 && (
        <div style={{ marginTop: "10px" }}>
          <p>Escaneie o QR Code abaixo com seu app de banco:</p>
          <img src={`data:image/png;base64,${qrCodeBase64}`} alt="QR Code Pix" width={'150px'} />
          <p>ID do Pagamento: {paymentId}</p>

          {pixCopiaECola && (
            <div style={{ marginTop: "10px" }}>
              <p>Ou copie o código Pix:</p>
              <textarea
                readOnly
                value={pixCopiaECola}
                style={{ width: "316px", height: "60px" }}
              />
              <button onClick={copiarCodigo} style={{ marginTop: "5px" }}>
                {copiado ? "Copiado!" : "Copiar código"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}