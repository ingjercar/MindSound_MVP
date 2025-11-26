// src/pages/Login.jsx
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Login({ onSuccess, goRegister }) {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const r = await login(form.email, form.password);
    setLoading(false);
    if (r.ok) {
      onSuccess?.();
    } else {
      setError(r.error || "Credenciales inválidas");
    }
  }

  return (
    <div className="center-page">
      <div className="login-box card-dark">
        <h2 className="mb-3">Login</h2>

        <form onSubmit={submit}>
          <input className="form-control mb-2" placeholder="E-mail" value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })} required />

          <input type="password" className="form-control mb-2" placeholder="Password" value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })} required />

          <button className="btn btn-primary w-100 mb-2" disabled={loading} type="submit">
            {loading ? "Entrando..." : "Iniciar sesión"}
          </button>

          {error && <div className="text-danger mb-2">{error}</div>}

          <div className="d-flex justify-content-between">
            <button type="button" className="btn btn-link text-muted" style={{ color: "#d9d9d9" }} onClick={goRegister}>Registrarse</button>
          </div>
        </form>
      </div>
    </div>
  );
}
