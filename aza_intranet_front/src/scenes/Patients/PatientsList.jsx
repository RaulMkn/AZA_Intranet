import { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom"; 
import Swal from "sweetalert2";
import side_eye from "../../assets/side_eye.jpeg"



export const TableAxios = () => {
  var dentistJson = localStorage.getItem("Dentist");
  console.log(dentistJson)
  //1 - configuramos Los hooks
  const [patient, setPatients] = useState([]);

  const fetchData = async () => {
    try {
      // Realiza la solicitud GET a la URL de la API
      const response = await axios.get(
        "http://localhost:8080/intranet/DentalAesthetics/patients",
        {
          withCredentials: true, // Utiliza credenciales de autenticación
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + btoa(import.meta.env.VITE_DATABASE_AUTH),
          },
          crossdomain: true, // Permite solicitudes a diferentes dominios
        }
      );
      console.log(response.data);
      setPatients(response.data);
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
        <Button
          variant="contained"
          color="info"
          style={{ marginRight: 10 }}
        >
      <Link to="/patient" style={{color: "white"}}> Crear</Link>
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
      label: "CORREO",
    },
    {
      name: "phone",
      label: "TELEFONO",
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
  if (dentistJson == null) {
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
        title={"Listado de pacientes"}
        data={patient}
        columns={columns}
        options={options}
        className="table_container2"
      />
    </>
  );
};
export default TableAxios;
