import { Form, Input, Button, Radio } from "antd";
import DepartmentsDropdown from "../../utils/DepartmentsDropdown";
import axios from "axios";
import Swal from "sweetalert2";
import side_eye from "../../assets/side_eye.jpeg";
import DentistDto from "../../DTOs/DentistDto";

const CreateDentist = () => {
  const [form] = Form.useForm();

  const dentistJson = localStorage.getItem("Dentist");

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

  const handleDepartmentSelected = (departmentId) => {
    form.setFieldsValue({ department: departmentId });
  };

  const handleSubmit = async (values) => {
    try {
      const {
        full_name,
        email,
        pass,
        job,
        permis,
        department,
        picture,
        date_of_birth,
        nif,
        address,
        gender,
      } = values;

      const dentistDto = new DentistDto(
        full_name,
        email,
        pass,
        job,
        permis,
        department,
        picture,
        date_of_birth,
        nif,
        address,
        gender
      );

      const formData = DentistDto.toFormData(dentistDto);
      await axios.post(
        "http://localhost:8080/intranet/DentalAesthetics/dentist",
        formData,
        {
          withCredentials: true,
          headers: {
            Authorization: "Basic " + btoa(import.meta.env.VITE_DATABASE_AUTH),
          },
        }
      );

      Swal.fire({
        title: "Usuario creado con éxito!",
        icon: "success",
      });
      setTimeout(() => {
        window.location.reload();
      }, 4000);
    } catch (error) {
      console.error("Error al enviar datos al servidor:", error);

      Swal.fire({
        title: "Fallo al crear el usuario!",
        text: "Revise los datos del formulario o póngase en contacto con maken :(",
        icon: "error",
      });

      setTimeout(() => {
        window.location.reload();
      }, 4000);
    }
  };

  return (
    <main className="form-container">
      <h1 className="title">Crear Nuevo Usuario</h1>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <div className="form-row">
          <Form.Item
            label="Nombre Completo"
            name="full_name"
            rules={[
              { required: true, message: "Ingrese el nombre del usuario" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Departamento"
            name="department"
            rules={[{ required: true, message: "Ingrese el departamento" }]}
          >
            <DepartmentsDropdown onSelect={handleDepartmentSelected} />
          </Form.Item>
        </div>
        <div className="form-row">
          <Form.Item
            label="Puesto"
            name="job"
            rules={[
              { required: true, message: "Seleccione el puesto del usuario" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Permisos"
            name="permis"
            rules={[{ required: true, message: "¿Permisos de administrador?" }]}
          >
            <Radio.Group>
              <Radio value="yes">Sí</Radio>
              <Radio value="no">No</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Genero"
            name="gender"
            rules={[{ required: true, message: "Seleccione el genero" }]}
          >
            <Radio.Group>
              <Radio value="yes">Masculino</Radio>
              <Radio value="no">Femenino</Radio>
              <Radio value="no">Otro</Radio>
            </Radio.Group>
          </Form.Item>
        </div>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Ingrese el email del usuario" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Contraseña"
          name="pass"
          rules={[{ required: true, message: "Ingrese la contraseña" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Direccion"
          name="address"
          rules={[
            { required: true, message: "Ingrese la direccion del usuario" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="DNI / NIE"
          name="nif"
          rules={[{ required: true, message: "Ingrese el NIF del usuario" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Crear Usuario
          </Button>
        </Form.Item>
      </Form>
    </main>
  );
};

export default CreateDentist;
