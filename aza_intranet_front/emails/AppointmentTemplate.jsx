/* eslint-disable react/prop-types */
import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

const ConfirmAppointmentTemplate = ({
  userFirstName,
  loginDate,
  loginDevice,
  loginLocation,
  loginIp,
}) => {
  const formattedDate = new Intl.DateTimeFormat("en", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(loginDate);
  const calendarLink = `BEGIN:VCALENDAR
    VERSION:2.0
    BEGIN:VEVENT
    SUMMARY:Dental Appointment
    DTSTART:${formattedDate}
    DTEND:${formattedDate}
    END:VCALENDAR`;

  return (
    <Html>
      <Head />
      <Preview>Yelp recent login</Preview>
      <Body style={main}>
        <Container>
          <Section style={logo}>
          </Section>
          <Section style={content}>
            <Row>
            </Row>
            <Row style={{ ...boxInfos, paddingBottom: "0" }}>
              <Column>
                <Heading style={{ fontSize: 32, fontWeight: "bold", textAlign: "center" }}>
                  Hi {userFirstName},
                </Heading>
                <Heading as="h2" style={{ fontSize: 26, fontWeight: "bold", textAlign: "center" }}>
                  We noticed a recent login to your Yelp account.
                </Heading>
                <Text style={paragraph}><b>Time: </b>{formattedDate}</Text>
                <Text style={{ ...paragraph, marginTop: -5 }}><b>Device: </b>{loginDevice}</Text>
                <Text style={{ ...paragraph, marginTop: -5 }}><b>Location: </b>{loginLocation}</Text>
                <Text style={{ color: "rgba(0,0,0, 0.5)", fontSize: 14, marginTop: -5 }}>
                  *Approximate geographic location based on IP address: {loginIp}
                </Text>
                <Text style={paragraph}>If this was you, therenothing else you need to do.</Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  If this wasnt you or if you have additional questions, please see our support page.
                </Text>
              </Column>
            </Row>
            <Row style={{ ...boxInfos, paddingTop: "0" }}>
              <Column style={containerButton}>
                <Button style={button} href={`data:text/calendar;charset=utf-8,${encodeURIComponent(calendarLink)}`} download="appointment.ics">Añadir al Calendario</Button>
              </Column>
            </Row>
          </Section>
          <Section style={containerImageFooter}>
          </Section>
          <Text style={{ textAlign: "center", fontSize: 12, color: "rgba(0,0,0, 0.7)" }}>
            © 2022 | Yelp Inc., 350 Mission Street, San Francisco, CA 94105, U.S.A. | www.yelp.com
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

ConfirmAppointmentTemplate.PreviewProps = {
  userFirstName: "Alan",
  loginDate: new Date("September 7, 2022, 10:58 am"),
  loginDevice: "Chrome on Mac OS X",
  loginLocation: "Upland, California, United States",
  loginIp: "47.149.53.167",
};

export default ConfirmAppointmentTemplate;

const main = {
  backgroundColor: "#fff",
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const paragraph = {
  fontSize: 16,
};

const logo = {
  padding: "30px 20px",
};

const containerButton = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
};

const button = {
  backgroundColor: "#e00707",
  borderRadius: 3,
  color: "#FFF",
  fontWeight: "bold",
  border: "1px solid rgba(0,0,0, 0.1)",
  cursor: "pointer",
  padding: "12px 30px",
};

const content = {
  border: "1px solid rgba(0,0,0, 0.1)",
  borderRadius: "3px",
  overflow: "hidden",
};

//const image = {
 // maxWidth: "100%",
//};

const boxInfos = {
  padding: "20px",
};

const containerImageFooter = {
  padding: "45px 0 0 0",
};
