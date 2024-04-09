import { useState, useEffect } from "react";
import { Select } from "antd";
import axios from "axios";
import PropTypes from "prop-types";

const { Option } = Select;

const DentistDropDown = ({ onSelect }) => {
  DentistDropDown.propTypes = {
    onSelect: PropTypes.func, // Validación para la función onSelect
  };

  // Estado para almacenar la lista de usuarios y el usuario seleccionado
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  // useEffect se utiliza para realizar la solicitud cuando el componente se monta
  useEffect(() => {
    // Función asíncrona para realizar la solicitud de datos
    const fetchData = async () => {
      try {
        // Realiza la solicitud GET a la URL de la API
        const response = await axios.get(
          "http://localhost:8080/intranet/DentalAesthetics/dentists",
          {
            withCredentials: true, // Utiliza credenciales de autenticación
            headers: {
              "Content-Type": "application/json",
              Authorization: "Basic " + btoa("maken:yuki"), // Agrega encabezados necesarios
            },
            crossdomain: true, // Permite solicitudes a diferentes dominios
          }
        );
        console.log(response.data);

        // Actualiza el estado 'users' con los datos de la respuesta
        setUsers(response.data);
      } catch (error) {
        // Manejo de errores en caso de que la solicitud falle
        console.error("Error al obtener datos de usuarios:", error);
      }
    };

    // Llama a la función fetchData al montar el componente
    fetchData();
  }, []); // El segundo argumento [] asegura que useEffect solo se ejecute al montar el componente

  // Maneja el cambio de usuario seleccionado
  const handleUserChange = (value) => {
    setSelectedUser(value);
    onSelect && onSelect(value); // Llama a la función de devolución de llamada si se proporciona
  };

  // Renderiza un componente Select de Ant Design con opciones generadas a partir de los datos de usuario
  return (
    <Select
      showSearch
      style={{ width: "inherit" }}
      placeholder="Selecciona un usuario"
      optionFilterProp="children"
      onChange={handleUserChange}
      value={selectedUser}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {/* Mapea sobre la lista de usuarios y crea opciones para cada uno */}
      {users.map((user) => (
        <Option key={user.id} value={user.id}>
          {`${user.id} - ${user.full_name}`}
        </Option>
      ))}
    </Select>
  );
};

export default DentistDropDown;
