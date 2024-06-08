import { useEffect, useState } from 'react';
import { Card, Descriptions, Avatar, Spin } from 'antd';
import './Home.css'; // Asegúrate de crear este archivo CSS

const Home = () => {
  const [dentist, setDentist] = useState(null);

  useEffect(() => {
    const dentistData = JSON.parse(localStorage.getItem('Dentist'));
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

  const totalAppointmentsPrice = dentist.appointments.reduce((acc, appointment) => acc + appointment.total_price, 0);
  const totalPatients = dentist.patients.length;
  const upcomingEventsCount = dentist.events.filter(event => new Date(event.start_date) > new Date()).length;
  const labelStyle = { fontSize: '16px', fontWeight: 'bold' }; // Personaliza el tamaño y estilo del label


  return (
    <Card title="Tus datos personales" className="card-container" >
      <Avatar
        src={`data:${dentist.picture.img_type};base64,${dentist.picture.img}`}
        size={148}
        className="avatar"
      />
      <div className='description-container'>
      <Descriptions bordered column={1} className="descriptions" style={{position: 'left'}} labelStyle={labelStyle}>
        <Descriptions.Item label="Nombre Completo">{dentist.full_name}</Descriptions.Item>
        <Descriptions.Item label="Correo Electrónico">{dentist.email}</Descriptions.Item>
        <Descriptions.Item label="Fecha de Nacimiento">{dentist.date_of_birth}</Descriptions.Item>
        <Descriptions.Item label="Género">{dentist.gender}</Descriptions.Item>
        <Descriptions.Item label="Departamento">{dentist.department.department_name}</Descriptions.Item>
        <Descriptions.Item label="Trabajo">{dentist.job}</Descriptions.Item>
        </Descriptions>
        <Descriptions bordered column={1} className="descriptions" style={{position: 'right'}} labelStyle={labelStyle}>
        <Descriptions.Item label="NIF">{dentist.nif}</Descriptions.Item>
        <Descriptions.Item label="Permisos">{dentist.permits}</Descriptions.Item>
        <Descriptions.Item label="Dirección">{dentist.address}</Descriptions.Item>
        <Descriptions.Item label="Total Ventas">{totalAppointmentsPrice}€</Descriptions.Item>
        <Descriptions.Item label="Número de Pacientes">{totalPatients}</Descriptions.Item>
        <Descriptions.Item label="Eventos Pendientes">{upcomingEventsCount}</Descriptions.Item>
      </Descriptions>
      </div>
    </Card>
  );
};

export default Home;
