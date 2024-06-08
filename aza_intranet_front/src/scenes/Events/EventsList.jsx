import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import { checkPermissionsAndRedirect } from "../../utils/CheckPermissions";
import Swal from "sweetalert2";
import MUIDataTable from "mui-datatables";
import { DeleteOutlined } from "@ant-design/icons";


export const TableAxios = () => {
  const dentistJson = localStorage.getItem("Dentist");
  const dentistDto = JSON.parse(dentistJson);

  useEffect(() => {
    checkPermissionsAndRedirect(dentistDto);
  });

  const [events, setEvents] = useState([]);

  const createButton = (
    <Button variant="contained" color="primary">
      <Link to="/event" style={{ color: "white", textDecoration: "none" }}>
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
        `http://localhost:8080/intranet/DentalAesthetics/event/dentistId/${dentistDto.id}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + btoa(import.meta.env.VITE_DATABASE_AUTH),
          },
          crossdomain: true,
        }
      );

      setEvents(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error al obtener los eventos:", error);
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
        fetchData();
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
      label: "Inicio",
      options: {
        customBodyRender: (value) => formatTimestamp(value),
        width: 150,
      },
    },
    {
      name: "date_time_ending",
      label: "Final",
      options: {
        customBodyRender: (value) => formatTimestamp(value),
        width: 150,
      },
    },
    {
      name: "title",
      label: "Titulo",
      options: { width: 150 },
    },
    {
      name: "description",
      label: "Descripcion",
      options: { width: 150 },
    },
    {
      name: "id",
      label: "Acciones",
      options: {
        customBodyRender: (value) => {
          return (
            <Button onClick={() => handleDeleteClick(value)}>
              <DeleteOutlined />
            </Button>
          );
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
    // Establece la altura máxima de la tabla
    responsive: "standard",
    filterType: "checkbox",
    customToolbar: () => createButton,
  };

  return (
    <div className="table_container">
      <MUIDataTable
        title={"Lista de Eventos"}
        data={events}
        columns={columns}
        options={options}
        className="table_container"

      />
    </div>
  );
};

export default TableAxios;
