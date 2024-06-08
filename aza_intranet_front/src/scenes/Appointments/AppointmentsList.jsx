import { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  DeleteOutlined,
  //CloseOutlined
} from "@ant-design/icons";
import { checkPermissionsAndRedirect } from "../../utils/CheckPermissions";

export const TableAxios = () => {
  var dentistJson = localStorage.getItem("Dentist");
  var dentistDto = JSON.parse(dentistJson);
  useEffect(() => {
    checkPermissionsAndRedirect(dentistDto);
  });

  const [appointment, setAppointment] = useState([]);
  const formater = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString("es-ES", formater);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/intranet/DentalAesthetics/appointment/dentistId/${dentistDto.id}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + btoa(import.meta.env.VITE_DATABASE_AUTH),
          },
          crossdomain: true,
        }
      );

      // Setear el estado con los datos de las citas
      setAppointment(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error al obtener datos de usuarios:", error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Definimos las columnas
  const columns = [
    {
      name: "date_time_beginning",
      label: "Inicio",
      options: {
        customBodyRender: (value) => {
          return (
            value && (
              <div>
                <p style={{ width: "150px" }}>{formatTimestamp(value)}</p>
              </div>
            )
          );
        },
      },
    },
    {
      name: "date_time_ending",
      label: "Final",
      options: {
        customBodyRender: (value) => {
          return (
            value && (
              <div>
                <p style={{ width: "150px" }}>{formatTimestamp(value)}</p>
              </div>
            )
          );
        },
      },
    },
    {
      name: "priority",
      label: "Prioridad",
    },
    {
      name: "state",
      label: "Estado",
    },
    {
      name: "title",
      label: "Título",
    },
    {
      name: "total_price",
      label: "Precio Total",
    },
    {
      name: "patient",
      label: "Paciente",
      options: {
        customBodyRender: (value) => {
          return (
            value && (
              <div>
                <p>{value.full_name}</p>
              </div>
            )
          );
        },
      },
    },
    {
      name: "dentist",
      label: "Dentista",
      options: {
        customBodyRender: (value) => {
          return (
            value && (
              <div>
                <p>{value.full_name}</p>
              </div>
            )
          );
        },
      },
    },
    {
      name: "id",
      label: "Acciones",
      options: {
        customBodyRender: (value) => {
          console.log(value);
          //if (value.permits == 1) {
          return (
            <Button onClick={() => handleButtonClick(value)}>
              <DeleteOutlined />
            </Button>
          );
          //} else{
          // return (
          //<CloseOutlined />
          //  )
        },
      },
    },
  ];

  const options = {
    selectableRows: "none", // Desactiva la opción de selección de filas
    viewColumns: false, // Desactiva la opción de mostrar/ocultar columnas
    filter: false, // Desactiva la opción de filtrar
    print: false, // Desactiva la opción de imprimir
    download: false, // Desactiva la opción de descargar
    fixedHeader: true,
    responsive: "standard",
    // Tamaño máximo de altura y anchura
    maxHeight: "400px",
    maxWidth: "1000px",
    customToolbar: () => {
      return (
        <Button variant="contained" color="info" style={{ marginRight: 10 }}>
          <Link to="/appointment" style={{ color: "white" }}>
            {" "}
            Crear
          </Link>
        </Button>
      );
    },
  };

  // Función para manejar el clic del botón personalizado
  const handleButtonClick = async (id) => {
    try {
      await axios.delete(
        `http://localhost:8080/intranet/DentalAesthetics/appointment/id/${id}`,
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
        title: "Cita eliminada con éxito!",
        icon: "success",
      });
      fetchData();
    } catch (error) {
      console.error("Error al enviar datos al servidor:", error);

      Swal.fire({
        title: "Fallo al eliminar la cita!",
        text: "Pongase en contacto con maken :(",
        icon: "error",
      });

      setTimeout(() => {
        window.location.reload();
      }, 4000);
    }
  };

  // Renderizamos la tabla
  return (
    <MUIDataTable
      title={"Listado de citas"}
      data={appointment}
      columns={columns}
      options={options}
      className="table_container"
    />
  );
};

export default TableAxios;
