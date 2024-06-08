// src/components/CreateAppointmentPage.js
import { Form, Input, DatePicker, Select, Button } from "antd";
import DepartmentsDropdown from "../../utils/DepartmentsDropdown";
import axios from "axios";
import Swal from "sweetalert2";
import PatientDropdown from "../../utils/PatientsDropdown";
import InterventionsDropdown from "../../utils/InterventionsDropdown";
//import Sender from "../../../emails/api/Sender";
import AppointmentDto from "../../DTOs/AppointmentDto";
import { checkPermissionsAndRedirect } from "../../utils/CheckPermissions";
import { useEffect } from "react";

const { Option } = Select;

const CreateAppointmentPage = () => {
  const [form] = Form.useForm();
  var dentistJson = localStorage.getItem("Dentist");
  var dentistDto = JSON.parse(dentistJson);
  useEffect(() => {
    checkPermissionsAndRedirect(dentistDto);
  },);
  
  const handleDepartmentSelected = (departmentId) => {
    form.setFieldsValue({ department: departmentId });
  };

  const handlePatientSelected = (patientId) => {
    form.setFieldsValue({ patient: patientId });
  };

  const handleInterventionSelected = (interventionIds) => {
    const interventionsArray = Array.isArray(interventionIds)
      ? interventionIds
      : [interventionIds];
    form.setFieldsValue({
      interventions: interventionsArray.map((id) => parseInt(id, 10)),
    });
  };

  const handleSubmit = async (values) => {
    try {
      const {
        date_time_beginning,
        date_time_ending,
        priority,
        title,
        department,
        description,
        patient,
        interventions,
      } = values;

      const state = "Pendiente";
      const invoice = "Factura Generica";
      const dentist = dentistDto.id;
      const total_price = 0;
      const interventionsInt = interventions.map((intervention) =>
        parseInt(intervention, 10)
      );
      const patientInt = parseInt(patient, 10);

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
        patientInt,
        interventionsInt
      );

      const formData = AppointmentDto.toFormData(appointmentDto);
      const response = await axios.post(
        "http://localhost:8080/intranet/DentalAesthetics/appointment",
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

      const patientInfo = response.data.patient;
      console.log(patientInfo);
      /*
      try {
        await Sender({ patient: patientInfo, appointmentDto: appointmentDto });
        Swal.fire({
          title: "Cita creada con éxito!",
          icon: "success",
        });
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      } catch (error) {
        console.error("Error al enviar el correo electrónico:", error);
        Swal.fire({
          title: "Fallo al crear la cita!",
          text: "La cita se ha creado correctamente pero ha habido un problema con el envio del correo. Por favor pongase en contacto con el paciente.",
          icon: "warning",
          
          
        });
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      }*/
      Swal.fire({
        title: "Cita creada con éxito!",
        icon: "success",
      });
      setTimeout(() => {
        window.location.href = "/appointments";
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
              <DatePicker showTime format="YYYY-MM-DD HH:mm" />
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
              label="Procedimiento"
              name="interventions"
              rules={[
                { required: true, message: "Ingrese los procedimientos" },
              ]}
            >
              <InterventionsDropdown onSelect={handleInterventionSelected} />
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
