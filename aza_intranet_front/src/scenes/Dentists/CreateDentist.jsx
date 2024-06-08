import { useState, useEffect } from "react";
import { Form, Input, Button, Radio, Upload, message, DatePicker } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import DepartmentsDropdown from "../../utils/DepartmentsDropdown";
import axios from "axios";
import Swal from "sweetalert2";
import { checkAdminPermissionsAndRedirect } from "../../utils/CheckPermissions";

const CreateDentist = () => {
  const [form] = Form.useForm();
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const dentistJson = localStorage.getItem("Dentist");
    const dentistDto = JSON.parse(dentistJson);
    checkAdminPermissionsAndRedirect(dentistDto);
  }, []);

  const handleDepartmentSelected = (departmentId) => {
    form.setFieldsValue({ department: departmentId });
  };

  const handleChange = (info) => {
    if (info.file.status === "done" || info.file.status === "uploading") {
      setImageFile(info.file.originFileObj);
      setError(null);
    }
    if (info.file.status === "error") {
      setError("Error al subir el archivo. Intente nuevamente.");
    }
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("Solo puede subir archivos JPG/PNG.");
      return Upload.LIST_IGNORE;
    }
    setImageFile(file);
    return false;
  };

  const handleSubmit = async (values) => {
    try {
      const {
        full_name,
        email,
        pass,
        job,
        permits,
        department,
        date_of_birth,
        nif,
        address,
        gender,
      } = values;

      const formData = new FormData();
      formData.append("full_name", full_name);
      formData.append("email", email);
      formData.append("pass", pass);
      formData.append("job", job);
      formData.append("permits", permits);
      formData.append("department", department);
      formData.append("date_of_birth", date_of_birth.format("YYYY-MM-DD"));
      formData.append("nif", nif);
      formData.append("address", address);
      formData.append("gender", gender);
      formData.append("file", imageFile);

      for (let pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }

      await axios.post(
        "http://localhost:8080/intranet/DentalAesthetics/dentist",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
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
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Ingrese el email del usuario" },
            ]}
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
        </div>
        <div className="form-row">
          <Form.Item
            label="Departamento"
            name="department"
            rules={[{ required: true, message: "Ingrese el departamento" }]}
          >
            <DepartmentsDropdown onSelect={handleDepartmentSelected} />
          </Form.Item>
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
            name="permits"
            rules={[{ required: true, message: "¿Permisos de administrador?" }]}
          >
            <Radio.Group>
              <Radio value="1">Sí</Radio>
              <Radio value="0">No</Radio>
            </Radio.Group>
          </Form.Item>
        </div>
        <div className="form-row">
          <Form.Item
            label="Fecha de Nacimiento"
            name="date_of_birth"
            rules={[
              { required: true, message: "Ingrese la fecha de nacimiento" },
            ]}
          >
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>

          <Form.Item
            label="Género"
            name="gender"
            rules={[{ required: true, message: "Seleccione el género" }]}
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
            label="Dirección"
            name="address"
            rules={[
              { required: true, message: "Ingrese la dirección del usuario" },
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
          <Form.Item label="Inserte una foto de perfil">
          <Upload
            beforeUpload={beforeUpload}
            onChange={handleChange}
            showUploadList={true}
          >
            <Button icon={<UploadOutlined />}>Seleccionar archivo</Button>
          </Upload>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </Form.Item>
        </div>

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
