import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import { checkPermissionsAndRedirect } from "../../utils/CheckPermissions";
import Swal from "sweetalert2";

function Calendar() {
  const dentistJson = localStorage.getItem("Dentist");
  const dentistDto = dentistJson ? JSON.parse(dentistJson) : null;
  const [eventos, setEventos] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (dentistDto) {
      checkPermissionsAndRedirect(dentistDto);
    }
  }, [dentistDto]);

  useEffect(() => {
    if (dentistDto) {
      axios
        .get(`http://localhost:8080/intranet/DentalAesthetics/appointments`)
        .then((response) => {
          const formattedAppointments = response.data.map((evento) => ({
            title: evento.title,
            start: evento.date_time_beginning,
            dentist: evento.dentist,
            end: evento.date_time_ending,
            description: evento.description,
            patient: evento.patient,
            backgroundColor: "#9999ff",
            borderColor: "#9999ff",
          }));
          setAppointments(formattedAppointments);
        })
        .catch((error) => {
          console.error("Error al obtener citas:", error);
        });

      axios
        .get(`http://localhost:8080/intranet/DentalAesthetics/events`)
        .then((response) => {
          const formattedEvents = response.data.map((evento) => ({
            title: evento.title,
            start: evento.date_time_beginning,
            dentist: evento.dentist,
            end: evento.date_time_ending,
            description: evento.description,
            backgroundColor: "#ff9999",
            borderColor: "#ff9999",
          }));
          setEventos(formattedEvents);
        })
        .catch((error) => {
          console.error("Error al obtener eventos:", error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const eventClick = (info) => {
    let patientInfo = "";
    if (
      info.event.extendedProps.patient &&
      info.event.extendedProps.patient.full_name
    ) {
      patientInfo = `<div><strong>Paciente:</strong> ${info.event.extendedProps.patient.full_name}</div>`;
    }

    Swal.fire({
      icon: "none",
      title: `${info.event.title}`,
      html: `
              <div><strong>Dentista:</strong> ${
                info.event.extendedProps.dentist.full_name
              }</div>
        <div><strong>Descripción:</strong> ${
          info.event.extendedProps.description
        }</div>
        ${patientInfo}
        <div><strong>Inicio:</strong> ${new Date(
          info.event.start
        ).toLocaleTimeString()}</div>
        <div><strong>Final:</strong> ${new Date(
          info.event.end
        ).toLocaleTimeString()}</div>
      `,
    });
  };

  return (
    <FullCalendar
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
      }}
      initialView="dayGridMonth"
      slotMinTime='09:00:00'
      slotMaxTime='21:00:00'
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      events={eventos.concat(appointments)}
      eventClick={eventClick}
      height={"auto"}
      firstDay={1}
    />
  );
}

export default Calendar;
