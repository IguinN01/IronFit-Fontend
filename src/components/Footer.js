import React from "react";
import { Link } from 'react-router-dom';

import "../css/global/partials/footer.css";

const Rodape = () => {
	const redesSociais = [
		{ href: "https://twitter.com", imgSrc: "/images/global/twitter-icon.svg", alt: "Twitter" },
		{ href: "https://wa.me/5511942957858", imgSrc: "/images/global/whatsapp-icon.svg", alt: "Whatsapp" },
		{ href: "https://www.instagram.com", imgSrc: "/images/global/instagram-icon.svg", alt: "Instagram" },
	];

	const contatos = [
		{ tipo: "Telefone", href: "https://wa.me/5511942957858", numero: "+55 (11) 94295-7858", imgSrc: "/images/global/telefone-icon.svg" },
		{ tipo: "E-Mail", href: "mailto:ironfitacademia05@gmail.com.com?subject=Duvida&body=Gostaria de saber mais sobre seus serviços.", numero: "ironfitacademia05@gmail.com", imgSrc: "/images/global/email-icon.svg" },
		{
			tipo: "Local", href: "https://www.google.com/maps/place/R.+Narcise+Carbonel,+717+-+Jardim+Monte+Belo,+S%C3%A3o+Paulo+-+SP,+05266-020/@-23.4461481,-46.8034576,17z/data=!3m1!4b1!4m6!3m5!1s0x94cefd0e8307fda9:0x285536089eddee23!8m2!3d-23.446153!4d-46.8008827!16s%2Fg%2F11c1bmr1qz?entry=tts&g_ep=EgoyMDI0MDkxMC4wKgBIAVAD", numero: "Brasil, São Paulo, São Paulo, Parque Esperança, R. Narcise Carbonel, N°717", imgSrc: "/images/global/local-icon.svg"
		}
	];

	const ajudaLinks = [
		{ nome: "Contate-nós", to: "/" },
		{ nomeSobre: "Sobre nós", to: "/" }
	];

	return (
		<footer className="rodape">
			<div className="rede__sociais">
				{redesSociais.map((rede, index) => (
					<a key={index} href={rede.href} target="_blank" rel="noopener noreferrer">
						<img className="redes__sociais__icons" src={rede.imgSrc} alt={rede.alt} />
					</a>
				))}
			</div>

			<div className="titulo__sub">
				<h1 className="titulo__rodape">
					<Link to="/">
						Iron <b className="titulo_academia_destaque_rodape">Fit</b>
					</Link>
				</h1>
				<p className="rodape__descricao">
					Iron <b className="fit_descricao">Fit</b> é mais do que uma academia, é um estilo de vida! Nosso compromisso é transformar desafios
					em conquistas, ajudando você a alcançar sua melhor versão com treinos de alta performance e uma comunidade motivadora.
				</p>
			</div>

			<div className="num_email__local">
				{contatos.map((contato, index) => (
					<p key={index} className={contato.tipo.toLowerCase()}>
						<img className={`icon__${contato.tipo.toLowerCase()} rodape__icon`} src={contato.imgSrc} alt={contato.tipo} />
						<a href={contato.href} target="_blank" rel="noopener noreferrer">{contato.numero}</a>
					</p>
				))}
			</div>

			<div className="rodape__mais__info">
				<div>
					<h4 className="rodape__titulos">Ajuda</h4>
					{ajudaLinks.map((link, index) => (
						<p key={index} className="rodape__itens__info">
							<Link to={link.to}>{link.nomeSobre}</Link>
						</p>
					))}
				</div>

				<div>
					<h4 className="rodape__titulos">Atendimento ao Cliente</h4>
					{ajudaLinks.map((link, index) => (
						<p key={index} className="rodape__itens__info">
							<Link to={link.to}>{link.nome}</Link>
						</p>
					))}
				</div>
			</div>

			<hr className="linha" />

			<div className="rodape__creditos">
				<p className="creditos1">@ 2025 Academia Iron Fit	</p>
				<div className="creditos">
					<p className="creditos2">Política de Privacidade</p>
					<p className="creditos2">Termos e Condições</p>
				</div>
			</div>
		</footer>
	);
};

export default Rodape;