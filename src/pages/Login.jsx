import { useState } from "react";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setMensaje("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin");
    } catch (err) {
      setError("Correo o contraseña incorrectos.");
    }
  };

  const handleReset = async () => {
    if (!email) {
      setError("Ingresa tu correo para recuperar contraseña.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMensaje("Correo de recuperación enviado.");
      setError("");
    } catch {
      setError("No se pudo enviar el correo.");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-box">

        <h2>Panel Administrativo</h2>

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="login-error">{error}</p>}
        {mensaje && <p className="login-success">{mensaje}</p>}

        <button type="submit">Ingresar</button>

        <p className="reset-link" onClick={handleReset}>
          ¿Olvidaste tu contraseña?
        </p>

      </form>
    </div>
  );
}
