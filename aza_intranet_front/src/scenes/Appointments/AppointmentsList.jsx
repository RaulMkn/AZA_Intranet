import { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import "./Appointment.css";
import Swal from "sweetalert2";
import side_eye from "../../assets/side_eye.jpeg"


export const TableAxios = () => {
  const [appointment, setAppointment] = useState([]);
  // Configuramos los hooks

  // En cualquier componente donde necesites acceder al ID del usuario
  // Recuperar los datos del DentistDto del localStorage
  var dentistJson = localStorage.getItem("Dentist");

  // Convertir la cadena JSON a un objeto DentistDto
  var dentistDto = JSON.parse(dentistJson);
  console.log(dentistDto);
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
