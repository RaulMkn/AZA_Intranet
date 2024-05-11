import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import "./AppointmentTemplate.css";

const KoalaWelcomeEmail = ({ patient,appointmentDto }) => {
  // Format the date for the iCalendar format
  const formatDate = (date) => {
    return date.toISOString().replace(/-|:|\.\d+/g, "");
  };

  // Generate the iCalendar file content
  const generateICSContent = () => {
    const { title, description, location, start, end } = event;
    const formattedStart = formatDate(start);
    const formattedEnd = formatDate(end);

    return `BEGIN:VCALENDAR
  VERSION:2.0
  BEGIN:VEVENT
  SUMMARY:${title}
  DESCRIPTION:${description}
  LOCATION:${location}
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
        The sales intelligence platform that helps you uncover qualified leads.
      </Preview>
      <Body className="main">
        <Container className="container">
          <Img
            src={`imagen`}
            width="170"
            height="50"
            alt="Koala"
            className="logo"
          />
          <Text className="paragraph">Hi {patient.full_name},</Text>
          <Text className="paragraph">
            Welcome to Koala, the sales intelligence platform that helps you
            uncover qualified leads and close deals faster.
          </Text>
          <Section className="btn-container">
            <Button
              href={`data:text/calendar;charset=utf-8,${encodedICSContent}`}
              download={`${event.title}.ics`}
            >
              Agregar al calendario
            </Button>
          </Section>
          <Text className="paragraph">
            Best,
            <br />
            The Koala team
          </Text>
          <Hr className="hr" />
          <Text className="footer">
            470 Noor Ave STE B #1148, South San Francisco, CA 94080
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

KoalaWelcomeEmail.PreviewProps = {
  userFirstname: "Alan",
};

export default KoalaWelcomeEmail;
