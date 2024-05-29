class EventDto {
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
  
    static toFormData(eventDto) {
      const formData = new FormData();
      formData.append('date_time_beginning', eventDto.date_time_beginning);
      formData.append('date_time_ending', eventDto.date_time_ending);
      formData.append('title', eventDto.title);
      formData.append('description', eventDto.description);
      formData.append('location', eventDto.location);
      formData.append('dentist', eventDto.dentist);
      return formData;
    }
  }
  
  export default EventDto;
  