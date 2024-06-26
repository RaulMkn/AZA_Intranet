import { Form, Input, Button, Radio, DatePicker } from "antd";
import DentistDropDown from "../../utils/DentistsDropdown";
import Swal from "sweetalert2";
import PatientDto from "../../DTOs/PatientDto";
import axios from "axios";
import { checkPermissionsAndRedirect } from "../../utils/CheckPermissions";
import { useEffect } from "react";

const CreatePatient = () => {
  var dentistJson = localStorage.getItem("Dentist");
  var dentistDto = JSON.parse(dentistJson);

  useEffect(() => {
    checkPermissionsAndRedirect(dentistDto);
  });
  const [form] = Form.useForm();

  const handleDentistSelect = (dentistId) => {
    form.setFieldsValue({ dentist: dentistId });
  };

  const handleSubmit = async (values) => {
    try {
      const {
        full_name,
        email,
        phone,
        dentist,
        nif,
        address,
        gender,
        date_of_birth,
      } = values;

      const patientDto = new PatientDto(
        full_name,
        email,
        phone,
        dentist,
        nif,
        address,
        gender,
        date_of_birth
      );

      const formData = PatientDto.toFormData(patientDto);
      console.log(patientDto);

      await axios.post(
        "http://localhost:8080/intranet/DentalAesthetics/patient",
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
        title: "Paciente creado con éxito!",
        icon: "success",
      });
      setTimeout(() => {
        window.location.href = "/patients";
      }, 4000);
    } catch (error) {
      console.error("Error al enviar datos al servidor:", error);

      Swal.fire({
        title: "Fallo al crear la cita!",
        text: "Revise los datos del formulario o póngase en contacto con maken :(",
        icon: "error",
      });
    }
  };

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <h1 className="title">Crear Paciente</h1>

      <div className="form-row">
        <Form.Item
          label="Nombre Completo"
          name="full_name"
          rules={[
            { required: true, message: "Ingrese el nombre del paciente" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="DNI/NIE"
          name="nif"
          rules={[
            { required: true, message: "Ingrese el DNI/NIE del paciente" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Direccion"
          name="address"
          rules={[
            {
              required: true,
              message: "Ingrese la direccion del paciente",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </div>
      <div className="form-row">
        <Form.Item
          label="Genero"
          name="gender"
          rules={[
            { required: true, message: "Ingrese el genero del paciente" },
          ]}
        >
          <Radio.Group>
            <Radio value="Masculino">Masculino</Radio>
            <Radio value="Femenino">Femenino</Radio>
            <Radio value="Otro">Otro</Radio>
          </Radio.Group>
        </Form.Item>
      </div>
      <div className="form-row">
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Ingrese el email del paciente" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Fecha de nacimiento"
          name="date_of_birth"
          rules={[
            { required: true, message: "Ingrese la fecha de nacimiento" },
          ]}
        >
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>
      </div>
      <div className="form-row">
        <Form.Item
          label="Telefono"
          name="phone"
          rules={[{ required: true, message: "Ingrese el numero de telefono" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Dentista"
          name="dentist"
          rules={[{ required: true, message: "Seleccione un dentista" }]}
        >
          <DentistDropDown onSelect={handleDentistSelect} />
        </Form.Item>
      </div>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Crear Paciente
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreatePatient;
