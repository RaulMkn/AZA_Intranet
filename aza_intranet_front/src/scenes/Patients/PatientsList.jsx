import { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { DeleteOutlined } from "@ant-design/icons";
import { checkPermissionsAndRedirect } from "../../utils/CheckPermissions";

export const TableAxios = () => {
  var dentistJson = localStorage.getItem("Dentist" );
  var dentistDto = JSON.parse(dentistJson);

  useEffect(() => {
    checkPermissionsAndRedirect(dentistDto);
  });
  //1 - configuramos Los hooks
  const [patient, setPatients] = useState([]);

  const fetchData = async () => {
    try {
      // Realiza la solicitud GET a la URL de la API
      const response = await axios.get(
        "http://localhost:8080/intranet/DentalAesthetics/patients",
        {
          withCredentials: true, // Utiliza credenciales de autenticación
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + btoa(import.meta.env.VITE_DATABASE_AUTH),
          },
          crossdomain: true, // Permite solicitudes a diferentes dominios
        }
      );
      console.log(response.data);
      setPatients(response.data);
    } catch (error) {
      // Manejo de errores en caso de que la solicitud falle
      console.error("Error al obtener datos de usuarios:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Llama a la función para obtener datos cuando el componente se monta
  }, []);

  // Opciones para personalizar el tamaño de la tabla
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
      name: "address",
      label: "Direccion",
    },
    {
      name: "phone",
      label: "TELEFONO",
    },
    {
      name: "id",
      label: "Acciones", // Etiqueta para la columna del botón personalizado
      options: {
        customBodyRender: (value) => {
          return (
            <button onClick={() => handleButtonClick(value)}>
              <DeleteOutlined />
            </button>
          );
        },
        page: 8,
      },
    },
  ];

  const handleButtonClick = async (id) => {
    try {
      await axios.delete(
        `http://localhost:8080/intranet/DentalAesthetics/dentist/id/${id}`,
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
        title: "Paciente eliminado con éxito!",
        icon: "success",
      });
      setTimeout(() => {
        window.location.reload();
      }, 4000);
    } catch (error) {
      console.error("Error al enviar datos al servidor:", error);

      Swal.fire({
        title: "Fallo al eliminar el paciente!",
        text: "Pongase en contacto con maken :(",
        icon: "error",
      });

      setTimeout(() => {
        window.location.reload();
      }, 4000);
    }
  };

  //4 - renderizamos la datatable
  return (
    <>
      <MUIDataTable
        title={"Listado de pacientes"}
        data={patient}
        columns={columns}
        options={options}
        className="table_container2"
      />
    </>
  );
};
export default TableAxios;
