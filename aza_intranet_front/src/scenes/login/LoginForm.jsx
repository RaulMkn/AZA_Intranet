import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import "./LoginForm.css";
import LoginDto from "../../DTOs/LoginDto";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    const loginDto = new LoginDto(email, pass);

    try {
      const formData = LoginDto.toFormData(loginDto);
      console.log(formData);

      const response = await axios.post(
        "http://localhost:8080/intranet/DentalAesthetics/login",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + btoa(import.meta.env.VITE_DATABASE_AUTH),
          },
          crossdomain: true,
        }
      );
      Swal.fire({
        title: "Inicio de sesión exitoso!",
        icon: "success",
      }).then(() => {
        console.log("Respuesta del servidor:", response.data);

        // Suponiendo que response.data contiene el DentistDto devuelto por la petición
        var dentistDto = response.data;

        // Convertir el DentistDto a cadena JSON
        var dentistJson = JSON.stringify(dentistDto);
        console.log(response.data);

        // Guardar la cadena JSON en el localStorage
        localStorage.setItem("Dentist", dentistJson);

        window.location.href = "/home"; // Redirigir a la página de inicio
      });
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      Swal.fire({
        title: "Inicio de Sesión Fallido!",
        text: "Por favor, verifica tu nombre de usuario y contraseña.",
        icon: "error",
        confirmButtonText: "Entendido",
      });
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleLogin}>
        <h1>Iniciar Sesión</h1>
        <div className="input-box">
          <FaUser className="icon" />
          <input
            type="email"
            placeholder="Correo Electronico"
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
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
          />
        </div>

        {/* <div className="remember-forgot">
          <label>
            <input type="checkbox" />
            Recordar contraseña
          </label>
        </div>
    
        <div>
          <a href="../App">He olvidado mi contraseña</a>
        </div>
            */}
        <button type="submit">Login</button>

        <div className="register-link">
          <p>
            No tienes una cuenta? <a href="register">Regístrate</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
