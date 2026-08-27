import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import "./LoginForm.css";
import LoginDto from "../../DTOs/LoginDto";
import API_BASE_URL from "../../utils/api";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    const loginDto = new LoginDto(email, pass);

    try {
      const formData = LoginDto.toFormData(loginDto);

      const response = await axios.post(`${API_BASE_URL}/login`, formData);
      Swal.fire({
        title: "Inicio de sesión exitoso!",
        icon: "success",
      }).then(() => {
        // Suponiendo que response.data contiene el DentistDto devuelto por la petición
        const dentistDto = response.data;

        // Convertir el DentistDto a cadena JSON
        const dentistJson = JSON.stringify(dentistDto);

        // Guardar la cadena JSON en el localStorage
        localStorage.setItem("Dentist", dentistJson);

        navigate("/home"); // Redirigir a la página de inicio
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
