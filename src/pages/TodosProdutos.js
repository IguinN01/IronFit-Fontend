import { useEffect, useState } from 'react';
import "../css/pages/TodosOsProdutos/todos_produtos.css";

const TodosProdutos = () => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://ironfit-backend.onrender.com/produtos')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao buscar produtos');
        }
        return response.json();
      })
      .then(data => {
        console.log("Dados recebidos da API:", data); // Log para verificar os dados
        setProdutos(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Carregando produtos...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <section className='bloco_todos_produtos'>
      <div className="div_todos_produtos">
        <h1>Todos nossos Produtos</h1>
        <ul>
          {produtos.map((produto, index) => (
            <li key={produto.IDProduto || `produto-${index}`}>
              {produto.imagens && <img src={produto.imagens} alt={produto.nome} width="100" />}
              <h2>{produto.nome}</h2>
              <p>Preço: R${produto.preco}</p>
              <p>{produto.descricao_produto}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TodosProdutos;