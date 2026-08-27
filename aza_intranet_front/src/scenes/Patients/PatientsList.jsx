import { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { DeleteOutlined } from "@ant-design/icons";
import { checkPermissionsAndRedirect } from "../../utils/CheckPermissions";
import API_BASE_URL from "../../utils/api";

export const TableAxios = () => {
  const navigate = useNavigate();
  const dentistJson = localStorage.getItem("Dentist" );
  const dentistDto = JSON.parse(dentistJson);

  useEffect(() => {
    checkPermissionsAndRedirect(dentistDto, navigate);
  }, []);
  const [patient, setPatients] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/patients`);
      setPatients(response.data);
    } catch (error) {
      console.error("Error al obtener datos de usuarios:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const options = {
    selectableRows: "none", // Desactiva la opción de selección de filas
    viewColumns: false, // Desactiva la opción de mostrar/ocultar columnas
    filter: false, // Desactiva la opción de filtrar
    print: false, // Desactiva la opción de imprimir
    download: false, // Desactiva la opción de descargar
    fixedHeader: true,
    // Establece la altura máxima de la tabla
    responsive: "standard",
    // Agregar contenido personalizado encima de la tabla
    customToolbar: () => {
      return (
        <Button variant="contained" color="info" style={{ marginRight: 10 }}>
          <Link to="/patient" style={{ color: "white" }}>
            {" "}
            Crear
          </Link>
        </Button>
      );
    },
  };

  //3 - Definimos las columnas
  const columns = [
    {
      name: "full_name",
      label: "NOMBRE",
    },
    {
      name: "email",
      label: "CORREO",
    },
    {
      name: "phone",
      label: "TELEFONO",
    },
    {
      name: "gender",
      label: "GENERO",
    },
    {
      name: "date_of_birth",
      label: "Fecha de Nacimiento",
    },
    {
      name: "address",
      label: "Direccion",
    },
    {
      name: "id",
      label: "Acciones", // Etiqueta para la columna del botón personalizado
      options: {
        customBodyRender: (value) => {
          return (
            <Button onClick={() => handleButtonClick(value)}>
              <DeleteOutlined />
            </Button>
          );
        },
        page: 8,
      },
    },
  ];

  const handleButtonClick = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/patient/id/${id}`);

      Swal.fire({
        title: "Paciente eliminado con éxito!",
        icon: "success",
      });
        fetchData();
    } catch (error) {
      console.error("Error al enviar datos al servidor:", error);

      Swal.fire({
        title: "Fallo al eliminar el paciente!",
        text: "Pongase en contacto con maken :(",
        icon: "error",
      });

      setTimeout(() => {
        navigate(0);
      }, 4000);
    }
  };

  //4 - renderizamos la datatable
  return (
      <MUIDataTable
        title={"Listado de pacientes"}
        data={patient}
        columns={columns}
        options={options}
        className="table_container"
      />
  );
};
export default TableAxios;
