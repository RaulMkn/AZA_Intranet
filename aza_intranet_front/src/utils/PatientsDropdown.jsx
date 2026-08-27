import { useState, useEffect } from "react";
import { Select } from "antd";
import axios from "axios";
import PropTypes from "prop-types";
import API_BASE_URL from "./api";

const { Option } = Select;

const PatientDropdown = ({ onSelect }) => {
  PatientDropdown.propTypes = {
    onSelect: PropTypes.func, // Validación para la función onSelect
  };

  const [patients, setpatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/patients`);
        setpatients(response.data);
      } catch (error) {
        console.error("Error al obtener datos de usuarios:", error);
      }
    };

    fetchData();
  }, []);

  const handlePatientChange = (value) => {
    setSelectedPatient(value);
    onSelect && onSelect(value);
  };

  return (
    <Select
      showSearch
      style={{ width: "inherit" }}
      placeholder="Selecciona un paciente"
      optionFilterProp="children"
      onChange={handlePatientChange}
      value={selectedPatient}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {patients.map((patient) => (
        <Option key={patient.id} value={patient.id.toString()}>
          {`${patient.id} - ${patient.full_name}`}
        </Option>
      ))}
    </Select>
  );
};

export default PatientDropdown;
