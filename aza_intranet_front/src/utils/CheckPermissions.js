// utils.js
import Swal from "sweetalert2";
import side_eye from "../assets/side_eye.jpeg";

export const checkAdminPermissionsAndRedirect = (dentistJson) => {
  if (dentistJson == null || dentistJson.permits == 0) {
    Swal.fire({
      title: "¿Estás seguro de que tienes permisos para esta página?",
      icon: false,
      text: "Yo creo que no, pero contacta con maken",
      imageUrl: side_eye,
      imageWidth: 400,
      imageHeight: 300,
      imageAlt: "Ojo Lateral Boombastico ;-;",
      showCancelButton: false,
      showConfirmButton: false,
    });
    setTimeout(() => {
      window.location.href = "/login";
    }, 4000);
    return true;
  }
  return false;
};
export const checkPermissionsAndRedirect = (dentistJson) => {
    if (dentistJson == null) {
      Swal.fire({
        title: "¿Estás seguro de que tienes permisos para esta página?",
        icon: false,
        text: "Yo creo que no, pero contacta con maken",
        imageUrl: side_eye,
        imageWidth: 400,
        imageHeight: 300,
        imageAlt: "Ojo Lateral Boombastico ;-;",
        showCancelButton: false,
        showConfirmButton: false,
      });
      setTimeout(() => {
        window.location.href = "/login";
      }, 4000);
      return true;
    }
    return false;
  };
