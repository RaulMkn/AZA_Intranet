import { useState, useEffect } from "react";
import { Select } from "antd";
import axios from "axios";
import PropTypes from "prop-types";
import API_BASE_URL from "./api";

const { Option } = Select;

const DepartmentDropdown = ({ onSelect }) => {
  DepartmentDropdown.propTypes = {
    onSelect: PropTypes.func, // Validación para la función onSelect
  };

  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/departments`);
        setDepartments(response.data);
      } catch (error) {
        console.error("Error al obtener datos de usuarios:", error);
      }
    };

    fetchData();
  }, []);

  const handleDepartmentChange = (value) => {
    setSelectedDepartment(value);
    onSelect && onSelect(value);
  };

  return (
    <Select
      showSearch
      style={{ width: "inherit" }}
      placeholder="Selecciona un departamento"
      optionFilterProp="children"
      onChange={handleDepartmentChange}
      value={selectedDepartment}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {departments.map((department) => (
        <Option key={department.id} value={department.id.toString()}>
          {`${department.id} - ${department.department_name}`}
        </Option>
      ))}
    </Select>
  );
};

export default DepartmentDropdown;
