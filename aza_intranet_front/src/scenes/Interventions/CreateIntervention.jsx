import { Form, Input, Button } from "antd";
import DepartmentDropDown from "../../utils/DepartmentsDropdown";
import Swal from "sweetalert2";
import InterventionDto from "../../DTOs/InterventionDto";
import axios from "axios";

const CreateIntervention = () => {
  const [form] = Form.useForm();

  const handleDepartmentSelected = (departmentId) => {
    // Establece el valor del departmenta seleccionado en el formulario
    form.setFieldsValue({ department: departmentId });
  };

  const handleSubmit = async (values) => {
    try {
      // Accede directamente a los valores del formulario desde el objeto 'values'
      const { full_name, price, phone, department } = values;

      // Crea una instancia de PatientDto con los valores del formulario
      const interventionDto = new InterventionDto(
        full_name,
        price,
        phone,
        department
      );

      // Convierte el objeto PatientDto en FormData
      const formData = InterventionDto.toFormData(interventionDto);
      console.log(interventionDto);

      // Realiza la solicitud POST a la API
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
      // Muestra un mensaje de éxito al usuario
      Swal.fire({
        title: "Intervencion creada con éxito!",
        icon: "success",
      });

      // Puedes hacer más acciones aquí después de una creación exitosa (por ejemplo, redirigir a otra página)
    } catch (error) {
      console.error("Error al enviar datos al servidor:", error);

      // Muestra un mensaje de error al usuario
      Swal.fire({
        title: "Fallo al crear la intervencion!",
        text: "Revise los datos del formulario o póngase en contacto con maken :(",
        icon: "error",
      });
    }
  };

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
