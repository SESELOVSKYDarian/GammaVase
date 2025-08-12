import React, { useState } from "react";
import "./AdminPanel.css";

const AdminLogin = () => {
  const [admin, setAdmin] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");

  const sendCreds = async () => {
    setError("");
    const res = await fetch("http://localhost:3000/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ admin, contrasena }),
    });
    const data = await res.json();
    if (res.ok) {
      setStep(2);
    } else {
      setError(data.mensaje || "Error en credenciales");
    }
  };

  const verifyCode = async () => {
    setError("");
    const res = await fetch("http://localhost:3000/api/admin/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("adminAuthed", "true");
      window.location.href = "/admin/panel";
    } else {
      setError(data.mensaje || "Código incorrecto");
    }
  };

  return (
    <div className="admin-login">
      {step === 1 ? (
        <div className="login-box">
          <h2>Admin</h2>
          <input
            type="text"
            placeholder="Usuario"
            value={admin}
            onChange={(e) => setAdmin(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
          {error && <p className="error">{error}</p>}
          <button onClick={sendCreds}>Ingresar</button>
        </div>
      ) : (
        <div className="login-box">
          <h2>Verificación</h2>
          <input
            type="text"
            placeholder="Código"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          {error && <p className="error">{error}</p>}
          <button onClick={verifyCode}>Confirmar</button>
          <button onClick={sendCreds}>Reenviar código</button>
        </div>
      )}
    </div>
  );
};

export default AdminLogin;
