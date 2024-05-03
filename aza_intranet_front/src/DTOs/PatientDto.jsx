class PatientDto {
    constructor(full_name, email, phone, dentist, nif, address, gender, birthDate) {
      this.full_name = full_name;
      this.email = email;
      this.phone = phone;
      this.dentist = dentist;
      this.nif = nif;
      this.address = address;
      this.gender = gender;
      this.birthDate = birthDate;
    }
  
    static toFormData(patientDto) {
      const formData = new FormData();
      formData.append('full_name', patientDto.full_name);
      formData.append('email', patientDto.email);
      formData.append('phone', patientDto.phone);
      formData.append('dentistId', patientDto.dentist);
      formData.append('nif', patientDto.nif);
      formData.append('address', patientDto.address);
      formData.append('gender', patientDto.gender);
      formData.append('birthDate', patientDto.birthDate);
      return formData;
    }
  }
  
  export default PatientDto;
  