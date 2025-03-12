import "../css/pages/Horarios/horarios.css";

function Horarios() {
  return (
    <main className="principal">
      <section className="bloco_horario">

        <div className="div_titulo_horario">
          <h2 className="titulo_horario">
            Horários de Funcionamento
          </h2>
        </div>

        <table className="tabela_horario">
          <thead>
            <tr>
              <th>Dia da Semana</th>
              <th>Horário de Funcionamento</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Feriados</td>
              <td>05:00 - 13:00</td>
            </tr>
            <tr>
              <td>Domingo</td>
              <td>05:00 - 14:00</td>
            </tr>
            <tr>
              <td>Segunda-Feira</td>
              <td>05:00 - Ininterrupto</td>
            </tr>
            <tr>
              <td>Terça-Feira</td>
              <td>24 Horas</td>
            </tr>
            <tr>
              <td>Quarta-Feira</td>
              <td>24 Horas</td>
            </tr>
            <tr>
              <td>Quinta-Feira</td>
              <td>24 Horas</td>
            </tr>
            <tr>
              <td>Sexta-Feira</td>
              <td>24 Horas</td>
            </tr>
            <tr>
              <td>Sábado</td>
              <td>00:00 - 16:00</td>
            </tr>
          </tbody>
        </table>

        <div className="div_texto_horario">
          <p className="texto_horario">Dúvidas sobre nossos horários?</p>
          <p className="texto_horario">Pergunte à nossa IA!</p>
        </div>
      </section>
    </main >
  );
}

export default Horarios;