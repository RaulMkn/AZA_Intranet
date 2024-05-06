import { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export const TableAxios = () => {
  //1 - configuramos Los hooks
  const [dentist, setDentist] = useState([]);

  const fetchData = async () => {
    try {
      // Realiza la solicitud GET a la URL de la API
      const response = await axios.get(
        "http://localhost:8080/intranet/DentalAesthetics/dentists",
        {
          withCredentials: true, // Utiliza credenciales de autenticación
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + btoa(import.meta.env.VITE_DATABASE_AUTH), // Agrega encabezados necesarios
          },
          crossdomain: true, // Permite solicitudes a diferentes dominios
        }
      );
      console.log(response.data);
      const dentists = response.data;

      await Promise.all(
        dentists.map(async (dentist) => {
          try {
            // Hacemos una solicitud para cada id de cita
            const detailResponse = await axios.get(
              `http://localhost:8080/intranet/DentalAesthetics/departments/id/${dentist.department}`,
              {
                withCredentials: true,
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Basic " + btoa("maken:yuki"),
                },
                crossdomain: true,
              }
            );

            dentist.departmentDetails = detailResponse.data;

            // Aquí puedes manejar la respuesta de cada detalle de la cita, por ejemplo:
            console.log("Detalles de la cita:", detailResponse.data);
          } catch (detailError) {
            console.error("Error al obtener detalles de la cita:", detailError);
          }
        })
      );
      setDentist(dentists);
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
    // Establece la anchura máxima de la tabla
    fixedHeader: true,
    // Establece la altura máxima de la tabla
    responsive: "standard",
    // Agregar contenido personalizado encima de la tabla
    customToolbar: () => {
      return (
        <Button variant="contained" color="info" style={{ marginRight: 10 }}>
          <Link to="/dentist" style={{ color: "white" }}>
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
      label: "EMAIL",
    },
    {
      name: "job",
      label: "Trabajo",
    },
    {
      name: "department",
      label: "DEPARTAMENTO",
      options : {
        customBodyRender : (value) => {
          return (
            value && (
              <div>
                <p>{value.department_name}</p>
              </div>
            )
          )
        }
      }
    },
    {
      name: "permis",
      label: "ADMIN?",
      options : {
        customBodyRender : (value) => {
          if (value === 1) {
            return (
              <div>
                <p>Si</p>
              </div>
            )
            
          } else{
            return (
              <div>
                <p>No</p>
              </div>
            )
          }
        }
      }
    },
    {
      name: "customButton",
      label: "Acciones", // Etiqueta para la columna del botón personalizado
      options: {
        customBodyRender: (tableMeta) => {
          return (
            <button onClick={() => handleButtonClick(tableMeta.rowData[0])}>
              Modificar
            </button>
          );
        },
        page: 8,
      },
    },
  ];

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

  //4 - renderizamos la datatable
  return (
    <>
      <MUIDataTable
        title={"Listado de Dentistas"}
        data={dentist}
        columns={columns}
        options={options}
        className="table_container3"
      />
    </>
  );
};
export default TableAxios;
