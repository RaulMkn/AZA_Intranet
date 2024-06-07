import { useEffect, useState } from 'react';
import { Card, Descriptions, Avatar } from 'antd';

const Home = () => {
  const [dentist, setDentist] = useState(null);

  useEffect(() => {
    const dentistData = JSON.parse(localStorage.getItem('Dentist'));
    setDentist(dentistData);
  }, []);

  if (!dentist) {
    return <div>Cargando...</div>;
  }

  return (
    <Card title="Tus datos personales" style={{ width: 600, margin: 'auto', marginTop: '50px' }}>
            <Avatar
        src={`data:${dentist.picture.img_type};base64,${dentist.picture.img}`}
        size={128}
        style={{ marginTop: '20px' }}
      />
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Nombre Completo">{dentist.full_name}</Descriptions.Item>
        <Descriptions.Item label="Correo Electrónico">{dentist.email}</Descriptions.Item>
        <Descriptions.Item label="Fecha de Nacimiento">{dentist.date_of_birth}</Descriptions.Item>
        <Descriptions.Item label="Género">{dentist.gender}</Descriptions.Item>
        <Descriptions.Item label="Departamento">{dentist.department.department_name}</Descriptions.Item>
        <Descriptions.Item label="Trabajo">{dentist.job}</Descriptions.Item>
        <Descriptions.Item label="NIF">{dentist.nif}</Descriptions.Item>
        <Descriptions.Item label="Permisos">{dentist.permits}</Descriptions.Item>
        <Descriptions.Item label="Dirección">{dentist.address}</Descriptions.Item>
        <Descriptions.Item label="ID">{dentist.id}</Descriptions.Item>
      </Descriptions>

    </Card>
  );
};

export default Home;
