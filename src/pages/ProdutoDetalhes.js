import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "../css/pages/PodutoDetalhes/produto_detalhes.css";

const ProdutoDetalhes = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [produto, setProduto] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    fetch(`https://ironfit-backend.onrender.com/produtos/${id}`)
      .then((response) => {
        if (!response.ok) throw new Error("Erro ao buscar detalhes do produto");
        return response.json();
      })
      .then((data) => {
        setProduto(data);
        setCarregando(false);
      })
      .catch((error) => {
        setErro(error.message);
        setCarregando(false);
      });
  }, [id]);

  if (carregando) return <p>Carregando detalhes do produto...</p>;
  if (erro) return <p>Erro: {erro}</p>;
  if (!produto) return <p>Produto não encontrado</p>;

  return (
    <section className="produto-detalhes">
      <button
        className="btn-voltar"
        onClick={() => navigate(-1)}
      >
        ← Voltar
      </button>

      <img src={produto.imagens} alt={produto.nome} className="produto-img" />
      <h1>{produto.nome}</h1>
      <p className="produto-preco">Preço: R${produto.preco}</p>
      <p className="produto-descricao">{produto.descricao_produto}</p>
    </section>
  );
};

export default ProdutoDetalhes;
