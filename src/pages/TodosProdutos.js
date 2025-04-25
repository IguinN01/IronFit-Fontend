import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Slider from "rc-slider";

import { usePesquisa } from "../context/PesquisaContext";
import { useCarrinho } from "../context/CarrinhoContext";

import "rc-slider/assets/index.css";
import "../css/pages/TodosOsProdutos/todos_produtos.css";

const TodosProdutos = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoriaInicial = queryParams.get("categoria") || "todas";

  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [precoRange, setPrecoRange] = useState([0, 300]);
  const [ordenacao, setOrdenacao] = useState("relevancia");
  const [categoria, setCategoria] = useState(categoriaInicial);
  const [filtrosVisiveis, setFiltrosVisiveis] = useState(false);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const produtosPorPagina = 7;

  const { termoPesquisa } = usePesquisa();
  const { adicionarAoCarrinho } = useCarrinho();

  useEffect(() => {
    setPaginaAtual(1);
  }, [ordenacao]);

  useEffect(() => {
    setPaginaAtual(1);
  }, [termoPesquisa, categoria, precoRange]);

  useEffect(() => {
    setTimeout(() => {
      const primeiroProduto = document.querySelector(".bloco_todos_produtos");
      if (primeiroProduto) {
        primeiroProduto.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  }, [paginaAtual]);

  useEffect(() => {
    fetch("https://ironfit-backend.onrender.com/produtos")
      .then(response => {
        if (!response.ok) throw new Error("Erro ao buscar produtos");
        return response.json();
      })
      .then(data => {
        const produtosEmbaralhados = [...data].sort(() => Math.random() - 0.5);
        setProdutos(produtosEmbaralhados);
        setCarregando(false);
      })
      .catch(error => {
        setErro(error.message);
        setCarregando(false);
      });
  }, []);

  const produtosFiltrados = [...produtos]
    .filter(produto =>
      produto.nome.toLowerCase().startsWith(termoPesquisa.toLowerCase())
    )
    .filter(produto =>
      Number(produto.preco) >= precoRange[0] && Number(produto.preco) <= precoRange[1]
    )
    .filter(produto =>
      categoria === "todas" || produto.categoria.toLowerCase() === categoria.toLowerCase()
    );

  if (produtosFiltrados.length === 0 && termoPesquisa) {
    produtosFiltrados.push(...produtos.filter(produto =>
      produto.nome.toLowerCase().includes(termoPesquisa.toLowerCase())
    ));
  }

  const exibirResultadoBusca = termoPesquisa
    ? `Resultados da busca por: "${termoPesquisa}"`
    : "Todos nossos produtos";

  const produtosOrdenados = [...produtosFiltrados].sort((a, b) => {
    const precoA = Number(a.preco);
    const precoB = Number(b.preco);

    if (ordenacao === "menorMaior") return precoA - precoB;
    if (ordenacao === "maiorMenor") return precoB - precoA;
    return 0;
  });

  const produtosPaginaAtual = produtosOrdenados.slice(
    (paginaAtual - 1) * produtosPorPagina,
    paginaAtual * produtosPorPagina
  );

  const totalPaginas = Math.ceil(produtosFiltrados.length / produtosPorPagina);

  if (carregando) return <p className="bloco_todos_produtos">Carregando produtos...</p>;
  if (erro) return <p className="bloco_todos_produtos">Erro: {erro}</p>;

  return (
    <section className="bloco_todos_produtos">
      <div className="div_todos_produtos">
        <button
          className="botao_filtros"
          onClick={() => setFiltrosVisiveis(!filtrosVisiveis)}
        >
          Filtros {filtrosVisiveis ? "▲" : "▼"}
        </button>

        <section className={`filtros ${filtrosVisiveis ? "aberto" : ""}`}>
          <div className="filtro filtro_preco">
            <p className="filtro-label">Preço:</p>
            <Slider
              range
              min={0}
              max={300}
              step={5}
              value={precoRange}
              onChange={(val) => setPrecoRange(val)}
            />
            <p>R$ {precoRange[0]},00 - R$ {precoRange[1]},00</p>
          </div>

          <div className="filtro">
            <p className="filtro-label">Categoria:</p>
            {["todas", "Acessórios", "Roupas", "Snacks", "Suplementos"].map(cat => (
              <label key={cat} className="radio-label">
                <input
                  type="radio"
                  id="radio"
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

        <p className="resultado_busca">{exibirResultadoBusca}</p>
        {produtosFiltrados.length === 0 && <p>Nenhum produto encontrado com esses critérios.</p>}

        <ul>
          {produtosPaginaAtual.map((produto, index) => (
            <li key={produto.idproduto || `produto-${index}`} id={`produto-${produto.idproduto}`}>
              <Link to={`/produto/${produto.idproduto}`}>
                {produto.imagens && <img className="img_produto" src={produto.imagens} alt={produto.nome} />}
                <h2>{produto.nome}</h2>
                <p>Preço: R${produto.preco}</p>
                <p>{produto.descricao_produto}</p>
              </Link>
              <button
                className="adicionar__carrinho"
                onClick={() => adicionarAoCarrinho(produto)}
              >
                Adicionar ao Carrinho
              </button>
            </li>
          ))}
        </ul>

        <div className="paginas">
          <button onClick={() => setPaginaAtual(paginaAtual - 1)} disabled={paginaAtual === 1}>
            &#x021A9;
          </button>

          {[...Array(totalPaginas)].map((_, index) => {
            const num = index + 1;
            return (
              <button
                key={num}
                className={num === paginaAtual ? "pagina-ativa" : ""}
                onClick={() => setPaginaAtual(num)}
              >
                {num}
              </button>
            );
          })}

          <button onClick={() => setPaginaAtual(paginaAtual + 1)} disabled={paginaAtual === totalPaginas}>
            &#x021AA;
          </button>
        </div>
      </div>
    </section>
  );
};

export default TodosProdutos;