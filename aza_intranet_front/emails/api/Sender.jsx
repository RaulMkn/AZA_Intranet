import { render } from "@react-email/render";
import AppointmentTemplate from "../AppointmentTemplate";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.VITE_RESEND_KEY);

async function sendEmail(patient, appointmentDto) {
  try {
    // Envía el correo electrónico utilizando la información del paciente
    const { error } = await resend.emails.send({
      from: "AZA <onboarding@resend.dev>",
      to: [patient.email],
      subject: "Recordatorio cita dental",
      html: render(<AppointmentTemplate patientDto={patient} appointmentDto={appointmentDto} />),
    });

    if (error) {
      throw new Error("Error sending email");
    }

    return { message: "Email sent successfully" };
  } catch (error) {
    throw new Error("Error sending email");
  }
}

export default sendEmail;
