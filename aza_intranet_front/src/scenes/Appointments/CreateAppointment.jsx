// src/components/CreateAppointmentPage.js
import { Form, Input, DatePicker, Select, Button } from "antd";
import DepartmentsDropdown from "../../utils/DepartmentsDropdown";
import "./Appointment.css";
import axios from "axios";
import Swal from "sweetalert2";
import AppointmentDto from "../../DTOs/AppointmentDto";
import PatientDropdown from "../../utils/PatientsDropdown";

const { Option } = Select;

const CreateAppointmentPage = () => {
  const [form] = Form.useForm();

  const handleDepartmentSelected = (departmentId) => {
    // Establece el valor del dentista seleccionado en el formulario
    form.setFieldsValue({ department: departmentId });
  };

  const handlePatientSelected = (patientId) => {
    // Establece el valor del dentista seleccionado en el formulario
    form.setFieldsValue({ patient: patientId });
  };

  const handleSubmit = async (values) => {
    try {
      // Accede directamente a los valores del formulario desde el objeto 'values'
      const {
        date_time_beginning,
        date_time_ending,
        priority,
        title,
        department,
        description,
        //dentist,
        patient,
      } = values;

      const state = "Completa";
      const invoice = "Pruebas";
      const dentist = 1;
      const total_price = 20; //Esto seguramente se vaya fuera

      // Crea una instancia de AppointmentDto con los valores del formulario
      const appointmentDto = new AppointmentDto(
        date_time_beginning,
        date_time_ending,
        priority,
        state,
        title,
        department,
        description,
        total_price,
        invoice,
        dentist,
        patient
      );

      // Convierte el objeto AppointmentDto en FormData
      const formData = AppointmentDto.toFormData(appointmentDto);
      console.log(appointmentDto);

      // Realiza la solicitud POST a la API
      await axios.post(
        "http://localhost:8080/intranet/DentalAesthetics/appointment",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + btoa("maken:yuki"),
          },
          crossdomain: true,
        }
      );

      // Muestra un mensaje de éxito al usuario
      Swal.fire({
        title: "Cita creada con éxito!",
        icon: "success",
      });

      // Puedes hacer más acciones aquí después de una creación exitosa (por ejemplo, redirigir a otra página)
    } catch (error) {
      console.error("Error al enviar datos al servidor:", error);

      // Muestra un mensaje de error al usuario
      Swal.fire({
        title: "Fallo al crear la cita!",
        text: "Revise los datos del formulario o póngase en contacto con maken :(",
        icon: "error",
      });
    }
  };

  return (
    <>
      <main className="form-container">
        <h1 className="title">Crear Cita para Paciente</h1>
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
              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            </Form.Item>
          </div>
          <div className="form-row">
            <Form.Item
              label="Paciente"
              name="patient"
              rules={[{ required: true, message: "Ingrese el paciente" }]}
            >
              <PatientDropdown onSelect={handlePatientSelected} />
            </Form.Item>

            <Form.Item
              label="Departamento"
              name="department"
              rules={[{ required: true, message: "Ingrese el departamento" }]}
            >
              <DepartmentsDropdown onSelect={handleDepartmentSelected} />
            </Form.Item>
            <Form.Item
              label="Prioridad"
              name="priority"
              rules={[{ required: true, message: "Seleccione la prioridad" }]}
            >
              <Select>
                <Option value="Alta">Alta</Option>
                <Option value="Media">Media</Option>
                <Option value="Baja">Baja</Option>
              </Select>
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
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Crear Cita
            </Button>
          </Form.Item>
        </Form>
      </main>
    </>
  );
};

export default CreateAppointmentPage;
