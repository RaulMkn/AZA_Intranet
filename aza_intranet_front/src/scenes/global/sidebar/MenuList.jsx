import { Menu, Button } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  CalendarOutlined,
  ContactsOutlined,
  UserOutlined,
  SettingOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import Swal from "sweetalert2";

/* eslint-disable react/prop-types */

const MenuList = ({ darkTheme }) => {
  const logOut = () => {
    try {
      localStorage.removeItem("Dentist");
      Swal.fire({
        title: "Session cerrada correctamente",
        icon: "success",
        showCancelButton: false,
        showConfirmButton: false,
      });
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch {
      Swal.fire({
        title: "Problema al cerrar sesion",
        text: "Corre a contactar con maken",
        icon: "error",
        showCancelButton: false,
        showConfirmButton: false,
      });
    }
  };

  // Obtener datos del localStorage
  var dentistJson = localStorage.getItem("Dentist");
  var dentistDto = JSON.parse(dentistJson);

  // Si dentistDto es nulo o vacío, retorna un componente vacío
  if (!dentistDto) {
    return null;
  }

  // Si hay datos en dentistDto, se procede a mostrar el menú
  return (
    <Menu
      theme={darkTheme ? "dark" : "light"}
      mode="inline"
      className="menu-bar"
    >
      <Menu.Item key={"home"} icon={<HomeOutlined />}>
        <Link to="/home">Home</Link>
      </Menu.Item>

      <Menu.Item key={"activity"} icon={<CalendarOutlined />}>
        <Link to="/calendar">Calendario</Link>
      </Menu.Item>

      {dentistDto.permis && dentistDto.permis === 1 && (
        <Menu.SubMenu
          key="subtasks"
          icon={<SettingOutlined />}
          title="Admin Ops"
        >
          <Menu.Item key="Interventios Ops">
            <Link to="/interventions">Intervenciones</Link>
          </Menu.Item>
          <Menu.Item key="Dentists Ops">
            <Link to="dentists">Dentistas</Link>
          </Menu.Item>
          <Menu.Item key="Stats Ops">
            <Link to="stats">Estadisticas</Link>
          </Menu.Item>
        </Menu.SubMenu>
      )}

      <Menu.Item key={"progress"} icon={<ContactsOutlined />}>
        <Link to="/appointments">Citas</Link>
      </Menu.Item>

      <Menu.Item key={"payment"} icon={<UserOutlined />}>
        <Link to="/patients">Pacientes</Link>
      </Menu.Item>

      <Menu.Item icon={<RollbackOutlined />}>
        <Button onClick={logOut}><b>Cerrar Sesión</b></Button>
      </Menu.Item>
    </Menu>
  );
};

export default MenuList;
