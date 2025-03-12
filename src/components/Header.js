import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "../css/global/partials/header.css";

const Header = () => {
  const [menuAberto, setmenuAberto] = useState(false);
  const [mostrarHeader, setMostrarHeader] = useState(true);

  const alternarMenu = () => setmenuAberto((prev) => !prev);
  const fecharMenu = () => setmenuAberto(false);

  useEffect(() => {
    let prevScrollPos = window.pageYOffset;

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      if (prevScrollPos > currentScrollPos) {
        setMostrarHeader(true);
      } else {
        setMostrarHeader(false);
      }
      prevScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    let prevScrollPos = window.pageYOffset;

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      if (prevScrollPos < currentScrollPos && menuAberto) {
        setmenuAberto(false);
      }

      if (prevScrollPos > currentScrollPos) {
        setMostrarHeader(true);
      } else {
        setMostrarHeader(false);
      }

      prevScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [menuAberto]);

  return (
    <header className={`cabecalho ${mostrarHeader ? "visivel" : "escondido"}`}>
      <nav className={`cabecalho_nav ${menuAberto ? "ativo" : ""}`}>
        <div className="div_titulo_academia">
          <Link to="/">
            <h1 className="titulo_academia">Iron <b className="titulo_academia_destaque">Fit</b></h1>
          </Link>
        </div>
        <div className="links_1024">
          <Link to="/">
            <p className="item_menu_hamburguer link_1024">Nossos Produtos</p>
          </Link>
          <Link to="/">
            <p className="item_menu_hamburguer link_1024">Planos</p>
          </Link>
          <Link to="/">
            <p className="item_menu_hamburguer link_1024 link_1280">Sua Conta</p>
          </Link>
        </div>
        <button
          className="cabecalho_nav_menu_hamburguer"
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
            <Link to="/" onClick={fecharMenu}>
              <p className="item_menu_hamburguer menor_1024">Nossos Produtos</p>
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

          <li className="nav-lista_item">
            <Link to="https://www.google.com.br/maps/place/UNINOVE+-+Campus+Memorial/@-23.5291572,-46.6688474,17z/data=!3m1!4b1!4m6!3m5!1s0x94ce580368f5da4b:0x758fb9438c746262!8m2!3d-23.5291621!4d-46.6662725!16s%2Fg%2F1tf498b2?entry=ttu&g_ep=EgoyMDI1MDMwOC4wIKXMDSoJLDEwMjExNDU1SAFQAw%3D%3D" target="_blank" onClick={fecharMenu}>
              <p className="item_menu_hamburguer">Nossa Localização</p>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;