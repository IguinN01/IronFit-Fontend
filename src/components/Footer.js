import React from "react";
import { Link } from 'react-router-dom';

import "../css/global/partials/footer.css";

const Rodape = () => {
	const redesSociais = [
		{ id: "twitter", href: "https://twitter.com", imgSrc: "/images/global/twitter-icon.svg", alt: "Twitter" },
		{ id: "whatsapp", href: "https://wa.me/5511942957858", imgSrc: "/images/global/whatsapp-icon.svg", alt: "Whatsapp" },
		{ id: "instagram", href: "https://www.instagram.com", imgSrc: "/images/global/instagram-icon.svg", alt: "Instagram" },
	];

	const contatos = [
		{ id: "telefone", tipo: "Telefone", href: "https://wa.me/5511942957858", numero: "+55 (11) 94295-7858", imgSrc: "/images/global/telefone-icon.svg" },
		{ id: "email", tipo: "E-Mail", href: "mailto:ironfitacademia05@gmail.com.com?subject=Duvida&body=Gostaria de saber mais sobre seus serviços.", numero: "ironfitacademia05@gmail.com", imgSrc: "/images/global/email-icon.svg" },
		{
			id: "local", tipo: "Local", href: "https://www.google.com.br/maps/place/UNINOVE+-+Campus+Memorial/@-23.5291572,-46.6688474,17z/data=!3m1!4b1!4m6!3m5!1s0x94ce580368f5da4b:0x758fb9438c746262!8m2!3d-23.5291621!4d-46.6662725!16s%2Fg%2F1tf498b2?entry=ttu&g_ep=EgoyMDI1MDMwOC4wIKXMDSoJLDEwMjExNDU1SAFQAw%3D%3D",
			numero: "Brasil, São Paulo, Av. Dr. Adolpho Pinto, 109 - Barra Funda, São Paulo - SP, 01156-050",
			imgSrc: "/images/global/local-icon.svg"
		}
	];

	return (
		<footer className="rodape">
			<div className="rede_sociais">
				{redesSociais.map(rede => (
					<a key={rede.id} href={rede.href} target="_blank" rel="noopener noreferrer">
						<img className="redes_sociais_icons" src={rede.imgSrc} alt={rede.alt} />
					</a>
				))}
			</div>

			<div className="titulo_sub">
				<h1 className="titulo_rodape">
					<Link to="/">
						Iron <b className="titulo_academia_destaque_rodape">Fit</b>
					</Link>
				</h1>
				<p className="rodape_descricao">
					Iron <b className="fit_descricao">Fit</b> é mais do que uma academia, é um estilo de vida! Nosso compromisso é transformar desafios
					em conquistas, ajudando você a alcançar sua melhor versão com treinos de alta performance e uma comunidade motivadora.
				</p>
			</div>

			<div className="num_email_local">
				{contatos.map(contato => (
					<div key={contato.id}>
						<p className={contato.tipo.toLowerCase()}>
							<img className={`icon_${contato.tipo.toLowerCase()} rodape_icon`} src={contato.imgSrc} alt={contato.tipo} />
							<a href={contato.href} target="_blank" rel="noopener noreferrer">{contato.numero}</a>
						</p>
					</div>
				))}
			</div>

			<div className="rodape_mais_info"></div>

			<hr className="linha" />

			<div className="rodape_creditos">
				<p className="creditos1">@ 2025 Academia Iron Fit	</p>
				<div className="creditos">
					<p className="creditos2">Política de Privacidade</p>
					<p className="creditos2">Termos e Condições</p>
				</div>
			</div>
		</footer >
	);
};

export default Rodape;