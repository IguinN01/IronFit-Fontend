import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCreative } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "../css/pages/Home/home.css";

function Home() {
  return (
    <main className="principal">
      <section className="bloco_principal">
        <div className="gradiente">
          <div className="div_img_academia_fundo">
            <img className="img_academia_fundo" src="./images/global/Icon_circulo_128.svg" alt="Ícone" />
          </div>
          <div className="div_texto_inicial">
            <p className="texto_inicial">Comece uma forma melhor de você!</p>
            <p className="texto_inicial">Venha se juntar a nós!</p>
          </div>
          <Link to="/">
            <p className="texto_comecar">Começar Agora</p>
          </Link>
        </div>
      </section>

      <section className="bloco_mais_sobre_nos">
        <div className="div_texto_sobre_nos">
          <h2 className="titulo_sobre_nos">Por que escolher nossa academia?</h2>
          <p className="paragrafo_sobre_nos">
            Descubra o que torna nossa unidade a escolha ideal para uma vida mais saudável.
          </p>
        </div>

        <div className="blocos_mais_sobre">
          <div className="bloco_mais_sobre">
            <img className="img_icon_mais_sobre" src="./images/pages/Home/Icon_halter_dumbbell.svg" alt="Halteres" />
            <h2 className="titulo_bloco_sobre">Estrutura Completa e Moderna</h2>
            <p className="descricao_mais_sobre">Equipamentos de última geração e ambientes projetados para o seu conforto e desempenho.</p>
          </div>

          <div className="bloco_mais_sobre">
            <img className="img_icon_mais_sobre" src="./images/pages/Home/Icon_halter_lista.svg" alt="Halter" />
            <h2 className="titulo_bloco_sobre">Variedade para Todas as Necessidades</h2>
            <p className="descricao_mais_sobre">Escolha entre uma linha completa de suplementos e peças confortáveis, ideais para o seu treino.</p>
          </div>

          <div className="bloco_mais_sobre">
            <img className="img_icon_mais_sobre" src="./images/pages/Home/Icon_halter.svg" alt="Lista" />
            <h2 className="titulo_bloco_sobre">Planos Flexíveis para o Seu Bolso</h2>
            <p className="descricao_mais_sobre">Escolha o plano que melhor se adapta à sua rotina, com total transparência.</p>
          </div>
        </div>
      </section>

      <section className="bloco_planos">
        <div className="div_planos">
          <div className="titulo_texto_planos">
            <h1 className="titulo_planos">
              Venha conhecer nossos planos!
            </h1>
            <p className="texto_planos">
              Escolha Seu Desafio na Iron Fit!
            </p>
            <p className="texto_planos texto_plano_2">
              Escolha o plano ideal para o seu estilo de vida e treine com liberdade
            </p>
          </div>
          <div className="planos_possiveis">
            <Swiper
              modules={[Autoplay]}
              loop={true}
              rewind={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
                pauseOnTouch: true,
              }}
              speed={1000}
              spaceBetween={20}
              centeredSlides={true}
              slidesPerView={1}
              breakpoints={{
                768: {
                  slidesPerView: 2,
                },
                1280: {
                  slidesPerView: 3,
                  centeredSlides: true,
                  initialSlide: 1,
                  loop: false,
                  autoplay: false,
                  allowTouchMove: false,
                },
                1920: {
                  slidesPerView: 3,
                  centeredSlides: true,
                  initialSlide: 1,
                  loop: false,
                  autoplay: false,
                  allowTouchMove: false,
                  spaceBetween: 40,
                }
              }}
              className="carrossel_planos"
            >

              <SwiperSlide>
                <div className="mensal_semestral_anual plano_mensal">
                  <div className="div_nome_plano">
                    <h2 className="nome_plano">
                      Plano Iron Warrior
                    </h2>
                    <h2 className="valor_plano">
                      R$149,99
                    </h2>
                    <p className="desc_149 descricao_plano">
                      Desafie seus limites com treinos intensos e uma jornada de transformação física.
                    </p>
                  </div>
                  <div className="beneficios_plano">
                    <p className="texto_beneficios"><b className="certo">&#10003;</b>
                      Acesso ilimitado à academia
                    </p>
                    <p className="texto_beneficios"><b className="certo">&#10003;</b>
                      Participação em aulas coletivas
                    </p>
                    <p className="texto_beneficios"><b className="certo">&#10003;</b>
                      Suporte básico de treino
                    </p>
                  </div>
                  <div className="link">
                    <Link to="/">
                      <p className="link_matriculese">
                        Começar Agora!
                      </p>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className="mensal_semestral_anual plano_semestral inverter-hover">
                  <div className="div_nome_plano">
                    <h2 className="nome_plano">
                      Plano Iron Legend
                    </h2>
                    <h2 className="valor_plano">
                      R$109,99
                    </h2>
                    <p className="desc_109 descricao_plano">
                      Potencialize seus resultados com mais suporte e benefícios exclusivos para seu treino.
                    </p>
                  </div>
                  <div className="beneficios_plano">
                    <p className="texto_beneficios"><b className="certo">&#10003;</b>
                      Todos os benefícios do Plano Iron Chapion
                    </p>
                    <p className="texto_beneficios"><b className="certo">&#10003;</b>
                      Maior desconto (economize R$480,00 no ano)
                    </p>
                    <p className="texto_beneficios"><b className="certo">&#10003;</b>
                      Brinde exclusivo para novos assinantes
                    </p>
                    <p className="texto_beneficios"><b className="certo">&#10003;</b>
                      Acompanhamento personalizado gratuito a cada 3 meses
                    </p>
                    <p className="texto_beneficios"><b className="certo">&#10003;</b>
                      Acesso VIP a eventos e desafios exclusivos
                    </p>
                  </div>
                  <div className="link">
                    <Link to="/">
                      <p className="link_matriculese">
                        Começar Agora!
                      </p>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className="mensal_semestral_anual plano_anual">
                  <div className="div_nome_plano">
                    <h2 className="nome_plano">
                      Plano Iron Chapion
                    </h2>
                    <h2 className="valor_plano">
                      R$119,99
                    </h2>
                    <p className="desc_119 descricao_plano">
                      Para quem busca alcançar novos patamares, com avaliação física e acompanhamento contínuo.
                    </p>
                  </div>
                  <div className="beneficios_plano">
                    <p className="texto_beneficios"><b className="certo">&#10003;</b>
                      Todos os benefícios do Plano Iron Warrior
                    </p>
                    <p className="texto_beneficios"><b className="certo">&#10003;</b>
                      Desconto especial (economize R$120,00 em 6 meses)
                    </p>
                    <p className="texto_beneficios"><b className="certo">&#10003;</b>
                      Avaliação física gratuita a cada 3 meses
                    </p>
                  </div>
                  <div className="link">
                    <Link to="/">
                      <p className="link_matriculese">
                        Começar Agora!
                      </p>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide className="planos_1024">
                <div className="mensal_semestral_anual plano_mensal">
                  <div className="div_nome_plano">
                    <h2 className="nome_plano">
                      Plano Iron Warrior
                    </h2>
                    <h2 className="valor_plano">
                      R$149,99
                    </h2>
                    <p className="desc_149 descricao_plano">
                      Desafie seus limites com treinos intensos e uma jornada de transformação física.
                    </p>
                  </div>
                  <div className="beneficios_plano">
                    <p className="texto_beneficios"><b className="certo">&#10003;</b>
                      Acesso ilimitado à academia
                    </p>
                    <p className="texto_beneficios"><b className="certo">&#10003;</b>
                      Participação em aulas coletivas
                    </p>
                    <p className="texto_beneficios"><b className="certo">&#10003;</b>
                      Suporte básico de treino
                    </p>
                  </div>
                  <div className="link">
                    <Link to="/">
                      <p className="link_matriculese">
                        Começar Agora!
                      </p>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide className="planos_1024">
                <div className="mensal_semestral_anual plano_semestral inverter-hover">
                  <div className="div_nome_plano">
                    <h2 className="nome_plano">
                      Plano Iron Legend
                    </h2>
                    <h2 className="valor_plano">
                      R$109,99
                    </h2>
                    <p className="desc_109 descricao_plano">
                      Potencialize seus resultados com mais suporte e benefícios exclusivos para seu treino.
                    </p>
                  </div>
                  <div className="beneficios_plano">
                    <p className="texto_beneficios"><b className="certo">&#10003;</b>
                      Todos os benefícios do Plano Iron Chapion
                    </p>
                    <p className="texto_beneficios"><b className="certo">&#10003;</b>
                      Maior desconto (economize R$480,00 no ano)
                    </p>
                    <p className="texto_beneficios"><b className="certo">&#10003;</b>
                      Brinde exclusivo para novos assinantes
                    </p>
                    <p className="texto_beneficios"><b className="certo">&#10003;</b>
                      Acompanhamento personalizado gratuito a cada 3 meses
                    </p>
                    <p className="texto_beneficios"><b className="certo">&#10003;</b>
                      Acesso VIP a eventos e desafios exclusivos
                    </p>
                  </div>
                  <div className="link">
                    <Link to="/">
                      <p className="link_matriculese">
                        Começar Agora!
                      </p>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide className="planos_1024">
                <div className="mensal_semestral_anual plano_anual">
                  <div className="div_nome_plano">
                    <h2 className="nome_plano">
                      Plano Iron Chapion
                    </h2>
                    <h2 className="valor_plano">
                      R$119,99
                    </h2>
                    <p className="desc_119 descricao_plano">
                      Para quem busca alcançar novos patamares, com avaliação física e acompanhamento contínuo.
                    </p>
                  </div>
                  <div className="beneficios_plano">
                    <p className="texto_beneficios"><b className="certo">&#10003;</b>
                      Todos os benefícios do Plano Iron Warrior
                    </p>
                    <p className="texto_beneficios"><b className="certo">&#10003;</b>
                      Desconto especial (economize R$120,00 em 6 meses)
                    </p>
                    <p className="texto_beneficios"><b className="certo">&#10003;</b>
                      Avaliação física gratuita a cada 3 meses
                    </p>
                  </div>
                  <div className="link">
                    <Link to="/">
                      <p className="link_matriculese">
                        Começar Agora!
                      </p>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </section>

      <section className="bloco_produtos">
        <div className="div_produtos">
          <div className="titulos_produtos">
            <h2 className="titulo_produtos">Nossos Produtos</h2>
            <p className="descricao_produtos">Encontre os melhores suplementos e acessórios para potencializar seu treino.</p>
          </div>

          <div className="carrossel_produtos">
            <Swiper
              modules={[Autoplay]}
              loop={true}
              rewind={true}
              autoplay={{
                delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true, pauseOnTouch: true
              }}
              speed={1000}
              spaceBetween={20}
              centeredSlides={true}
              slidesPerView={1}
              breakpoints={{
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 2,
                  centeredSlides: false,
                  spaceBetween: 40,
                },
                1280: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                }
              }}
            >
              <SwiperSlide className="produtos">
                <Link to="/" className="categoria_produto">
                  <div className="div_img_categoria_produto">
                    <img className="img_categoria_produto" src="./images/pages/Home/suplementos.webp" alt="Suplementos" />
                  </div>
                  <div className="infos_cadegoria">
                    <h2 className="nome_categoria">Suplementos</h2>
                    <p className="descricao_categoria">Aprimore seu desempenho e cuide da sua saúde com nossos suplementos.</p>
                  </div>
                </Link>
                <div className="link_categoria">
                  <Link className="aaa" to="/">
                    <p className="texto_link_produto">Ver Produtos</p>
                  </Link>
                </div>
              </SwiperSlide>

              <SwiperSlide className="produtos">
                <Link to="/" className="categoria_produto">
                  <div className="div_img_categoria_produto">
                    <img className="img_categoria_produto" src="./images/pages/Home/snacks.webp" alt="Snacks" />
                  </div>
                  <div className="infos_cadegoria">
                    <h2 className="nome_categoria">Snacks</h2>
                    <p className="descricao_categoria">Opções saudáveis e saborosas para manter sua energia e nutrição em dia.</p>
                  </div>
                </Link>
                <div className="link_categoria">
                  <Link className="aaa" to="/">
                    <p className="texto_link_produto">Ver Produtos</p>
                  </Link>
                </div>
              </SwiperSlide>

              <SwiperSlide className="produtos">
                <Link to="/" className="categoria_produto">
                  <div className="div_img_categoria_produto">
                    <img className="img_categoria_produto" src="./images/pages/Home/roupas.png" alt="Roupas" />
                  </div>
                  <div className="infos_cadegoria">
                    <h2 className="nome_categoria">Roupas</h2>
                    <p className="descricao_categoria">Estilo e conforto para treinos e o dia a dia, com tecidos de alta performance.</p>
                  </div>
                </Link>
                <div className="link_categoria">
                  <Link className="aaa" to="/">
                    <p className="texto_link_produto">Ver Produtos</p>
                  </Link>
                </div>
              </SwiperSlide>

              <SwiperSlide className="produtos">
                <Link to="/" className="categoria_produto">
                  <div className="div_img_categoria_produto">
                    <img className="img_categoria_produto" src="./images/pages/Home/acessorios.png" alt="Acessórios" />
                  </div>
                  <div className="infos_cadegoria">
                    <h2 className="nome_categoria">Acessórios</h2>
                    <p className="descricao_categoria">Equipamentos essenciais para potencializar seu treino e rotina fitness.</p>
                  </div>
                </Link>
                <div className="link_categoria">
                  <Link className="aaa" to="/">
                    <p className="texto_link_produto">Ver Produtos</p>
                  </Link>
                </div>
              </SwiperSlide>

              <SwiperSlide className="produtos">
                <Link to="/" className="categoria_produto">
                  <div className="div_img_categoria_produto">
                    <img className="img_categoria_produto" src="./images/pages/Home/suplementos.webp" alt="Suplementos" />
                  </div>
                  <div className="infos_cadegoria">
                    <h2 className="nome_categoria">Suplementos</h2>
                    <p className="descricao_categoria">Aprimore seu desempenho e cuide da sua saúde com nossos suplementos.</p>
                  </div>
                </Link>
                <div className="link_categoria">
                  <Link to="/">
                    <p className="texto_link_produto">Ver Produtos</p>
                  </Link>
                </div>
              </SwiperSlide>

              <SwiperSlide className="produtos">
                <Link to="/" className="categoria_produto">
                  <div className="div_img_categoria_produto">
                    <img className="img_categoria_produto" src="./images/pages/Home/snacks.webp" alt="Snacks" />
                  </div>
                  <div className="infos_cadegoria">
                    <h2 className="nome_categoria">Snacks</h2>
                    <p className="descricao_categoria">Opções saudáveis e saborosas para manter sua energia e nutrição em dia.</p>
                  </div>
                </Link>
                <div className="link_categoria">
                  <Link to="/">
                    <p className="texto_link_produto">Ver Produtos</p>
                  </Link>
                </div>
              </SwiperSlide>

              <SwiperSlide className="produtos">
                <Link to="/" className="categoria_produto">
                  <div className="div_img_categoria_produto">
                    <img className="img_categoria_produto" src="./images/pages/Home/roupas.png" alt="Roupas" />
                  </div>
                  <div className="infos_cadegoria">
                    <h2 className="nome_categoria">Roupas</h2>
                    <p className="descricao_categoria">Estilo e conforto para treinos e o dia a dia, com tecidos de alta performance.</p>
                  </div>
                </Link>
                <div className="link_categoria">
                  <Link to="/">
                    <p className="texto_link_produto">Ver Produtos</p>
                  </Link>
                </div>
              </SwiperSlide>

              <SwiperSlide className="produtos">
                <Link to="/" className="categoria_produto">
                  <div className="div_img_categoria_produto">
                    <img className="img_categoria_produto" src="./images/pages/Home/acessorios.png" alt="Acessórios" />
                  </div>
                  <div className="infos_cadegoria">
                    <h2 className="nome_categoria">Acessórios</h2>
                    <p className="descricao_categoria">Equipamentos essenciais para potencializar seu treino e rotina fitness.</p>
                  </div>
                </Link>
                <div className="link_categoria">
                  <Link to="/">
                    <p className="texto_link_produto">Ver Produtos</p>
                  </Link>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </section>

      <section className="bloco_unidade">
        <div className="div_unidade">
          <div className="titulo_texto_unidade">
            <h2 className="titulo_unidade">Venha Conhecer nossa Unidade</h2>
            <p className="texto_unidade">
              Descubra o espaço que combina modernidade, conforto e equipamentos de alta performance para o seu melhor treino
            </p>
          </div>

          <div className="imgs_unidade">
            <div className="bloco_imgs_unidade">
              <Swiper
                modules={[Autoplay, EffectCreative]}
                allowTouchMove={false}
                simulateTouch={false}
                loop={true}
                rewind={true}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                speed={1000}
                slidesPerView={1}
                effect={'creative'}
                creativeEffect={{
                  prev: {
                    translate: [0, 0, -400],
                  },
                  next: {
                    translate: ['100%', 0, 0],
                  },
                }}
                breakpoints={{
                  768: {
                    creativeEffect: {
                      prev: {
                        translate: [0, 0, -400],
                      },
                      next: {
                        translate: ['-100%', 0, 0],
                      },
                    }
                  }
                }}
                className="carrossel-unidade"
              >
                <SwiperSlide>
                  <img className="img_unidade" src="./images/pages/Home/fachada_academia.jpg" alt="Fachada da academia" />
                </SwiperSlide>

                <SwiperSlide>
                  <img className="img_unidade" src="./images/pages/Home/sala_academia.jpg" alt="Sala da academia" />
                </SwiperSlide>

                <SwiperSlide>
                  <img className="img_unidade" src="./images/pages/Home/corredor_academia.jpg" alt="Corredor da academia" />
                </SwiperSlide>

                <SwiperSlide>
                  <img className="img_unidade" src="./images/pages/Home/canto_academia.jpg" alt="Canto da academia" />
                </SwiperSlide>
              </Swiper>

              <div className="nomes_links">
                <div className="div_texto_local">
                  <Link className="texto_local" target="_blank" to="https://www.google.com.br/maps/place/UNINOVE+-+Campus+Memorial/@-23.5291621,-46.6662725,17z/data=!3m1!4b1!4m6!3m5!1s0x94ce580368f5da4b:0x758fb9438c746262!8m2!3d-23.5291621!4d-46.6662725!16s%2Fg%2F1tf498b2?entry=ttu&g_ep=EgoyMDI1MDMwOC4wIKXMDSoJLDEwMjExNDU1SAFQAw%3D%3D">
                    <h2 className="nome_cidade_unidade">Barra Funda</h2>
                    <div className="flex_column">
                      <img className="img_icon_local" src="./images/pages/Home/icon_local.svg" alt="Ícone de localização" />
                      <p className="nome_rua_unidade">Av. Dr. Adolpho Pinto, 190</p>
                    </div>
                    <p className="nome_rua_unidade">São Paulo, Barra Funda - BR</p>
                  </Link>
                </div>

                <div className="links_unidade">
                  <Link className="link_matricula_ver_mais" to="/">
                    <p className="texto_matricula">Matricule-se</p>
                  </Link>
                  <Link className="link_matricula_ver_mais" to="/">
                    <p className="texto_ver_mais">Ver Mais</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bloco_professores">
        <div className="titulos_professores">
          <h2 className="titulo_professores">
            Nossos Instrutores
          </h2>
          <p className="texto_professores">
            Conheça um pouco sobre nossos Instrutores
          </p>
        </div>

        <div className="carrossel_professores">
          <Swiper
            modules={[Autoplay]}
            loop={true}
            rewind={true}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            speed={1000}
            slidesPerView={1}
            breakpoints={{
              1024: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1920: {
                slidesPerView: 5,
                spaceBetween: 40,
              }
            }}
            className="carrossel_professoress"
          >
            <SwiperSlide className="swiper_professores">
              <div className="div_info_professores">
                <div className="div_img_professores">
                  <img className="img_professores" src="./images/pages/Home/professor(1).png" alt="Professor..." />
                </div>
                <div className="titulo_texto_professores">
                  <h3 className="nome_professor">
                    Instrutor André Silva
                  </h3>
                  <p className="sobre_professor">
                    Profissional e dedicado, nosso instrutor está sempre pronto para ajudar você a alcançar seus objetivos com treinos eficazes e motivação constante!
                  </p>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide className="swiper_professores">
              <div className="div_info_professores">
                <div className="div_img_professores">
                  <img className="img_professores" src="./images/pages/Home/professor(2).jpg" alt="Professor..." />
                </div>
                <div className="titulo_texto_professores">
                  <h3 className="nome_professor">
                    Instrutor Lucas Motta
                  </h3>
                  <p className="sobre_professor">
                    Com experiência e paixão pelo fitness, nosso instrutor oferece orientação personalizada para tornar seus treinos mais seguros e eficientes!
                  </p>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide className="swiper_professores">
              <div className="div_info_professores">
                <div className="div_img_professores">
                  <img className="img_professores" src="./images/pages/Home/professor(3).jpg" alt="Professor..." />
                </div>
                <div className="titulo_texto_professores">
                  <h3 className="nome_professor">
                    Instrutor Rafael Almeida
                  </h3>
                  <p className="sobre_professor">
                    Aqui, você treina com um instrutor que entende suas necessidades, corrige sua postura e incentiva você a superar seus limites!
                  </p>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide className="swiper_professores">
              <div className="div_info_professores">
                <div className="div_img_professores">
                  <img className="img_professores" src="./images/pages/Home/professor(4).png" alt="Professor..." />
                </div>
                <div className="titulo_texto_professores">
                  <h3 className="nome_professor">
                    Instrutor Bruno Silva
                  </h3>
                  <p className="sobre_professor">
                    Com atenção e profissionalismo, nosso instrutor garante que você treine com qualidade, evolua constantemente e conquiste seus resultados!
                  </p>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide className="swiper_professores">
              <div className="div_info_professores">
                <div className="div_img_professores">
                  <img className="img_professores" src="./images/pages/Home/professor(5).png" alt="Professor..." />
                </div>
                <div className="titulo_texto_professores">
                  <h3 className="nome_professor">
                    Instrutor Diego Costa
                  </h3>
                  <p className="sobre_professor">
                    Mais do que ensinar exercícios, nosso instrutor inspira disciplina e determinação para que cada treino seja um passo rumo ao seu melhor!
                  </p>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
    </main >
  );
}

export default Home;