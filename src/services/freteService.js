import axios from 'axios';

export async function calcularFrete(cep) {
  const response = await axios.post('https://ironfit-backend.onrender.com/calcular-frete', {
    cepDestino: cep,
  });
  return response.data;
}