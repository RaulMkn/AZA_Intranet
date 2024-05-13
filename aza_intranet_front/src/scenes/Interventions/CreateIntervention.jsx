import { Form, Input, Button } from "antd";
import DepartmentDropDown from "../../utils/DepartmentsDropdown";
import Swal from "sweetalert2";
import InterventionDto from "../../DTOs/InterventionDto";
import axios from "axios";
import side_eye from "../../assets/side_eye.jpeg";

const CreateIntervention = () => {
  var dentistJson = localStorage.getItem("Dentist");
  console.log(dentistJson);
  var dentistDto = JSON.parse(dentistJson);

  const [form] = Form.useForm();

  const handleDepartmentSelected = (departmentId) => {
    form.setFieldsValue({ department: departmentId });
  };

  const handleSubmit = async (values) => {
    try {
      const { full_name, price, department } = values;

      const interventionDto = new InterventionDto(full_name, price, department);

      const formData = InterventionDto.toFormData(interventionDto);
      console.log(interventionDto);

      await axios.post(
        "http://localhost:8080/intranet/DentalAesthetics/intervention",
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
        title: "Intervencion creada con éxito!",
        icon: "success",
      });
      setTimeout(() => {
        window.location.href = "/interventions";
      }, 2000);
    } catch (error) {
      console.error("Error al enviar datos al servidor:", error);
      Swal.fire({
        title: "Fallo al crear la intervencion!",
        text: "Revise los datos del formulario o póngase en contacto con maken :(",
        icon: "error",
      });
    }
  };
  if (dentistJson == null || dentistDto.permis == 0) {
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

  return (
    <>
      <div className="form-container">
        <h1 className="title">Crear Intervencion</h1>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            label="Nombre"
            name="full_name"
            rules={[
              {
                required: true,
                message: "Ingrese el nombre de la intervencion",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            type="number"
            label="Precio"
            name="price"
            rules={[
              {
                required: true,
                message: "Ingrese el precio de la intervencion",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Departamento"
            name="department"
            rules={[{ required: true, message: "Seleccione un departamento" }]}
          >
            <DepartmentDropDown onSelect={handleDepartmentSelected} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Crear Intervencion
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default CreateIntervention;
