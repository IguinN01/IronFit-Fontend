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
    if (menuCarrinhoAberto) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [menuCarrinhoAberto, location.pathname]);

  useEffect(() => {
    let prevScrollPos = window.pageYOffset;

    const handleScroll = () => {
      if (menuCarrinhoAberto) return;

      const currentScrollPos = window.pageYOffset;
      setMostrarHeader(prevScrollPos > currentScrollPos);
      prevScrollPos = currentScrollPos;

      if (menuAberto) fecharMenu();
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuAberto, menuCarrinhoAberto, fecharMenu]);

  useEffect(() => {
    if (menuCarrinhoAberto) {
      setMostrarHeader(true);
    }
  }, [menuCarrinhoAberto]);

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
          <button onClick={alternarMenuCarrinho} className="item_menu_hamburguer link_1024 botao_carrinho_menu">
            Seu Carrinho
            {quantidadeItensCarrinho > 0 && (
              <span className="bolinha-carrinho">{quantidadeItensCarrinho}</span>
            )}
          </button>
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
          {quantidadeItensCarrinho > 0 && !menuAberto && (
            <motion.div
              className="bolinha"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={quantidadeItensCarrinho}
                  initial={{ rotateX: 90, opacity: 0 }}
                  animate={{ rotateX: 0, opacity: 1 }}
                  exit={{ rotateX: -90, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  {quantidadeItensCarrinho}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          )}
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
            <button onClick={alternarMenuCarrinho} className="item_menu_hamburguer menor_1024 botao_carrinho_menu">
              Seu Carrinho
              {quantidadeItensCarrinho > 0 && (
                <span className="bolinha-carrinho">{quantidadeItensCarrinho}</span>
              )}
            </button>
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
          <div className={`linhas_hamburguer ${menuAberto || menuCarrinhoAberto ? "ativo" : ""}`}>
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
                <Link to={`/produto/${produto.idproduto}`} className="produto-link" onClick={fecharMenuCarrinho}>
                  <img src={produto.imagens} alt={produto.nome} width="50" />
                  <p>{produto.nome}</p>
                  <p>
                    Preço Total R$
                    <motion.span
                      key={produto.preco * produto.quantidade}
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      {(produto.preco * produto.quantidade).toFixed(2)}
                    </motion.span>
                  </p>
                  <p>Quantidade: {produto.quantidade}</p>
                </Link>

                <button
                  onClick={() => alterarQuantidade(produto.idproduto, 1)}
                  disabled={produto.quantidade >= 5}
                >
                  +
                </button>
                <button onClick={() => alterarQuantidade(produto.idproduto, -1)}>-</button>
                <button onClick={() => removerDoCarrinho(produto.idproduto)}>&#x02A2F;</button>
              </li>
            ))}
          </ul>
        )}

        {carrinho.length > 0 && (
          <div className="total-compra">
            <p>
              Preço Total: R$
              <motion.span
                key={precoTotal}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {precoTotal}
              </motion.span>
            </p>
            <Link to="/checkout" className="continuar-compra-link">
              Continuar Compra
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;