import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../css/global/partials/header.css";
import "../css/global/partials/carrinhoLateral.css";

const Header = () => {
  const { authToken } = useContext(AuthContext);
  const [menuAberto, setmenuAberto] = useState(false);
  const [mostrarHeader, setMostrarHeader] = useState(true);
  const location = useLocation();

  const alternarMenu = () => setmenuAberto((prev) => !prev);
  const fecharMenu = () => setmenuAberto(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    let prevScrollPos = window.pageYOffset;

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      if (prevScrollPos > currentScrollPos) {
        setMostrarHeader(true);
      } else {
        setMostrarHeader(false);
      }

      if (menuAberto && prevScrollPos < currentScrollPos) {
        setmenuAberto(false);
      }

      prevScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [menuAberto]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      setMostrarHeader(true);
    }, 50);
  }, [location]);

  return (
    <header className={`cabecalho ${mostrarHeader ? "visivel" : "escondido"}`}>
      <nav className={`cabecalho_nav ${menuAberto ? "ativo" : ""}`}>
        <div className="div_titulo_academia">
          <Link to="/">
            <h1 className="titulo_academia">Iron <b className="titulo_academia_destaque">Fit</b></h1>
          </Link>
        </div>
        <div className="links_1024 links_1024_home">
          <Link to="/horarios" onClick={fecharMenu}>
            <p className="item_menu_hamburguer link_1920">Horários</p>
          </Link>
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
        <button
          className="cabecalho_nav_menu_hamburguer"
          onClick={alternarMenu}
          aria-label="Menu"
        >
          <div className={`linhas_hamburguer linhas_hamburguer_home ${menuAberto ? "ativo" : ""}`}>
            <div className="botao_hamburguer linha1"></div>
            <div className="botao_hamburguer linha2"></div>
            <div className="botao_hamburguer linha3"></div>
          </div>
        </button>
        <ul className={`nav-lista nav-lista_home ${menuAberto ? "ativo" : ""}`}>
          <li className="nav-lista_item">
            <Link to="/#planos" onClick={fecharMenu}>
              <p className="item_menu_hamburguer menor_1024">Planos</p>
            </Link>
          </li>
          {authToken ? (
            <>
              <li className="nav-lista_item">
                <Link to="/perfil" onClick={fecharMenu}>
                  <p className="item_menu_hamburguer menor_1280">Perfil</p>
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
            <Link to="/todos_produtos" onClick={fecharMenu}>
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