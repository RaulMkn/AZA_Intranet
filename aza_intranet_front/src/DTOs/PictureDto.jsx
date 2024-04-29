class PictureDto {
    constructor(img_name, img) {
      this.img_name = img_name;
      this.img = img;
    }

    static toFormData(pictureDto) {
        const formData = new FormData();
        formData.append('img_name', pictureDto.img_name);
        formData.append('img', pictureDto.img);
        return formData;
      }
  }
  
  export default PictureDto;
  