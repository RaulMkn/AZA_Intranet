import "./App.css";
import RegisterForm from "./scenes/register/RegisterForm";
import Topbar from "./scenes/global/topbar/Topbar";
import Sidebar from "./scenes/global/sidebar/Sidebar";
import LoginForm from "./scenes/login/LoginForm";
import { Route, Routes } from "react-router-dom";
import CreateAppointmentPage from "./scenes/Appointments/CreateAppointment";

import AppointmentsList from "./scenes/Appointments/AppointmentsList";
import CreatePatient from "./scenes/Patients/CreatePatient";
import PatientsList from "./scenes/Patients/PatientsList";
import InterventionsList from "./scenes/Interventions/InterventionsList"
import CreateIntervention from "./scenes/Interventions/CreateIntervention"
import Email from "../emails/emailTest";

import DentistsList from "./scenes/Dentists/DentistsList"
import Stats from "./scenes/Stats/Stats"

import Calendar from "./scenes/Calendar/Calendar";

import { useLocation } from "react-router-dom";

function App() {
  // Obtener la ubicación actual utilizando el hook useLocation
  const location = useLocation();

  // Verificar si la ruta actual es /login o /register
  const isLoginOrRegister = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="container">
      {/* Renderizar el componente Sidebar solo si no estamos en las rutas de login o register */}
      {!isLoginOrRegister && (
        <aside className="aside">
          {/* Incluye el componente Sidebar */}
          <Sidebar />
        </aside>
      )}
      <main className="main">
        <Routes>
          <Route path="/home" element={<Calendar />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/topBar" element={<Topbar />} />
          <Route path="/sideBar" element={<Sidebar />} />
          <Route path="/appointment" element={<CreateAppointmentPage />} />
          <Route path="/patient" element={<CreatePatient />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/patients" element={<PatientsList />} />
          <Route path="/appointments" element={<AppointmentsList />} />
          <Route path="/intervention" element={<CreateIntervention />} />
          <Route path="/interventions" element={<InterventionsList />} />
          <Route path="/dentists" element={<DentistsList />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/mails" element={<Email />} />

        </Routes>
      </main>
    </div>
  );
}

export default App;

