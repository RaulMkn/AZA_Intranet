import { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";

export const TableAxios = () => {
  // Configuramos los hooks
  const [appointment, setAppointment] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/intranet/DentalAesthetics/appointments",
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + btoa("maken:yuki"),
          },
          crossdomain: true,
        }
      );
      setAppointment(response.data);
    } catch (error) {
      console.error("Error al obtener datos de usuarios:", error);
    }
  };

  useEffect(() => {
    fetchData();
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
      name: "department",
      label: "Departamento",
    },
    {
      name: "description",
      label: "Descripción",
    },
    {
      name: "total_price",
      label: "Precio Total",
    },
    {
      name: "invoice",
      label: "Factura",
    },
    {
      name: "user",
      label: "Usuario",
    },
    {
      name: "patient",
      label: "Paciente",
    },
    {
      name: "customButton",
      label: "Acciones", // Etiqueta para la columna del botón personalizado
      options: {
        customBodyRender: (tableMeta) => {
          return (
            <button onClick={() => handleButtonClick(tableMeta.rowData[0])}>
              Personalizado
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
    <body style={{maxHeight: "400px",  maxWidth: "1000px", hoover: "true"}}
    >
      <MUIDataTable
        title={"Listado de citas"}
        data={appointment}
        columns={columns}
        options={options}
      />
    </body>
  );
};

export default TableAxios;
