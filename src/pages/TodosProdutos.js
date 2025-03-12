import "../css/pages/TodosOsProdutos/todos_produtos.css";

function TodosProdutos() {
	return (
		<main className="principal">
			<section className="bloco_todos_produtos">
				<div className="pesquisa">
					<form className="centralizar search-box">
						<img
							className="img_lupa"
							src="/images/global/icon_lupa.svg"
							alt="Lupa"
						/>
						<input
							className="input__procurar search-box"
							type="text"
							placeholder="Pesquisar"
							maxLength="50"
						// value={searchText}
						// onChange={handleInputChange}
						// onKeyDown={handleKeyDown}
						/>
					</form>
				</div>

				<div className="filtros">
					<button className="botao_filtros">
						<h3 className='botao_filtro_texto'>
							Filtrar
						</h3>
					</button>

					<ul className="filtros_lista">
						<h2 className="filtro_lista_titulo">Filtros</h2>

						<li className="filtro_lista_item">
							<div className='box_ordem_preco'>
								<div className="ordenacao">
									<label htmlFor="ordenar" className="filtro-label">Ordenar por:</label>
									<select
										id="ordenar"
										// value={ordenacao}
										// onChange={(e) => setOrdenacao(e.target.value)}
										className="ordenar-select"
									>
										<option className='opcoes_ordem' value="relevancia">Relevância</option>
										<option className='opcoes_ordem' value="menorMaior">Preço: Menor para Maior</option>
										<option className='opcoes_ordem' value="maiorMenor">Preço: Maior para Menor</option>
									</select>
								</div>

								<div className="filtro">
									<p className="filtro-label">Preço:</p>

									<label className="radio-label">
										<input
											type="radio"
											name="preco"
											value="todos"
										// checked={faixaPreco === 'todos'}
										// onChange={(e) => setFaixaPreco(e.target.value)}
										/>
										Todos
									</label>

									<label className="radio-label">
										<input
											type="radio"
											name="preco"
											value="ate50"
										// checked={faixaPreco === 'ate50'}
										// onChange={(e) => setFaixaPreco(e.target.value)}
										/>
										Até R$50,00
									</label>
								</div>
							</div>

							<div className='box_categoria'>
								<div className="filtro">
									<p className="filtro-label">Filtrar por Categoria:</p>

									<label className="radio-label">
										<input
											type="radio"
											name="categoria"
											value="todas"
										// checked={categoria === 'todas'}
										// onChange={(e) => setCategoria(e.target.value)}
										/>
										Todas
									</label>

									<label className="radio-label">
										<input
											type="radio"
											name="categoria"
											value="Roupão"
										// checked={categoria === 'Roupão'}
										// onChange={(e) => setCategoria(e.target.value)}
										/>
										Roupão
									</label>
								</div>
							</div>

						</li>
						<hr className="linha_pesquisa mb" />
					</ul>
				</div>

				<div className="todos_produtos"></div>
			</section>
		</main >
	);
}

export default TodosProdutos;