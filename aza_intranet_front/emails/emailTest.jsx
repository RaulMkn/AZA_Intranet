import { Button } from '@react-email/button';
import { Hr } from '@react-email/hr';
import { Html } from '@react-email/html';
import { Text } from '@react-email/text';

// eslint-disable-next-line react/prop-types
export function ConfirmationEmail({ patientName, appointmentDate }) {
  const formattedDate = new Date(appointmentDate).toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  const calendarLink = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:Dental Appointment
DTSTART:${formattedDate}
DTEND:${formattedDate}
END:VCALENDAR`;

  return (
    <Html lang="en">
      <Text>¡Confirmación de cita dental!</Text>
      <Text>Estimado {patientName},</Text>
      <Text>Su cita dental ha sido confirmada para:</Text>
      <Text>{formattedDate}</Text>
      <Hr />
      <Button href={`data:text/calendar;charset=utf-8,${encodeURIComponent(calendarLink)}`} download="appointment.ics">Añadir a Calendario</Button>
    </Html>
  );
}
export default ConfirmationEmail

