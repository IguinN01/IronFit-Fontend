import React, { useState, useEffect, useCallback, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { usePesquisa } from "../context/PesquisaContext";
import { useCarrinho } from "../context/CarrinhoContext";
import { AuthContext } from "../context/AuthContext";

import "../css/global/partials/header.css";
import "../css/global/partials/headerBusca.css";

const Header = ({ tipo }) => {
  const navigate = useNavigate();
  const { authToken } = useContext(AuthContext);
  const [menuAberto, setMenuAberto] = useState(false);
  const [menuCarrinhoAberto, setMenuCarrinhoAberto] = useState(false);
  const [mostrarHeader, setMostrarHeader] = useState(true);

  const location = useLocation();
  const { termoPesquisa, setTermoPesquisa } = usePesquisa();
  const { carrinho, alterarQuantidade, removerDoCarrinho } = useCarrinho();

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

  const alternarMenuCarrinho = () => {
    setMenuCarrinhoAberto((prev) => !prev);
  };

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

  const quantidadeItensCarrinho = carrinho.length;

  const precoTotal = carrinho.reduce((total, produto) => total + produto.preco * produto.quantidade, 0).toFixed(2);

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
          <Link to="/">
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
            <Link to="/" onClick={fecharMenu}>
              <p className="item_menu_hamburguer">Chat AI</p>
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
              <p className="item_menu_hamburguer link_1024">Nossos Produtos</p>
            </Link>
          </li>

          <li className="nav-lista_item">
            <Link to="/" onClick={fecharMenu}>
              <p className="item_menu_hamburguer menor_1024">Planos</p>
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