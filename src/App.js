import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Horarios from "./pages/Horarios";
import TodosProdutos from "./pages/TodosProdutos";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/horarios" element={<Horarios />} />
        <Route path="/todos_produtos" element={<TodosProdutos />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;