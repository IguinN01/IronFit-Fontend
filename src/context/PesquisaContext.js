import { createContext, useState, useContext } from "react";

const PesquisaContext = createContext();

export const PesquisaProvider = ({ children }) => {
  const [termoPesquisa, setTermoPesquisa] = useState("");

  return (
    <PesquisaContext.Provider value={{ termoPesquisa, setTermoPesquisa }}>
      {children}
    </PesquisaContext.Provider>
  );
};

export const usePesquisa = () => useContext(PesquisaContext);