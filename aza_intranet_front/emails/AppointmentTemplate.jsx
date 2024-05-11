import PropTypes from "prop-types";
import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import "./AppointmentTemplate.css";

const KoalaWelcomeEmail = ({ patient, appointmentDto }) => {
  // Validación de props
  PropTypes.checkPropTypes(KoalaWelcomeEmail.propTypes, { patient, appointmentDto }, 'prop', 'KoalaWelcomeEmail');

  // Format the date for the iCalendar format
  const formatDate = (date) => {
    return date.toISOString().replace(/-|:|\.\d+/g, "");
  };

  // Generate the iCalendar file content
  const generateICSContent = () => {
    const formattedStart = formatDate(appointmentDto.date_time_beginning);
    const formattedEnd = formatDate(appointmentDto.date_time_end);

    return `BEGIN:VCALENDAR
  VERSION:2.0
  BEGIN:VEVENT
  SUMMARY:${appointmentDto.title}
  DESCRIPTION:${appointmentDto.description}
  LOCATION:${appointmentDto.location}
  DTSTART:${formattedStart}
  DTEND:${formattedEnd}
  END:VEVENT
  END:VCALENDAR`;
  };

  // Encode the iCalendar file content for use in an href
  const encodedICSContent = encodeURIComponent(generateICSContent());

  return (
    <Html>
      <Head />
      <Preview>
        Recordatorio cita dental.
      </Preview>
      <Body className="main">
        <Container className="container">
          <Img
            src={"../src/assets/AZA_logo2.png"}
            width="170"
            height="50"
            alt="Logo"
            className="logo"
          />
          <Text className="paragraph">Hola {patient.full_name},</Text>
          <Text className="paragraph">
            Le recordamos que tiene una cita para una consulta en la clínica AZA el dia {appointmentDto.date_time_beginning.toLocaleString()}
          </Text>
          <Section className="btn-container">
            <Button
              href={`data:text/calendar;charset=utf-8,${encodedICSContent}`}
              download={`${appointmentDto.title}.ics`}
            >
              Agregar al calendario
            </Button>
          </Section>
          <Text className="paragraph">
            Un placer,
            <br />
            Equipo clínica dental AZA
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

// Prop validation
KoalaWelcomeEmail.propTypes = {
  patient: PropTypes.shape({
    full_name: PropTypes.string.isRequired,
  }).isRequired,
  appointmentDto: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    date_time_beginning: PropTypes.instanceOf(Date).isRequired,
    date_time_end: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
};

KoalaWelcomeEmail.PreviewProps = {
  patient: {
    full_name: "Juan Pérez",
  },
  appointmentDto: {
    title: "Consulta dental",
    description: "Consulta regular de revisión y limpieza",
    location: "Clínica Dental AZA",
    date_time_beginning: new Date("2024-05-15T10:00:00"),
    date_time_end: new Date("2024-05-15T11:00:00"),
  },
};


export default KoalaWelcomeEmail;
