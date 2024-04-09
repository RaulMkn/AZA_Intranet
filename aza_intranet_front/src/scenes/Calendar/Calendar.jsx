import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import axios from "axios";

function Calendar() {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    // Realiza la consulta a tu backend con Axios
    axios
      .get("http://localhost:8080/intranet/DentalAesthetics/appointments")
      .then((response) => {
        // Transforma los datos para que se ajusten a FullCalendar
        const eventosTransformados = response.data.map((evento) => ({
          title: evento.title,
          start: evento.date_time_beginning,
          end: evento.date_time_ending,
          description: evento.description,
          // Agrega más propiedades según sea necesario
        }));

        // Establece los eventos transformados en el estado
        setEventos(eventosTransformados);
      })
      .catch((error) => {
        console.error("Error al obtener eventos:", error);
      });
  }, []); // Se ejecuta solo al montar el componente

  const eventContent = ({ event }) => (
    <div
      style={{
        overflow: "hidden",
        fontSize: "12px",
        position: "relative",
        cursor: "pointer",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div>
        <strong>{event.title}</strong>
      </div>
      <div>Inicio: {new Date(event.start).toLocaleTimeString()}</div>
      <div>Final: {new Date(event.end).toLocaleTimeString()}</div>
    </div>
  );

  const eventMouseEnter = ({ el, event }) => {
    el.classList.add("relative");

    const newEl = document.createElement("div");
    newEl.innerHTML = `
      <div class="fc-hoverable-event" style="position: absolute; bottom: 100%; width: 300px; height: auto; background-color: white; z-index: 50; border: 1px solid #e2e8f0; border-radius: 0.375rem; padding: 0.75rem; font-size: 14px; font-family: 'Inter', sans-serif; cursor: pointer;">
        <strong>${event.title}</strong>
        <div>Descripcion: ${event.extendedProps.description}</div>
      </div>
    `;
    el.after(newEl);
  };

  const eventMouseLeave = () => {
    document.querySelector(".fc-hoverable-event").remove();
  };

  return (
    <>
      <div style={{ width: "100%", color: "black" }}>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={eventos}
          eventContent={eventContent}
          eventMouseEnter={eventMouseEnter}
          eventMouseLeave={eventMouseLeave}
          height={"80vh"}
        />
      </div>
    </>
  );
}

export default Calendar;
