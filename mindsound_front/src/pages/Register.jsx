// src/pages/Register.jsx
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Register({ goLogin }) {
  const { register } = useAuth();
  const [form, setForm] = useState({ email: "", password: "", confirm: "" });
  const [error, setError] = useState(null);
  const [okMsg, setOkMsg] = useState(null);

  async function submit(e) {
    e.preventDefault();
    setError(null);
    setOkMsg(null);
    if (form.password.length < 6) return setError("Contraseña mínima 6 caracteres");
    if (form.password !== form.confirm) return setError("Contraseñas no coinciden");

    const res = await register(form.email, form.password);
    if (res && res.user) {
      setOkMsg("Cuenta creada. Haz login.");
    } else {
      setError(res.error || "Error al registrar");
    }
  }

  return (
    <div className="center-page">
      <div className="login-box card-dark">
        <h2 className="mb-3">Crear cuenta</h2>

        <form onSubmit={submit}>
          <input className="form-control mb-2" placeholder="E-mail" value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })} required />
          <input type="password" className="form-control mb-2" placeholder="Password" value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })} required />
          <input type="password" className="form-control mb-2" placeholder="Confirm Password" value={form.confirm}
            onChange={e => setForm({ ...form, confirm: e.target.value })} required />

          <button className="btn btn-primary w-100 mb-2" type="submit">Crear cuenta</button>

          {error && <div className="text-danger mb-2">{error}</div>}
          {okMsg && <div className="text-success mb-2">{okMsg}</div>}

          <div className="d-flex justify-content-between">
            <button type="button" className="btn btn-link text-muted" onClick={goLogin}>Volver al login</button>
          </div>
        </form>
      </div>
    </div>
  );
}
