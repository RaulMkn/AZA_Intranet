import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
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
          patient: evento.patient,
        }));
        setEventos(formattedEvents);
      })
      .catch((error) => {
        console.error("Error al obtener eventos:", error);
      });
  }, []); // Se ejecuta solo al montar el componente

  const eventMouseEnter = ({ el, event }) => {
    el.classList.add("relative");

    const newEl = document.createElement("div");
    newEl.innerHTML = `
      <div class="fc-hoverable-event" style="position: absolute; bottom: 100%; width: 300px; height: auto; background-color: white; z-index: 50; border: 1px solid #e2e8f0; border-radius: 0.375rem; padding: 0.75rem; font-size: 14px; font-family: 'Inter', sans-serif; cursor: pointer;">
        <strong>${event.title}</strong>
        <div><strong>Descripcion:</strong> ${event.extendedProps.description}</div>
        <div><strong>Paciente:</strong> ${event.extendedProps.patient.full_name}</div>
        <div><strong>Inicio:</strong> ${new Date(event.start).toLocaleTimeString()}</div>
        <div><strong>Final:</strong> ${new Date(event.end).toLocaleTimeString()}</div>
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
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          initialView='timeGridDay'
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          events={eventos}
          eventMouseEnter={eventMouseEnter}
          eventMouseLeave={eventMouseLeave}
          height={"83vh"}
          weekends={false}
          locale={esLocale}
          firstDay={1}
        />
      </div>
    </>
  );
}

export default Calendar;
