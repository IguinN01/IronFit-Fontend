import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { usePesquisa } from "../context/PesquisaContext";

import "../css/pages/TodosOsProdutos/todos_produtos.css";

const TodosProdutos = () => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [precoMax, setPrecoMax] = useState(300);
  const [ordenacao, setOrdenacao] = useState("relevancia");
  const [categoria, setCategoria] = useState("todas");

  const { termoPesquisa } = usePesquisa();

  useEffect(() => {
    fetch("https://ironfit-backend.onrender.com/produtos")
      .then(response => {
        if (!response.ok) throw new Error("Erro ao buscar produtos");
        return response.json();
      })
      .then(data => {
        console.log("Dados recebidos da API:", data);
        setProdutos(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const produtosFiltrados = produtos
    .filter(produto =>
      produto.nome.toLowerCase().includes(termoPesquisa.toLowerCase())
    )
    .filter(produto => Number(produto.preco) <= precoMax)
    .filter(produto => categoria === "todas" || produto.categoria.toLowerCase() === categoria.toLowerCase())
    .sort((a, b) => {
      if (ordenacao === "menorMaior") return Number(a.preco) - Number(b.preco);
      if (ordenacao === "maiorMenor") return Number(b.preco) - Number(a.preco);
      return Math.random() - 0.5;
    });

  const exibirResultadoBusca = termoPesquisa ? `Resultados da busca por: "${termoPesquisa}"` : "Todos nossos produtos";

  if (loading) return <p className="bloco_todos_produtos">Carregando produtos...</p>;
  if (error) return <p className="bloco_todos_produtos">Erro: {error}</p>;

  return (
    <section className="bloco_todos_produtos">
      <div className="div_todos_produtos">
        <section className="filtros">
          <h3>Filtros</h3>

          <div className="filtro">
            <p className="filtro-label">Preço máximo:</p>
            <input
              type="range"
              min="0"
              max="300"
              step="5"
              value={precoMax}
              onChange={(e) => setPrecoMax(Number(e.target.value))}
            />
            <p>Até R${precoMax}</p>
          </div>

          <div className="filtro">
            <p className="filtro-label">Categoria:</p>
            {["todas", "Acessórios", "Roupas", "Snacks", "Suplementos"].map(cat => (
              <label key={cat} className="radio-label">
                <input
                  type="radio"
                  name="categoria"
                  value={cat}
                  checked={categoria === cat}
                  onChange={(e) => setCategoria(e.target.value)}
                />
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </label>
            ))}
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

        <p>{exibirResultadoBusca}</p>
        {produtosFiltrados.length === 0 && <p>Nenhum produto encontrado com esses critérios.</p>}

        <ul>
          {produtosFiltrados.map((produto, index) => (
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