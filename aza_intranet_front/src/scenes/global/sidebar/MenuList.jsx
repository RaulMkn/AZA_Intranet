import { Menu } from "antd";
import { Link } from "react-router-dom"; 

import {
  HomeOutlined,
  CalendarOutlined,
  ContactsOutlined,
  UserOutlined,
  SettingOutlined,
  BarsOutlined,
} from "@ant-design/icons";
/* eslint-disable react/prop-types */
const MenuList = ({ darkTheme }) => {

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
      <Menu.SubMenu key="subtasks" icon={<BarsOutlined />} title="Tasks">
        <Menu.Item key="Task - 1">Task - 1</Menu.Item>
        <Menu.Item key="Task - 2">Task - 2</Menu.Item>
        <Menu.Item key="Task - 3">Task - 3</Menu.Item>
      </Menu.SubMenu>
      <Menu.Item key={"progress"} icon={<ContactsOutlined />}>
      <Link to="/appointments">Citas</Link>

      </Menu.Item>
      <Menu.Item key={"payment"} icon={<UserOutlined />}>
      <Link to="/patients">Pacientes</Link>

      </Menu.Item>
      <Menu.Item key={"setting"} icon={<SettingOutlined />}>
        Settings
      </Menu.Item>
    </Menu>
  );
};

export default MenuList;
