import { useState } from "react";
import "./RegisterForm.css";
import { FaUser, FaLock } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import axios from "axios";
import Swal from "sweetalert2";

const RegisterForm = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [error] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("name", nombre);
      formData.append("email", email);
      formData.append("pass", contrasena);
      console.log("Contenido del FormData:");
      formData.forEach((value, key) => {
        console.log(key, value);
      });

      const response = await axios.post(
        "http://localhost:8080/intranet/DentalAesthetics/dentist",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Basic " + btoa(import.meta.env.VITE_DATABASE_AUTH),
          },
          crossdomain: true,
        }
      );

      console.log("Respuesta del servidor:", response.data);
      Swal.fire({
        title: "Registro Exitoso!",
        text: "Pongase en contacto con su supervisor para que valide su cuenta.",
        icon: "success",
      });
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error) {
      console.error("Error al enviar datos al servidor:", error);
      Swal.fire({
        title: "Registro Fallido!",
        text: "Pongase en contacto con su supervisor.",
        icon: "error",
        width: 600,
        padding: "3em",
        color: "#716add",
        confirmButtonText: "Entendido",
      })
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Registro</h1>
        <div className="input-box">
          <FaUser className="icon" />
          <input
            type="text"
            placeholder="Nombre completo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="input-box">
          <IoIosMail className="icon" />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-box">
          <FaLock className="icon" />
          <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
        </div>
        <div className="input-box">
          <h3>Inserte una imagen suya</h3>
          <input
            type="file"
            accept=".jpg, .jpeg, .png"
            onChange={(e) => {
              setImageFile(e.target.files[0]);
            }}
            required
          />

          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>

        <button type="submit">Registro</button>

        <div className="register-link">
          <p>
            Ya tienes una cuenta? <a href="login">Inicia Sesion</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
