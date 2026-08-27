import { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { checkAdminPermissionsAndRedirect } from "../../utils/CheckPermissions";
import { DeleteOutlined } from "@ant-design/icons";
import { Avatar } from 'antd';
import API_BASE_URL from "../../utils/api";


export const TableAxios = () => {
  const navigate = useNavigate();
  const dentistJson = localStorage.getItem("Dentist");
  const dentistDto = JSON.parse(dentistJson);

  useEffect(() => {
    checkAdminPermissionsAndRedirect(dentistDto, navigate);
  }, []);

  const [dentist, setDentist] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/dentists`);
      const dentists = response.data;
      setDentist(dentists);
    } catch (error) {
      console.error("Error al obtener datos de usuarios:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      name: "picture",
      label: "AVATAR",
      options: {
        customBodyRender: (value) => {
          return (
            value && (
              <Avatar
              src={`data:${value.img_type};base64,${value.img}`}
              size={70}
              style={{ marginTop: '20px' }}
            />
            )
          );
        },
      }
    },
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
      name: "permits",
      label: "¿ADMIN?",
      options: {
        customBodyRender: (value) => {
          if (value === 1) {
            return (
              <div>
                <p>Si</p>
              </div>
            );
          } else {
            return (
              <div>
                <p>No</p>
              </div>
            );
          }
        },
      },
    },
    {
      name: "id",
      label: "Acciones",
      options: {
        customBodyRender: (value) => {
          return (
            <Button onClick={() => handleButtonClick(value)}>
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
    maxHeight: "400px",
    maxWidth: "1000px",
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

  const handleButtonClick = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/dentist/id/${id}`);

      Swal.fire({
        title: "Usuario eliminado con éxito!",
        icon: "success",
      });
        fetchData();
    } catch (error) {
      console.error("Error al enviar datos al servidor:", error);

      Swal.fire({
        title: "Fallo al eliminar el usuario!",
        text: "Pongase en contacto con maken :(",
        icon: "error",
      });

      setTimeout(() => {
        navigate(0);
      }, 4000);
    }
  };

  //4 - renderizamos la datatable
  return (
      <MUIDataTable
        title={"Listado de Dentistas"}
        data={dentist}
        columns={columns}
        options={options}
        className="table_container"
      />
  );
};
export default TableAxios;
