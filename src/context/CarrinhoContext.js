import { createContext, useContext, useState } from "react";

const CarrinhoContext = createContext();

export const CarrinhoProvider = ({ children }) => {
  const [carrinho, setCarrinho] = useState([]);

  const adicionarAoCarrinho = (produto) => {
    setCarrinho((prevCarrinho) => {
      const itemExistente = prevCarrinho.find((item) => item.idproduto === produto.idproduto);
      
      if (itemExistente) {
        return prevCarrinho.map((item) =>
          item.idproduto === produto.idproduto ? { ...item, quantidade: item.quantidade + 1 } : item
        );
      } else {
        return [...prevCarrinho, { ...produto, quantidade: 1 }];
      }
    });
  };

  const removerDoCarrinho = (id) => {
    setCarrinho((prevCarrinho) => prevCarrinho.filter((item) => item.idproduto !== id));
  };

  const alterarQuantidade = (id, quantidade) => {
    setCarrinho((prevCarrinho) =>
      prevCarrinho
        .map((item) =>
          item.idproduto === id ? { ...item, quantidade: item.quantidade + quantidade } : item
        )
        .filter((item) => item.quantidade > 0) 
    );
  };

  return (
    <CarrinhoContext.Provider value={{ carrinho, adicionarAoCarrinho, removerDoCarrinho, alterarQuantidade }}>
      {children}
    </CarrinhoContext.Provider>
  );
};

export const useCarrinho = () => useContext(CarrinhoContext);
