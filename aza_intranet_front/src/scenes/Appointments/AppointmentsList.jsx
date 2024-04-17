import { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import "./Appointment.css";


export const TableAxios = () => {
  // Configuramos los hooks
  const [appointment, setAppointment] = useState([]);

  // En cualquier componente donde necesites acceder al ID del usuario
  const userId = localStorage.getItem("userId");

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/intranet/DentalAesthetics/appointment/dentistId/${userId}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + btoa("maken:yuki"),
          },
          crossdomain: true,
        }
      );

      const appointments = response.data;

      // Utilizamos Promise.all para esperar todas las solicitudes simultáneamente
      await Promise.all(
        appointments.map(async (appointment) => {
          try {
            // Hacemos una solicitud para cada id de cita
            const detailResponse = await axios.get(
              `http://localhost:8080/intranet/DentalAesthetics/dentist/id/${appointment.dentist}`,
              {
                withCredentials: true,
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Basic " + btoa("maken:yuki"),
                },
                crossdomain: true,
              }
            );

            const detailResponse2 = await axios.get(
              `http://localhost:8080/intranet/DentalAesthetics/patientName/id/${appointment.patient}`,
              {
                withCredentials: true,
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Basic " + btoa("maken:yuki"),
                },
                crossdomain: true,
              }
            );

            appointment.dentistDetails = detailResponse.data;
            appointment.patientDetails = detailResponse2.data;

            // Aquí puedes manejar la respuesta de cada detalle de la cita, por ejemplo:
            console.log("Detalles de la cita:", detailResponse.data);
          } catch (detailError) {
            console.error("Error al obtener detalles de la cita:", detailError);
          }
        })
      );

      // Setear el estado con los datos de las citas
      setAppointment(appointments);
    } catch (error) {
      console.error("Error al obtener datos de usuarios:", error);
    }
  };

  useEffect(() => {
    fetchData();
  });

  // Definimos las columnas
  const columns = [
    {
      name: "date_time_beginning",
      label: "Fecha y Hora de Inicio",
    },
    {
      name: "date_time_ending",
      label: "Fecha y Hora de Fin",
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
      name: "dentistDetails",
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
      name: "patientDetails",
      label: "Paciente",
      options: {
        customBodyRender: (value) => {
          return (
            value && (
              <div>
                <p>{value}</p>
              </div>
            )
          );
        },
      },
    },
    {
      name: "customButton",
      label: "Acciones", // Etiqueta para la columna del botón personalizado
      color: "red",
      options: {
        customBodyRender: (tableMeta) => {
          return (
            <button onClick={() => handleButtonClick(tableMeta.rowData[0])}>
              Modificar
            </button>
          );
        },
      },
    },
  ];

  // Opciones para personalizar el tamaño de la tabla
  const options = {
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
      // Realizar la solicitud HTTP a tu backend
      const response = await axios.post(
        "http://tu-backend.com/api/customAction",
        { id: id }
      );
      console.log("Respuesta del backend:", response.data);
      // Aquí puedes manejar la respuesta según tus necesidades
    } catch (error) {
      console.error("Error al realizar la solicitud HTTP:", error);
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
