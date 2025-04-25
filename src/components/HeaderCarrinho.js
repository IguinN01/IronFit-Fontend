import React, { useState, useEffect, useCallback, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { usePesquisa } from "../context/PesquisaContext";
import { AuthContext } from "../context/AuthContext";

import "../css/global/partials/header.css";
import "../css/global/partials/headerBusca.css";

const Header = ({ tipo }) => {
  const navigate = useNavigate();
  const { authToken } = useContext(AuthContext);
  const [menuAberto, setMenuAberto] = useState(false);
  const [menuCarrinhoAberto, setMenuCarrinhoAberto] = useState(false);
  const [mostrarHeader, setMostrarHeader] = useState(true);

  const [produtos, setProdutos] = useState([]);
  const [ordenacao] = useState("relevancia");

  const location = useLocation();
  const { termoPesquisa, setTermoPesquisa } = usePesquisa();

  const fecharMenu = useCallback(() => setMenuAberto(false), []);

  const fecharMenuCarrinho = useCallback(() => {
    setMenuCarrinhoAberto(false);
    fecharMenu();
  }, [fecharMenu]);

  const alternarMenu = () => {
    setMenuAberto((prev) => !prev);
    if (menuCarrinhoAberto) {
      setMenuCarrinhoAberto(false);
    }
  };

  const produtosFiltrados = produtos.filter((produto) =>
    produto.nome.toLowerCase().startsWith(termoPesquisa.toLowerCase())
  );

  const usarIncludes =
    termoPesquisa &&
    produtosFiltrados.length === 0 &&
    produtos.filter((produto) =>
      produto.nome.toLowerCase().includes(termoPesquisa.toLowerCase())
    );

  const resultadosPesquisa = produtosFiltrados.length > 0
    ? produtosFiltrados
    : usarIncludes || [];

  const produtosOrdenados = [...resultadosPesquisa].sort((a, b) => {
    if (ordenacao === "preco-asc") {
      return a.preco - b.preco;
    } else if (ordenacao === "preco-desc") {
      return b.preco - a.preco;
    } else if (ordenacao === "relevancia") {
      return 0.5 - Math.random();
    }
    return 0;
  });

  useEffect(() => {
    fetch('https://ironfit-backend.onrender.com/produtos')
      .then(res => res.json())
      .then(data => setProdutos(data));
  }, []);

  useEffect(() => {
    let prevScrollPos = window.pageYOffset;

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setMostrarHeader(prevScrollPos > currentScrollPos);
      prevScrollPos = currentScrollPos;

      if (menuAberto || menuCarrinhoAberto) {
        fecharMenu();
        fecharMenuCarrinho();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuAberto, menuCarrinhoAberto, fecharMenu, fecharMenuCarrinho]);

  return (
    <header className={`cabecalho ${mostrarHeader ? "visivel" : "escondido"}`}>
      <nav className={`cabecalho_nav ${menuAberto ? "ativo" : ""}`}>
        <div className="div_titulo_academia">
          <Link to="/">
            <h1 className="titulo_academia">
              Iron <b className="titulo_academia_destaque">Fit</b>
            </h1>
          </Link>
        </div>

        <div className="links_1024">
          <Link to="/todos_produtos">
            <p className="item_menu_hamburguer link_1024">Nossos Produtos</p>
          </Link>
          <Link to="/#planos" onClick={fecharMenu}>
            <p className="item_menu_hamburguer link_1024">Planos</p>
          </Link>
          {authToken ? (
            <Link to="/perfil">
              <p className="item_menu_hamburguer link_1024 link_1280">Perfil</p>
            </Link>
          ) : (
            <Link to="/cadastro">
              <p className="item_menu_hamburguer link_1024 link_1280">Sua Conta</p>
            </Link>
          )}
        </div>

        {(location.pathname.startsWith("/todos_produtos") || location.pathname.startsWith("/produto/") || location.pathname.startsWith("/checkout")) && (
          <div className="campo-pesquisa">
            <input
              type="text"
              id="pesquisa"
              maxLength={85}
              placeholder="Encontre o que procura aqui..."
              className="input-pesquisa"
              value={termoPesquisa}
              onChange={(e) => {
                const termo = e.target.value;
                setTermoPesquisa(
                  termo.charAt(0).toUpperCase() + termo.slice(1).toLowerCase()
                );
                fecharMenuCarrinho();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  navigate("/todos_produtos");
                }
              }}
            />
          </div>
        )}

        {termoPesquisa && resultadosPesquisa.length > 0 && (
          <div className="destaques-home">
            <h2>Resultado da pesquisa:</h2>
            <div className="produtos-grid">
              {produtosOrdenados.slice(0, 3).map((produto) => (
                <Link
                  to={`/produto/${produto.idproduto}`}
                  key={produto.idproduto}
                  onClick={() => setTermoPesquisa("")}
                >
                  <div className="produto-card">
                    <img className="img-pesquisado" src={produto.imagens} alt={produto.nome} />
                    <h3>{produto.nome}</h3>
                    <p>R${produto.preco}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <button
          className={`cabecalho_nav_menu_hamburguer ${menuCarrinhoAberto ? "ativo" : ""}`}
          onClick={alternarMenu}
          aria-label="Menu"
        >
          <div className={`linhas_hamburguer ${menuAberto ? "ativo" : ""}`}>
            <div className="botao_hamburguer linha1"></div>
            <div className="botao_hamburguer linha2"></div>
            <div className="botao_hamburguer linha3"></div>
          </div>
        </button>

        <ul className={`nav-lista ${menuAberto ? "ativo" : ""}`}>
          <li className="nav-lista_item">
            <Link to="/#planos" onClick={fecharMenu}>
              <p className="item_menu_hamburguer menor_1024">Planos</p>
            </Link>
          </li>

          {authToken ? (
            <>
              <li className="nav-lista_item">
                <Link to="/perfil" onClick={fecharMenu}>
                  <p className="item_menu_hamburguer">Perfil</p>
                </Link>
              </li>
            </>
          ) : (
            <li className="nav-lista_item">
              <Link to="/cadastro" onClick={fecharMenu}>
                <p className="item_menu_hamburguer menor_1280">Sua Conta</p>
              </Link>
            </li>
          )}

          <li className="nav-lista_item">
            <Link to="/todos_produtos">
              <p className="item_menu_hamburguer menor_1024">Nossos Produtos</p>
            </Link>
          </li>

          <li className="nav-lista_item">
            <Link to="/horarios" onClick={fecharMenu}>
              <p className="item_menu_hamburguer">Horários</p>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;