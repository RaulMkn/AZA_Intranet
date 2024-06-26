class PatientDto {
    constructor(full_name, email, phone, dentist, nif, address, gender, date_of_birth) {
      this.full_name = full_name;
      this.email = email;
      this.phone = phone;
      this.dentist = dentist;
      this.nif = nif;
      this.address = address;
      this.gender = gender;
      this.date_of_birth = date_of_birth;
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
      formData.append('date_of_birth', patientDto.date_of_birth);
      return formData;
    }
  }
  
  export default PatientDto;
  