class DentistDto {
    constructor(full_name, email, pass, picture, job, permits, date_of_birth, nif, address, gender) {
      this.full_name = full_name;
      this.email = email;
      this.pass = pass;
      this.picture = picture;
      this.job = job;
      this.permits = permits;
      this.date_of_birth = date_of_birth;
      this.nif = nif;
      this.address = address;
      this.gender = gender;
    }
  
    static toFormData(dentistDto) {
      const formData = new FormData();
      formData.append('full_name', dentistDto.full_name);
      formData.append('email', dentistDto.email);
      formData.append('pass', dentistDto.pass);
      formData.append('image', dentistDto.image);
      formData.append('job', dentistDto.job);
      formData.append('permits', dentistDto.permits);
      formData.append('date_of_birth', dentistDto.date_of_birth);
      formData.append('nif', dentistDto.nif);
      formData.append('address', dentistDto.address);
      formData.append('gender', dentistDto.gender);
      return formData;
    }
  }
  
  export default DentistDto;
  