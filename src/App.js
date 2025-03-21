import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import HeaderBusca from "./components/HeaderBusca"; 
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Horarios from "./pages/Horarios";
import TodosProdutos from "./pages/TodosProdutos";

function App() {
  return (
    <Router>
      <Routes>
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
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
