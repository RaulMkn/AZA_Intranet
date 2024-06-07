import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from "axios";
import esLocale from "@fullcalendar/core/locales/es";
import { checkPermissionsAndRedirect } from "../../utils/CheckPermissions";
import Swal from "sweetalert2";

function Calendar() {
  const dentistJson = localStorage.getItem("Dentist");
  const dentistDto = dentistJson ? JSON.parse(dentistJson) : null;
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    if (dentistDto) {
      checkPermissionsAndRedirect(dentistDto);
    } 
  }, [dentistDto]);

  useEffect(() => {
    if (dentistDto) {
      axios
        .get(`http://localhost:8080/intranet/DentalAesthetics/appointment/dentistId/${dentistDto.id}`)
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
    }
  }, []);

  const eventClick = (info) => {
    Swal.fire({
      icon: "info",
      title: `${info.event.title}`,
      html: `
        <div><strong>Descripción:</strong> ${info.event.extendedProps.description}</div>
        <div><strong>Paciente:</strong> ${info.event.extendedProps.patient.full_name}</div>
        <div><strong>Inicio:</strong> ${new Date(info.event.start).toLocaleTimeString()}</div>
        <div><strong>Final:</strong> ${new Date(info.event.end).toLocaleTimeString()}</div>
      `,
    });
  };

  return (
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
        initialView='timeGridWeek'
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        events={eventos}
        eventClick={eventClick}
        height={"83vh"}
        weekends={false}
        locale={esLocale}
        firstDay={1}
      />
    </div>
  );
}

export default Calendar;
