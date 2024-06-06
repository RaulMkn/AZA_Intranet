import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import { checkPermissionsAndRedirect } from "../../utils/CheckPermissions";
import Swal from "sweetalert2";
import MUIDataTable from "mui-datatables";

export const TableAxios = () => {
  const dentistJson = localStorage.getItem("Dentist");
  const dentistDto = JSON.parse(dentistJson);

  useEffect(() => {
    checkPermissionsAndRedirect(dentistDto);
  });

  const [appointments, setAppointments] = useState([]);

  const createButton = (
    <Button variant="contained" color="primary">
      <Link to="/appointment" style={{ color: "white", textDecoration: "none" }}>
        Crear
      </Link>
    </Button>
  );

  const date_options = {
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
    return date.toLocaleString("es-ES", date_options);
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

      setAppointments(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error al obtener datos de usuarios:", error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(
        `http://localhost:8080/intranet/DentalAesthetics/event/id/${id}`,
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
        title: "Evento eliminado con éxito!",
        icon: "success",
      });
      setTimeout(() => {
        fetchData(); // Fetch the data again to update the table
      }, 4000);
    } catch (error) {
      console.error("Error al enviar datos al servidor:", error);

      Swal.fire({
        title: "Fallo al eliminar el evento!",
        text: "Póngase en contacto con el soporte.",
        icon: "error",
      });

      setTimeout(() => {
        window.location.reload();
      }, 4000);
    }
  };

  const columns = [
    {
      name: "date_time_beginning",
      label: "Fecha y Hora de Inicio",
      options: {
        customBodyRender: (value) => formatTimestamp(value),
        width: 150,
      },
    },
    {
      name: "date_time_ending",
      label: "Fecha y Hora de Fin",
      options: {
        customBodyRender: (value) => formatTimestamp(value),
        width: 150,
      },
    },
    {
      name: "priority",
      label: "Prioridad",
      options: { width: 150 },
    },
    {
      name: "state",
      label: "Estado",
      options: { width: 150 },
    },
    {
      name: "title",
      label: "Título",
      options: { width: 150 },
    },
    {
      name: "total_price",
      label: "Precio Total",
      options: { width: 150 },
    },
    {
      name: "dentist",
      label: "Dentista",
      options: {
        customBodyRender: (dentist) => (dentist ? dentist.full_name : ""),
        width: 150,
      },
    },
    {
      name: "patient",
      label: "Paciente",
      options: {
        customBodyRender: (patient) => (patient ? patient.full_name : ""),
        width: 150,
      },
    },
    {
      name: "id",
      label: "Acciones",
      options: {
        customBodyRender: (value) => {
          return (
            <Button onClick={() => handleDeleteClick(value)}>Eliminar</Button>
          );
        },
        width: 150,
      },
    },
  ];

  const options = {
    filterType: "checkbox",
    responsive: "vertical",
    selectableRows: "none",
    customToolbar: () => createButton,
  };

  return (
    <div className="table_container">
      <MUIDataTable
        title={"Lista de Citas"}
        data={appointments}
        columns={columns}
        options={options}
      />
    </div>
  );
};

export default TableAxios;
