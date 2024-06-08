import { useEffect, useState } from "react";
import { Card, Descriptions, Avatar, Spin, Statistic, Col, Row } from "antd";
import { WarningOutlined, ArrowUpOutlined } from "@ant-design/icons";

import CountUp from "react-countup";
import "./Home.css"; // Asegúrate de crear este archivo CSS

const Home = () => {
  const [dentist, setDentist] = useState(null);
  const formatter = (value) => <CountUp end={value} separator="," />;

  useEffect(() => {
    const dentistData = JSON.parse(localStorage.getItem("Dentist"));
    setDentist(dentistData);
    console.log(dentistData);
  }, []);

  if (!dentist) {
    return (
      <div className="loading-container">
        <Spin size="large" tip="Cargando..." />
      </div>
    );
  }

  const totalAppointmentsPrice = dentist.appointments.reduce(
    (acc, appointment) => acc + appointment.total_price,
    0
  );
  const upcomingEventsCount = dentist.events.filter(
    (event) => new Date(event.start_date) > new Date()
  ).length;
  const labelStyle = { fontSize: "16px", fontWeight: "bold" }; // Personaliza el tamaño y estilo del label

  return (
    <Card title="Tus datos personales" className="card-container">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        {" "}
        <Row gutter={16} style={{ alignItems: "center", gap: "40px" }}>
          <Col style={{ height: "fit-content" }}>
            <Statistic
              title="Total de ventas"
              value={totalAppointmentsPrice}
              formatter={formatter}
              valueStyle={{
                color: "#3f8600",
              }}
              prefix={<ArrowUpOutlined />}
              suffix="€"
            />
          </Col>
          <Avatar
            src={`data:${dentist.picture.img_type};base64,${dentist.picture.img}`}
            size={148}
            className="avatar"
          />
          <Col style={{ height: "fit-content" }}>
            <Statistic
              title="Eventos pendientes"
              value={upcomingEventsCount}
              valueStyle={{
                color: "#cf1322",
              }}
              prefix={<WarningOutlined />}
            />
          </Col>
        </Row>
      </div>

      <div className="description-container">
        <Descriptions
          bordered
          column={1}
          className="descriptions"
          style={{ position: "left" }}
          labelStyle={labelStyle}
        >
          <Descriptions.Item label="Nombre Completo">
            {dentist.full_name}
          </Descriptions.Item>
          <Descriptions.Item label="Correo Electrónico">
            {dentist.email}
          </Descriptions.Item>
          <Descriptions.Item label="Fecha de Nacimiento">
            {dentist.date_of_birth}
          </Descriptions.Item>
          <Descriptions.Item label="Departamento">
            {dentist.department.department_name}
          </Descriptions.Item>
        </Descriptions>
        <Descriptions
          bordered
          column={1}
          className="descriptions"
          style={{ position: "right" }}
          labelStyle={labelStyle}
        >
          <Descriptions.Item label="NIF">{dentist.nif}</Descriptions.Item>
          <Descriptions.Item label="Dirección">
            {dentist.address}
          </Descriptions.Item>
          <Descriptions.Item label="Género">{dentist.gender}</Descriptions.Item>
          <Descriptions.Item label="Trabajo">{dentist.job}</Descriptions.Item>
        </Descriptions>
      </div>
    </Card>
  );
};

export default Home;
