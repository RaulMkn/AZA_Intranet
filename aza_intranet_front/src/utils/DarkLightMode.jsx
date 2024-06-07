
import { useState } from "react";
import Sidebar from "./Sidebar";

const MainContainer = () => {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <div>
      <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </div>
  );
};

export default MainContainer;
