import { Form, Input, Button } from "antd";
import DentistDropDown from "../../utils/DentistsDropdown";
import Swal from "sweetalert2";
import PatientDto from "../../DTOs/PatientDto";
import axios from "axios";

const CreatePatient = () => {
  const [form] = Form.useForm();

  const handleDentistSelect = (dentistId) => {
    // Establece el valor del dentista seleccionado en el formulario
    form.setFieldsValue({ dentist: dentistId });
  };

  const handleSubmit = async (values) => {
    try {
      // Accede directamente a los valores del formulario desde el objeto 'values'
      const { full_name, email, phone, dentist } = values;

      // Crea una instancia de PatientDto con los valores del formulario
      const patientDto = new PatientDto(full_name, email, phone, dentist);

      // Convierte el objeto PatientDto en FormData
      const formData = PatientDto.toFormData(patientDto);
      console.log(patientDto)

      // Realiza la solicitud POST a la API
      await axios.post(
        "http://localhost:8080/intranet/DentalAesthetics/patient",
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
        title: "Paciente creado con éxito!",
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
      <div className="form-container">
        <h1 className="title">Crear Paciente</h1>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            label="Nombre"
            name="full_name"
            rules={[
              { required: true, message: "Ingrese el nombre del paciente" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Ingrese el email del paciente" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Telefono"
            name="phone"
            rules={[
              { required: true, message: "Ingrese el numero de telefono" },
            ]}
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

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Crear Paciente
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default CreatePatient;
