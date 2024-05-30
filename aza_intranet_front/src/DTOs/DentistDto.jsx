class DentistDto {
    constructor(full_name, email, pass, picture, job, permis, date_of_birth, nif, address, gender) {
      this.full_name = full_name;
      this.email = email;
      this.pass = pass;
      this.picture = picture;
      this.job = job;
      this.permis = permis;
      this.permis = date_of_birth;
      this.permis = nif;
      this.permis = address;
      this.permis = gender;
    }
  
    static toFormData(dentistDto) {
      const formData = new FormData();
      formData.append('full_name', dentistDto.full_name);
      formData.append('email', dentistDto.email);
      formData.append('pass', dentistDto.pass);
      formData.append('image', dentistDto.image);
      formData.append('job', dentistDto.job);
      formData.append('permis', dentistDto.permis);
      formData.append('date_of_birth', dentistDto.date_of_birth);
      formData.append('nif', dentistDto.nif);
      formData.append('address', dentistDto.address);
      formData.append('gender', dentistDto.gender);
      return formData;
    }
  }
  
  export default DentistDto;
  