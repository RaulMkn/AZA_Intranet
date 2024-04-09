class AppointmentDto {
    constructor(
      date_time_beginning,
      date_time_ending,
      priority,
      state,
      title,
      department,
      description,
      total_price,
      invoice,
      dentist,
      patient,

    ) {
      this.date_time_beginning = date_time_beginning;
      this.date_time_ending = date_time_ending;
      this.priority = priority;
      this.state = state;
      this.title = title;
      this.department = department;
      this.description = description;
      this.total_price = total_price;
      this.invoice = invoice;
      this.dentist = dentist;
      this.patient = patient;

    }
  
    static toFormData(appointmentDto) {
      const formData = new FormData();
      formData.append('date_time_beginning', appointmentDto.date_time_beginning);
      formData.append('date_time_ending', appointmentDto.date_time_ending);
      formData.append('priority', appointmentDto.priority);
      formData.append('state', appointmentDto.state);
      formData.append('title', appointmentDto.title);
      formData.append('department', appointmentDto.department);
      formData.append('description', appointmentDto.description);
      formData.append('total_price', appointmentDto.total_price);
      formData.append('invoice', appointmentDto.invoice);
      formData.append('dentist', appointmentDto.dentist);
      formData.append('patient', appointmentDto.patient);
      return formData;
    }
  }
  
  export default AppointmentDto;
  