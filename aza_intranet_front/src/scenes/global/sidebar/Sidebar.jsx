import { useState } from "react";
import { Button, Layout } from "antd";
import MenuList from "./MenuList";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";
/* eslint-disable react/prop-types */
import { FireFilled } from "@ant-design/icons";
import "./Sidebar.css";

const Logo = ({ onClick }) => {
  return (
    <div className="logo">
      <div className="logo-icon" onClick={onClick}>
        <FireFilled />
      </div>
    </div>
  );
};

const ToggleThemeButton = ({ darkTheme, toggleTheme }) => {
  return (
    <div className="toggle-theme-btn">
      <Button onClick={toggleTheme}>
        {darkTheme ? <HiOutlineSun /> : <HiOutlineMoon />}
      </Button>
    </div>
  );
};

const { Sider } = Layout;
function App() {
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsed, setcollapsed] = useState(false);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const toggleMenu = () =>{
    setcollapsed(!collapsed)
  }
  return (
    <Layout>
      <Sider
        collapsed={collapsed}
        collapsible
        trigger={null}
        theme={darkTheme ? "dark" : "light"}
        style={{ position: "absolute" }}
        className="sidebar"
      >
        <Logo onClick={toggleMenu}/>

        <MenuList darkTheme={darkTheme} />
        <ToggleThemeButton darkTheme={darkTheme} toggleTheme={toggleTheme} />

      </Sider>
    </Layout>
  );
}
export default App;
