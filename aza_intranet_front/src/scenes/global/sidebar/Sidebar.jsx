import { useState } from "react";
import { Button, Layout } from "antd";
import MenuList from "./MenuList";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";
import { LeftCircleFilled, RightCircleFilled } from "@ant-design/icons";
import PropTypes from "prop-types";
import "./Sidebar.css";

function Sidebar({ collapsed, toggleCollapsed }) {
  const [darkTheme, setDarkTheme] = useState(true);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  var dentistJson = localStorage.getItem("Dentist");
  var dentistDto = JSON.parse(dentistJson);
  if (!dentistDto) {
    return null;
  }

  return (
    <Layout.Sider
      collapsed={collapsed}
      collapsible
      onCollapse={toggleCollapsed}
      trigger={null}
      theme={darkTheme ? "dark" : "light"}
      style={{ position: "fixed", width: "20%", overflowY: "auto" }}
      className="sidebar"
    >
      <div className="logo" onClick={toggleCollapsed}>
        <div className="logo-icon">
          {collapsed ? <RightCircleFilled /> : <LeftCircleFilled />}
        </div>
      </div>
      <MenuList darkTheme={darkTheme} />
      <div className="toggle-theme-btn">
        <Button
          onClick={toggleTheme}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {darkTheme ? <HiOutlineSun /> : <HiOutlineMoon />}
        </Button>
      </div>
    </Layout.Sider>
  );
}
Sidebar.propTypes = {
  collapsed: PropTypes.bool.isRequired, // collapsed debe ser un booleano y requerido
  toggleCollapsed: PropTypes.func.isRequired, // toggleCollapsed debe ser una función y requerida
};
export default Sidebar;
