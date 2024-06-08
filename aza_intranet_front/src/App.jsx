import "./App.css";
import { useState } from "react";
import RegisterForm from "./scenes/register/RegisterForm";
import Sidebar from "./scenes/global/sidebar/Sidebar";
import LoginForm from "./scenes/login/LoginForm";
import { Route, Routes } from "react-router-dom";
import CreateAppointmentPage from "./scenes/Appointments/CreateAppointment";

import AppointmentsList from "./scenes/Appointments/AppointmentsList";
import CreatePatient from "./scenes/Patients/CreatePatient";
import PatientsList from "./scenes/Patients/PatientsList";
import InterventionsList from "./scenes/Interventions/InterventionsList";
import CreateIntervention from "./scenes/Interventions/CreateIntervention";
import Event from "./scenes/Events/CreateEvent";
import EventsList from "./scenes/Events/EventsList";

import DentistsList from "./scenes/Dentists/DentistsList";
import HomeProfile from "./scenes/Home/HomeProfile";

import Calendar from "./scenes/Calendar/Calendar";

import { useLocation } from "react-router-dom";
import CreateDentist from "./scenes/Dentists/CreateDentist";
import Layout, { Content } from "antd/es/layout/layout";

function App() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const location = useLocation();

  const isLoginOrRegister =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/";

  return (
    <Layout style={{ background: "transparent" }}>
      {" "}
      {!isLoginOrRegister && (
        <Sidebar
          style={{ overflowY: "auto" }}
          collapsed={collapsed}
          toggleCollapsed={toggleCollapsed}
        />
      )}
      <Content
        style={{
          marginLeft: collapsed ? "80px" : "200px",
          minHeight: "100vh",
          padding: "20px",
        }}
      >
        <Routes>
          <Route path="/home" element={<HomeProfile />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/sideBar" element={<Sidebar />} />
          <Route path="/appointment" element={<CreateAppointmentPage />} />
          <Route path="/patient" element={<CreatePatient />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/patients" element={<PatientsList />} />
          <Route path="/appointments" element={<AppointmentsList />} />
          <Route path="/intervention" element={<CreateIntervention />} />
          <Route path="/interventions" element={<InterventionsList />} />
          <Route path="/dentists" element={<DentistsList />} />
          <Route path="/dentist" element={<CreateDentist />} />
          <Route path="/event" element={<Event />} />
          <Route path="/events" element={<EventsList />} />
        </Routes>
      </Content>
    </Layout>
  );
}

export default App;
