import { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import side_eye from "../../assets/side_eye.jpeg";

export const TableAxios = () => {
  var dentistJson = localStorage.getItem("Dentist");
  console.log(dentistJson);
  var dentistDto = JSON.parse(dentistJson);

  const [dentist, setDentist] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/intranet/DentalAesthetics/dentists",
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
      name: "permis",
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
      name: "customButton",
      label: "Acciones",
      options: {
        customBodyRender: (value, tableMeta) => {
          if (!tableMeta.rowData[3]) {
            // Si el departamento es null
            return (
              <Button onClick={() => handleButtonClick(tableMeta.rowData[0])}>
                <b>Validar</b>
              </Button>
            );
          } else {
            return "VALIDADO"; // Si el departamento no es null
          }
        },
      },
    },
  ];

  const options = {
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
  if (dentistJson == null || dentistDto.permis == 0) {
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
