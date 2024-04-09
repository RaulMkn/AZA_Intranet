import { useState, useEffect } from "react";
import { Select } from "antd";
import axios from "axios";
import PropTypes from "prop-types";

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
        const response = await axios.get(
          "http://localhost:8080/intranet/DentalAesthetics/patients",
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Authorization: "Basic " + btoa("maken:yuki"),
            },
            crossdomain: true,
          }
        );
        console.log(response.data);
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
        <Option key={patient.id} value={patient.id}>
          {`${patient.id} - ${patient.full_name}`}
        </Option>
      ))}
    </Select>
  );
};

export default PatientDropdown;
