import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Authorization'] =
  'Basic ' + btoa(import.meta.env.VITE_DATABASE_AUTH || 'aza:aza');

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
