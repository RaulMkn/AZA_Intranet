import { Menu } from "antd";
import { Link } from "react-router-dom";

import {
  HomeOutlined,
  CalendarOutlined,
  ContactsOutlined,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons";
/* eslint-disable react/prop-types */
const MenuList = ({ darkTheme }) => {
  const permits = JSON.parse(localStorage.getItem("permis"));

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

      {permits && permits.includes(1) && (
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
    </Menu>
  );
};

export default MenuList;
