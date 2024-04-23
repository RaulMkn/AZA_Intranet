class InterventionDto {
    constructor(full_name, price, department) {
      this.full_name = full_name;
      this.price = price;
      this.department = department;
    }
  
    static toFormData(interventionDto) {
      const formData = new FormData();
      formData.append('full_name', interventionDto.full_name);
      formData.append('price', interventionDto.price);
      formData.append('department', interventionDto.department);
      return formData;
    }
  }
  
  export default InterventionDto;
  