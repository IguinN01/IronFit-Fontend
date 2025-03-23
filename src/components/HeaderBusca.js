import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { usePesquisa } from "../context/PesquisaContext";
import { useCarrinho } from "../context/CarrinhoContext";

import "../css/global/partials/header.css";
import "../css/global/partials/headerBusca.css";

const Header = ({ tipo }) => {
  const [menuAberto, setMenuAberto] = useState(false);
  const [menuCarrinhoAberto, setMenuCarrinhoAberto] = useState(false);
  const [mostrarHeader, setMostrarHeader] = useState(true);

  const location = useLocation();
  const { termoPesquisa, setTermoPesquisa } = usePesquisa();

  const alternarMenu = () => {
    setMenuAberto((prev) => !prev);
    if (menuCarrinhoAberto) {
      setMenuCarrinhoAberto(false);
    }
  };

  const fecharMenu = () => setMenuAberto(false);

  const alternarMenuCarrinho = () => {
    setMenuCarrinhoAberto((prev) => !prev);
  };

  const fecharMenuCarrinho = () => {
    setMenuCarrinhoAberto(false);
    fecharMenu();
  };

  const { carrinho } = useCarrinho();

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
  }, [menuAberto, menuCarrinhoAberto]);

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
          <button className="botao_carrinho" onClick={alternarMenuCarrinho}>
            Seu Carrinho
          </button>
          <Link to="/">
            <p className="item_menu_hamburguer link_1024">Planos</p>
          </Link>
          <Link to="/">
            <p className="item_menu_hamburguer link_1024 link_1280">Sua Conta</p>
          </Link>
        </div>

        {location.pathname === "/todos_produtos" && (
          <div className="campo-pesquisa">
            <input
              type="text"
              maxLength={85}
              placeholder="Encontre o que procura aqui..."
              className="input-pesquisa"
              value={termoPesquisa}
              onChange={(e) => {
                setTermoPesquisa(
                  e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1).toLowerCase()
                );
                fecharMenu();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.target.blur();
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
          <div className={`linhas_harburguer ${menuAberto ? "ativo" : ""}`}>
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

          <li className="nav-lista_item">
            <Link to="/" onClick={fecharMenu}>
              <p className="item_menu_hamburguer menor_1280">Sua Conta</p>
            </Link>
          </li>

          <li className="nav-lista_item">
            <button onClick={alternarMenuCarrinho} className="item_menu_hamburguer menor_1024 botao_carrinho_menu">
              Seu Carrinho
            </button>
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

      <div className={`menu-carrinho ${menuCarrinhoAberto ? "ativo" : ""}`}>
        <button className="cabecalho_nav_menu_hamburguer" onClick={fecharMenuCarrinho} aria-label="Menu">
          <div className={`linhas_harburguer ${menuAberto || menuCarrinhoAberto ? "ativo" : ""}`}>
            <div className="botao_hamburguer linha1"></div>
            <div className="botao_hamburguer linha2"></div>
            <div className="botao_hamburguer linha3"></div>
          </div>
        </button>
        <h2>Seu Carrinho</h2>
        {carrinho.length === 0 ? (
          <p>Seu carrinho está vazio.</p>
        ) : (
          <ul>
            {carrinho.map((produto, index) => (
              <li key={index}>
                <img src={produto.imagens} alt={produto.nome} width="50" />
                <p>{produto.nome}</p>
                <p>R$ {produto.preco}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </header>
  );
};

export default Header;