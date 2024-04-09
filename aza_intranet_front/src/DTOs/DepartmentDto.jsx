class DepartmentDto {
  constructor(department_name, dentist) {
    this.department_name = department_name;
    this.dentist = dentist;
  }

  static toFormData(departmentDto) {
    const formData = new FormData();
    formData.append("department_name", departmentDto.department_name);
    formData.append("dentist", departmentDto.dentist);
    return formData;
  }
}
export default DepartmentDto;
