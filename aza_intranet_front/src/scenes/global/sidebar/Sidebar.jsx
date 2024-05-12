import { useState } from "react";
import { Button, Layout } from "antd";
import MenuList from "./MenuList";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";
import { FireFilled } from "@ant-design/icons";
import "./Sidebar.css";

function App() {
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const toggleMenu = () => {
    setCollapsed(!collapsed);
  };
  var dentistJson = localStorage.getItem("Dentist");
  var dentistDto = JSON.parse(dentistJson);
  if (!dentistDto) {
    return null;
  }
 

  return (
    <Layout>
      <Layout.Sider
        collapsed={collapsed}
        collapsible
        trigger={null}
        theme={darkTheme ? "dark" : "light"}
        style={{ position: "absolute" }}
        className="sidebar"
      >
        <div className="logo" onClick={toggleMenu}>
          <div className="logo-icon">
            <FireFilled />
          </div>
        </div>

        <MenuList darkTheme={darkTheme} />
        <div className="toggle-theme-btn">
          <Button onClick={toggleTheme}>
            {darkTheme ? <HiOutlineSun /> : <HiOutlineMoon />}
          </Button>
        </div>
      </Layout.Sider>
    </Layout>
  );
}

export default App;
