import { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { DeleteOutlined } from "@ant-design/icons";
import { checkAdminPermissionsAndRedirect } from "../../utils/CheckPermissions";

export const TableAxios = () => {
  var dentistJson = localStorage.getItem("Dentist");
  console.log(dentistJson);
  var dentistDto = JSON.parse(dentistJson);
  useEffect(() => {
    checkAdminPermissionsAndRedirect(dentistDto);
  });
  const [intervention, setIntervention] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/intranet/DentalAesthetics/interventions",
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + btoa(import.meta.env.VITE_DATABASE_AUTH),
          },
          crossdomain: true,
        }
      );
      console.log(response.data);
      setIntervention(response.data);
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
          <Link to="/intervention" style={{ color: "white" }}>
            {" "}
            Crear
          </Link>
        </Button>
      );
    },
  };

  const columns = [
    {
      name: "full_name",
      label: "NOMBRE",
    },
    {
      name: "price",
      label: "PRECIO",
    },
    {
      name: "department",
      label: "DEPARTAMENTO",
      options: {
        customBodyRender: (value) => {
          return (
            value && (
              <div>
                <p>{value.department_name}</p>
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
        customBodyRender: (tableMeta) => {
          return (
            <button onClick={() => handleButtonClick(tableMeta.rowData[0])}>
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
        title: "Usuario eliminado con éxito!",
        icon: "success",
      });
      setTimeout(() => {
        window.location.reload();
      }, 4000);
    } catch (error) {
      console.error("Error al enviar datos al servidor:", error);

      Swal.fire({
        title: "Fallo al eliminar el usuario!",
        text: "Pongase en contacto con maken :(",
        icon: "error",
      });

      setTimeout(() => {
        window.location.reload();
      }, 4000);
    }
  };
  return (
    <>
      <MUIDataTable
        title={"Listado de intervenciones"}
        data={intervention}
        columns={columns}
        options={options}
        className="table_container2"
      />
    </>
  );
};
export default TableAxios;
