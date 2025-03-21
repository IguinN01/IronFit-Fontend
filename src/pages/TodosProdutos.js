import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import "../css/pages/TodosOsProdutos/todos_produtos.css";

const TodosProdutos = () => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [faixaPreco, setFaixaPreco] = useState('todos');
  const [ordenacao, setOrdenacao] = useState('relevancia');
  const [categoria, setCategoria] = useState('todas');

  useEffect(() => {
    fetch('https://ironfit-backend.onrender.com/produtos')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao buscar produtos');
        }
        return response.json();
      })
      .then(data => {
        console.log("Dados recebidos da API:", data);
        let produtosFiltrados = data;

        produtosFiltrados = produtosFiltrados.filter((produto) => {
          const preco = Number(produto.preco);
          if (faixaPreco === 'ate50') return preco <= 50;
          if (faixaPreco === '50a100') return preco > 50 && preco <= 100;
          if (faixaPreco === 'acima100') return preco > 100;
          return true;
        });

        if (categoria !== 'todas') {
          produtosFiltrados = produtosFiltrados.filter((produto) =>
            produto.categoria.toLowerCase() === categoria.toLowerCase()
          );
        }

        produtosFiltrados = ordenarProdutos(produtosFiltrados, ordenacao);

        setProdutos(produtosFiltrados);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, [faixaPreco, categoria, ordenacao]);

  const ordenarProdutos = (produtos, criterio) => {
    const produtosOrdenados = [...produtos];
    if (criterio === 'menorMaior') {
      return produtosOrdenados.sort((a, b) => Number(a.preco) - Number(b.preco));
    }
    if (criterio === 'maiorMenor') {
      return produtosOrdenados.sort((a, b) => Number(b.preco) - Number(a.preco));
    }
    if (criterio === 'relevancia') {
      return produtosOrdenados.sort(() => Math.random() - 0.5);
    }
    return produtosOrdenados;
  };

  if (loading) return <p>Carregando produtos...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <section className='bloco_todos_produtos'>
      <div className="div_todos_produtos">
        <h1>Todos nossos Produtos</h1>

        <section className="filtros">
          <h3>Filtros</h3>

          <div className="filtro">
            <p className="filtro-label">Preço:</p>
            <label className="radio-label">
              <input
                type="radio"
                name="preco"
                value="todos"
                checked={faixaPreco === 'todos'}
                onChange={(e) => setFaixaPreco(e.target.value)}
              />
              Todos
            </label>

            <label className="radio-label">
              <input
                type="radio"
                name="preco"
                value="ate50"
                checked={faixaPreco === 'ate50'}
                onChange={(e) => setFaixaPreco(e.target.value)}
              />
              Até R$50,00
            </label>

            <label className="radio-label">
              <input
                type="radio"
                name="preco"
                value="50a100"
                checked={faixaPreco === '50a100'}
                onChange={(e) => setFaixaPreco(e.target.value)}
              />
              R$50,00 a R$100,00
            </label>

            <label className="radio-label">
              <input
                type="radio"
                name="preco"
                value="acima100"
                checked={faixaPreco === 'acima100'}
                onChange={(e) => setFaixaPreco(e.target.value)}
              />
              Acima de R$100,00
            </label>
          </div>

          <div className="filtro">
            <p className="filtro-label">Categoria:</p>
            <label className="radio-label">
              <input
                type="radio"
                name="categoria"
                value="todas"
                checked={categoria === 'todas'}
                onChange={(e) => setCategoria(e.target.value)}
              />
              Todas
            </label>

            <label className="radio-label">
              <input
                type="radio"
                name="categoria"
                value="acessórios"
                checked={categoria === 'acessórios'}
                onChange={(e) => setCategoria(e.target.value)}
              />
              Acessórios
            </label>

            <label className="radio-label">
              <input
                type="radio"
                name="categoria"
                value="roupas"
                checked={categoria === 'roupas'}
                onChange={(e) => setCategoria(e.target.value)}
              />
              Roupas
            </label>

            <label className="radio-label">
              <input
                type="radio"
                name="categoria"
                value="snacks"
                checked={categoria === 'snacks'}
                onChange={(e) => setCategoria(e.target.value)}
              />
              Snacks
            </label>

            <label className="radio-label">
              <input
                type="radio"
                name="categoria"
                value="suplementos"
                checked={categoria === 'suplementos'}
                onChange={(e) => setCategoria(e.target.value)}
              />
              Suplementos
            </label>
          </div>

          <div className="filtro">
            <label htmlFor="ordenar" className="filtro-label">Ordenar por:</label>
            <select
              id="ordenar"
              value={ordenacao}
              onChange={(e) => setOrdenacao(e.target.value)}
              className="ordenar-select"
            >
              <option value="relevancia">Relevância</option>
              <option value="menorMaior">Preço: Menor para Maior</option>
              <option value="maiorMenor">Preço: Maior para Menor</option>
            </select>
          </div>
        </section>

        <ul>
          {produtos.map((produto, index) => (
            <li key={produto.IDProduto || `produto-${index}`}>
              <Link to={`/produto/${produto.IDProduto}`}>
                {produto.imagens && <img src={produto.imagens} alt={produto.nome} width="100" />}
                <h2>{produto.nome}</h2>
                <p>Preço: R${produto.preco}</p>
                <p>{produto.descricao_produto}</p>
              </Link>
              <button className="adicionar__carrinho add_car_todos">
                Adicionar ao Carrinho
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TodosProdutos;