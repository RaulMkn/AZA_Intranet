class DentistDto {
    constructor(full_name, email, pass, picture, job, permis) {
      this.full_name = full_name;
      this.email = email;
      this.pass = pass;
      this.picture = picture;
      this.job = job;
      this.permis = permis;
    }
  
    static toFormData(dentistDto) {
      const formData = new FormData();
      formData.append('full_name', dentistDto.full_name);
      formData.append('email', dentistDto.email);
      formData.append('pass', dentistDto.pass);
      formData.append('image', dentistDto.image);
      formData.append('job', dentistDto.job);
      formData.append('permis', dentistDto.permis);
      return formData;
    }
  }
  
  export default DentistDto;
  