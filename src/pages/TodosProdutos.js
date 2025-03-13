import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

const TodosProdutos = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [produtos, setProdutos] = useState([]);
  const [faixaPreco, setFaixaPreco] = useState('todos');
  const [ordenacao, setOrdenacao] = useState('relevancia');
  const [categoria, setCategoria] = useState('todas');
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search');

  useEffect(() => {
    document.title = 'Fran Artesanatos - Todos os Produtos';
    axios
      .get('https://fram-artesanatos-backend.onrender.com/produto')
      .then(({ data }) => {
        let produtosFiltrados = data;

        if (searchQuery) {
          produtosFiltrados = produtosFiltrados.filter((produto) =>
            produto.nome.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }

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
      })
      .catch((erro) => console.error('Erro ao buscar os produtos:', erro));
  }, [searchQuery, faixaPreco, categoria, ordenacao]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1639) {
        setIsMenuOpen(true);
      } else {
        setIsMenuOpen(false);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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

  return (
    <main className="principal new_design">

      <section className={`filtros ${isMenuOpen ? "active" : ""}`}>
        <button className="botao_filtros" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <h3 className='botao_filtro_texto'>
            Filtrar
          </h3>
        </button>

        <ul className={`filtros_lista ${isMenuOpen ? "active" : ""}`}>
          <h2 className="filtro_lista_titulo">Filtros</h2>

          <li className="filtro_lista_item">
            <div className='box_ordem_preco'>
              <div className="ordenacao">
                <label htmlFor="ordenar" className="filtro-label">Ordenar por:</label>
                <select
                  id="ordenar"
                  value={ordenacao}
                  onChange={(e) => setOrdenacao(e.target.value)}
                  className="ordenar-select"
                >
                  <option className='opcoes_ordem' value="relevancia">Relevância</option>
                  <option className='opcoes_ordem' value="menorMaior">Preço: Menor para Maior</option>
                  <option className='opcoes_ordem' value="maiorMenor">Preço: Maior para Menor</option>
                </select>
              </div>

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
            </div>

            <div className='box_categoria'>
              <div className="filtro">
                <p className="filtro-label">Filtrar por Categoria:</p>

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
                    value="Roupão"
                    checked={categoria === 'Roupão'}
                    onChange={(e) => setCategoria(e.target.value)}
                  />
                  Roupão
                </label>

                <label className="radio-label">
                  <input
                    type="radio"
                    name="categoria"
                    value="Kit"
                    checked={categoria === 'Kit'}
                    onChange={(e) => setCategoria(e.target.value)}
                  />
                  Kit
                </label>

                <label className="radio-label">
                  <input
                    type="radio"
                    name="categoria"
                    value="Fraldinha"
                    checked={categoria === 'Fraldinha'}
                    onChange={(e) => setCategoria(e.target.value)}
                  />
                  Fraldinha
                </label>

                <label className="radio-label">
                  <input
                    type="radio"
                    name="categoria"
                    value="Manta"
                    checked={categoria === 'Manta'}
                    onChange={(e) => setCategoria(e.target.value)}
                  />
                  Manta
                </label>

                <label className="radio-label">
                  <input
                    type="radio"
                    name="categoria"
                    value="Avental"
                    checked={categoria === 'Avental'}
                    onChange={(e) => setCategoria(e.target.value)}
                  />
                  Avental
                </label>

                <label className="radio-label">
                  <input
                    type="radio"
                    name="categoria"
                    value="Toalha"
                    checked={categoria === 'Toalha'}
                    onChange={(e) => setCategoria(e.target.value)}
                  />
                  Toalha
                </label>
              </div>
            </div>

          </li>
          <hr className="linha_pesquisa mb" />
        </ul>
      </section>

      <section className="produtos">
        {searchQuery && (
          <div className='pesquisa_todos'>
            <p className='texto_pesquisa'>
              Resultados da busca por: "{searchQuery}"
            </p>
          </div>
        )}

        {produtos.length > 0 ? (
          produtos.map((produto) => (
            <div key={produto.idproduto} className="produtos__1">
              <Link to={`/produto/${produto.idproduto}/${encodeURIComponent(produto.nome)}`} className="produto__link">
                <img className="produto__img" src={produto.imagens} alt={produto.nome} />
                <div className="produto__info">
                  <h3 className="produto__titulo">{produto.nome}</h3>
                  <p className="produto__descricao">{produto.descricao}</p>
                  <p className="produto__valor">R${Number(produto.preco).toFixed(2)}</p>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p className="sem-produtos">Nenhum produto encontrado com esses critérios.</p>
        )}
      </section>
    </main>
  );
};

export default TodosProdutos;