import { useState, useEffect } from "react";
import { Select } from "antd";
import axios from "axios";
import PropTypes from "prop-types";

const { Option } = Select;

const InterventionsDropdown = ({ onSelect }) => {
  InterventionsDropdown.propTypes = {
    onSelect: PropTypes.func,
  };

  const [interventions, setInterventions] = useState([]);
  const [selectedInterventions, setSelectedInterventions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/intranet/DentalAesthetics/interventions",
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Authorization: "Basic " + btoa("maken:yuki"),
            },
            crossdomain: true,
          }
        );
        setInterventions(response.data);
      } catch (error) {
        console.error("Error al obtener datos de intervenciones:", error);
      }
    };

    fetchData();
  }, []);

  const handleInterventionChange = (value) => {
    setSelectedInterventions(value);
    onSelect && onSelect(value);
  };

  return (
    <Select
      showSearch
      style={{ width: "210px" }}
      placeholder="Selecciona una intervención"
      optionFilterProp="children"
      onChange={handleInterventionChange}
      value={selectedInterventions}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      mode="multiple"
    >
      {interventions.map((intervention) => (
        <Option key={intervention.id} value={intervention.id.toString()}>
          {`${intervention.id}. ${intervention.full_name} - ${intervention.price}€`}
        </Option>
      ))}
    </Select>
  );
};

export default InterventionsDropdown;
