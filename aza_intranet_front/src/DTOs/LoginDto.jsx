class LoginDto {
    constructor(email,pass) {
      this.email = email;
      this.pass = pass;
    }
  
    static toFormData(loginDto) {
      const formData = new FormData();
      formData.append('email', loginDto.email);
      formData.append('pass', loginDto.pass);
      return formData;
    }
  }
  
  export default LoginDto;
  