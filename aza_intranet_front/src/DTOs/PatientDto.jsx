class PatientDto {
    constructor(full_name, email, phone, dentist) {
      this.full_name = full_name;
      this.email = email;
      this.phone = phone;
      this.dentist = dentist;
    }
  
    static toFormData(patientDto) {
      const formData = new FormData();
      formData.append('full_name', patientDto.full_name);
      formData.append('email', patientDto.email);
      formData.append('phone', patientDto.phone);
      formData.append('dentist', patientDto.dentist);
      return formData;
    }
  }
  
  export default PatientDto;
  