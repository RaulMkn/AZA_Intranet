class AppointmentDto {
    constructor(
      date_time_beginning,
      date_time_ending,
      title,
      description,
      location,
      dentist,

    ) {
      this.date_time_beginning = date_time_beginning;
      this.date_time_ending = date_time_ending;
      this.title = title;
      this.description = description;
      this.location = location;
      this.dentist = dentist;

    }
  
    static toFormData(appointmentDto) {
      const formData = new FormData();
      formData.append('date_time_beginning', appointmentDto.date_time_beginning);
      formData.append('date_time_ending', appointmentDto.date_time_ending);
      formData.append('title', appointmentDto.title);
      formData.append('description', appointmentDto.description);
      formData.append('location', appointmentDto.location);
      formData.append('dentist', appointmentDto.dentist);
      return formData;
    }
  }
  
  export default AppointmentDto;
  