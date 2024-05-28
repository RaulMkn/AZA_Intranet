import { useState, useEffect } from "react";
import { Table, Button, message } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Appointment.css";
import Swal from "sweetalert2";
import side_eye from "../../assets/side_eye.jpeg";

export const TableAxios = () => {
  const [appointment, setAppointment] = useState([]);
  const dentistJson = localStorage.getItem("Dentist");
  const dentistDto = JSON.parse(dentistJson);
  const createButton = (
    <Button type="primary">
      <Link to="/appointment" style={{ color: "white" }}>
        Crear
      </Link>
    </Button>
  );
const options = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false
};
const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString('es-ES', options);
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

      setAppointment(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error al obtener datos de usuarios:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: "Fecha y Hora de Inicio",
      dataIndex: "date_time_beginning",
      key: "date_time_beginning",
      render: (date_time_beginning) => <div>{formatTimestamp(date_time_beginning)}</div>,
      width: 150


    },
    {
      title: "Fecha y Hora de Fin",
      dataIndex: "date_time_ending",
      key: "date_time_ending",
      render: (date_time_ending) => <div>{formatTimestamp(date_time_ending)}</div>,
      width: 150


    },
    {
      title: "Prioridad",
      dataIndex: "priority",
      key: "priority",
      width: 150


    },
    {
      title: "Estado",
      dataIndex: "state",
      key: "state",
      width: 150

    },
    {
      title: "Título",
      dataIndex: "title",
      key: "title",
      width: 150

    },
    {
      title: "Precio Total",
      dataIndex: "total_price",
      key: "total_price",
      width: 150

    },
    {
      title: "Dentista",
      dataIndex: "dentist",
      key: "dentist",
      width: 150,
      render: (dentist) => <div>{dentist?.full_name}</div>,
    },
    {
      title: "Paciente",
      dataIndex: "patient",
      key: "patient",
      width: 150,
      render: (patient) => <div>{patient?.full_name}</div>,
    },
    {
      title: "Acciones",
      key: "actions",
      width: 150,
      render: (text, record) => (
        <Button onClick={() => handleButtonClick(record.id)}>Modificar</Button>
      ),
    },
    {
      title: "Acciones",
      key: "actions",
      width: 150,
      render: () => createButton,
    },
  ];

  const handleButtonClick = async (id) => {
    try {
      const response = await axios.post("http://tu-backend.com/api/customAction", { id });
      console.log("Respuesta del backend:", response.data);
      message.success("Acción realizada con éxito");
    } catch (error) {
      console.error("Error al realizar la solicitud HTTP:", error);
      message.error("Error al realizar la solicitud");
    }
  };

  if (dentistJson === null) {
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

  return (
    <div className="table_container">
      <Button type="primary" style={{ marginBottom: 16 }}>
        <Link to="/appointment" style={{ color: "white" }}>
          Crear
        </Link>
      </Button>
      <Table
        columns={columns}
        dataSource={appointment}
        rowKey={(record) => record.id}
        scroll={{ y: 400 , x: 400}}
        style={{ background: "transparent" }}
      />
    </div>
  );
};

export default TableAxios;
