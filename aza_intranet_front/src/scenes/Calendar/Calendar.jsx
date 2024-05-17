import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import axios from "axios";
import Swal from "sweetalert2";
import side_eye from "../../assets/side_eye.jpeg";
import esLocale from "@fullcalendar/core/locales/es";

function Calendar() {
  var dentistJson = localStorage.getItem("Dentist");
  console.log(dentistJson);
  var dentistDto = JSON.parse(dentistJson);
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/intranet/DentalAesthetics/appointments")
      .then((response) => {
        const formattedEvents = response.data.map((evento) => ({
          title: evento.title,
          start: evento.date_time_beginning,
          end: evento.date_time_ending,
          description: evento.description,
        }));

        // Establece los eventos transformados en el estado
        setEventos(formattedEvents);
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
  if (dentistJson == null || dentistDto.permis == 0) {
    Swal.fire({
      title: "¿Estas seguro de que tienes permisos para esta página?",
      icon: false,
      text: "Yo creo que no, pero contacta con maken",
      imageUrl: side_eye,
      imageWidth: 400,
      imageHeight: 300,
      imageAlt: "Ojo Lateral Boombastico ;-;",
      showCancelButton: false,
      showConfirmButton: false,
    });
    setTimeout(() => {
      window.location.href = "/login";
    }, 4000);
    return null;
  }

  return (
    <>
      <div
        style={{
          width: "1050px",
          height: "90vh",
          color: "black",
          marginLeft: "9%",
          marginRight: "0",
        }}
      >
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={eventos}
          eventContent={eventContent}
          eventMouseEnter={eventMouseEnter}
          eventMouseLeave={eventMouseLeave}
          height={"83vh"}
          locale={esLocale} 
          firstDay={1} 
        />
      </div>
    </>
  );
}

export default Calendar;
