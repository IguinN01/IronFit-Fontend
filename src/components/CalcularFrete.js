import { useState } from 'react';
import { calcularFrete } from '../services/freteService';

function CalcularFrete({ onFreteSelecionado }) {
  const [cep, setCep] = useState('');
  const [frete, setFrete] = useState(null);
  const [distancia, setDistancia] = useState(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const formatarCep = (valor) => {
    const somenteNumeros = valor.replace(/\D/g, '');

    if (somenteNumeros.length <= 5) {
      return somenteNumeros;
    } else {
      return `${somenteNumeros.slice(0, 5)}-${somenteNumeros.slice(5, 8)}`;
    }
  };

  const handleChangeCep = (e) => {
    const valorDigitado = e.target.value;
    const cepFormatado = formatarCep(valorDigitado);
    setCep(cepFormatado);
    setErro('');
  };

  const handleCalcularFrete = async () => {
    setLoading(true);
    setErro('');

    try {
      const limparCep = cep.replace(/\D/g, '');

      if (limparCep.length !== 8) {
        setErro('Digite um CEP válido com 8 números.');
        setLoading(false);
        return;
      }

      const response = await calcularFrete(limparCep);

      setFrete(response.frete);
      setDistancia(response.distancia);

      if (onFreteSelecionado) {
        onFreteSelecionado(response.frete);
      }
    } catch (error) {
      console.error('Erro ao calcular o frete:', error);
      setErro('Erro ao calcular o frete. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Calcular Frete</h2>

      <input
        type="text"
        placeholder="Digite seu CEP"
        value={cep}
        onChange={handleChangeCep}
        maxLength="9"
      />

      <button onClick={handleCalcularFrete} disabled={loading}>
        {loading ? 'Calculando...' : 'Calcular'}
      </button>

      {erro && <p style={{ color: 'red', marginTop: '8px' }}>{erro}</p>}

      {frete && (
        <div>
          <p>Distância estimada: {distancia}</p>
          <p>Valor do Frete: {frete}</p>
        </div>
      )}
    </div>
  );
}

export default CalcularFrete;