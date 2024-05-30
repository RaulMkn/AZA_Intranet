import { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import "./Appointment.css";
import Swal from "sweetalert2";
import side_eye from "../../assets/side_eye.jpeg"
import { DeleteOutlined } from "@ant-design/icons";



export const TableAxios = () => {
  const [appointment, setAppointment] = useState([]);
  var dentistJson = localStorage.getItem("Dentist");

  // Convertir la cadena JSON a un objeto DentistDto
  var dentistDto = JSON.parse(dentistJson);
  console.log(dentistDto);

  const formater = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  };
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('es-ES', formater);
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
      console.log(response.data)
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
      label: "Fecha y Hora de Inicio",
      options: {
        customBodyRender: (value) => {
          return (
            value && (
              <div>
                <p>{formatTimestamp(value)}</p>
              </div>
            )
          );
        },
      },
    },
    {
      name: "date_time_ending",
      label: "Fecha y Hora de Fin",
      options: {
        customBodyRender: (value) => {
          return (
            value && (
              <div>
                <p>{formatTimestamp(value)}</p>
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
      name: "customButton",
      label: "Acciones",
      options: {
        customBodyRender: (value, tableMeta) => {
            return (
              <Button onClick={() => handleButtonClick(tableMeta.rowData[0])}>
                <DeleteOutlined />
              </Button>
            );
        },
      },
    },
  ];

  const options = {
    selectableRows: 'none', // Desactiva la opción de selección de filas
    viewColumns: false,     // Desactiva la opción de mostrar/ocultar columnas
    filter: false,          // Desactiva la opción de filtrar
    print: false,           // Desactiva la opción de imprimir
    download: false,        // Desactiva la opción de descargar
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
      setTimeout(() => {
        window.location.reload();
      }, 4000);
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
  if (dentistJson ==  null) {
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
