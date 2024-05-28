// src/components/CreateEventPage.js
import { Form, Input, DatePicker, Button } from "antd";
import axios from "axios";
import Swal from "sweetalert2";
import side_eye from "../../assets/side_eye.jpeg";
import EventDto from "../../DTOs/EventDto";


const CreateEventPage = () => {
  const [form] = Form.useForm();

  var dentistJson = localStorage.getItem("Dentist");
  //console.log(dentistJson)

  // Convertir la cadena JSON a un objeto DentistDto
  var dentistDto = JSON.parse(dentistJson);
  if (dentistJson == null) {
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

  const handleSubmit = async (values) => {
    try {
      const {
        date_time_beginning,
        date_time_ending,
        title,
        description,
        location,
      } = values;

      const dentist = dentistDto.id;

      const eventDto = new EventDto(
        date_time_beginning,
        date_time_ending,
        title,
        description,
        location,
        dentist
      );

      const formData = eventDto.toFormData(eventDto);
      await axios.post(
        "http://localhost:8080/intranet/DentalAesthetics/event",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + btoa(import.meta.env.VITE_DATABASE_AUTH),
          },
          crossdomain: true,
        }
      );
      Swal.fire({
        title: "Cita creada con exito!",
        icon: "success",
      });

      setTimeout(() => {
        window.location.href = "/events";
      }, 4000);
    } catch (error) {
      console.error("Error al enviar datos al servidor:", error);

      Swal.fire({
        title: "Fallo al crear la cita!",
        text: "Revise los datos del formulario o póngase en contacto con maken :(",
        icon: "error",
      });

      setTimeout(() => {
        window.location.reload();
      }, 4000);
    }
  };

  return (
    <>
      <main className="form-container">
        <h1 className="title">Crear Evento</h1>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <div className="form-row">
            <Form.Item
              label="Fecha de Inicio"
              name="date_time_beginning"
              rules={[
                { required: true, message: "Ingrese la fecha de inicio" },
              ]}
            >
              <DatePicker showTime format="YYYY-MM-DD HH:mm" />
            </Form.Item>
            <Form.Item
              label="Fecha de Fin"
              name="date_time_ending"
              rules={[{ required: true, message: "Ingrese la fecha de fin" }]}
            >
              <DatePicker showTime format="YYYY-MM-DD HH:mm" />
            </Form.Item>
          </div>

          <Form.Item
            label="Título"
            name="title"
            rules={[{ required: true, message: "Ingrese el título" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Descripción"
            name="description"
            rules={[{ required: true, message: "Ingrese la descripción" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Ubicacion"
            name="location"
            rules={[{ required: true, message: "Ingrese la ubicacion" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Crear Evento
            </Button>
          </Form.Item>
        </Form>
      </main>
    </>
  );
};

export default CreateEventPage;
