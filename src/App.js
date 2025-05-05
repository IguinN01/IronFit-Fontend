import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { PesquisaProvider } from "./context/PesquisaContext";
import { CarrinhoProvider } from "./context/CarrinhoContext";
import { AuthProvider } from "./context/AuthContext";

import Header from "./components/Header";
import HeaderBusca from "./components/HeaderBusca";
import HeaderCarrinho from "./components/HeaderCarrinho";
import HeaderProduto from "./components/HeaderProduto";
import Footer from "./components/Footer";

import RotaProtegida from "./components/RotaProtegida";
import RotaPublica from "./components/RotaPublica";

import Home from "./pages/Home";
import Horarios from "./pages/Horarios";
import TodosProdutos from "./pages/TodosProdutos";
import ProdutoDetalhes from "./pages/ProdutoDetalhes";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import Perfil from "./pages/Perfil";
import RedefinirSenha from "./pages/RedefinirSenha";
import Checkout from "./pages/Checkout";
import Planos from "./pages/Planos";

function App() {
  return (
    <Router>
      <AuthProvider>
        <PesquisaProvider>
          <CarrinhoProvider>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Header tipo="default" />
                    <Home />
                  </>
                }
              />
              <Route
                path="/horarios"
                element={
                  <>
                    <Header tipo="default" />
                    <Horarios />
                  </>
                }
              />
              <Route
                path="/todos_produtos"
                element={
                  <>
                    <HeaderBusca tipo="especifica" />
                    <TodosProdutos />
                  </>
                }
              />
              <Route
                path="/produto/:id"
                element={
                  <>
                    <HeaderProduto tipo="especifica" />
                    <ProdutoDetalhes />
                  </>
                }
              />
              <Route
                path="/cadastro"
                element={
                  <RotaPublica>
                    <>
                      <Header tipo="default" />
                      <Cadastro />
                    </>
                  </RotaPublica>
                }
              />
              <Route
                path="/login"
                element={
                  <RotaPublica>
                    <>
                      <Header tipo="default" />
                      <Login />
                    </>
                  </RotaPublica>
                }
              />
              <Route
                path="/perfil"
                element={
                  <RotaProtegida>
                    <>
                      <Header tipo="default" />
                      <Perfil />
                    </>
                  </RotaProtegida>
                }
              />
              <Route
                path="/redefinir_senha"
                element={
                  <>
                    <Header tipo="default" />
                    <RedefinirSenha />
                  </>
                }
              />
              <Route
                path="/checkout"
                element={
                  <>
                    <HeaderCarrinho tipo="especifica" />
                    <Checkout />
                  </>
                }
              />
              <Route
                path="/planos"
                element={
                  <>
                    <Header tipo="default" />
                    <Planos />
                  </>
                }
              />
            </Routes>
            <Footer />
          </CarrinhoProvider>
        </PesquisaProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;