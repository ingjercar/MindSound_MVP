import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Login({ onSuccess }) {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email:"", password:"" });
  const [err, setErr] = useState(null);

  const handle = async (e) => {
    e.preventDefault();
    setErr(null);
    const r = await login(form.email, form.password);
    if (r.ok) {
      onSuccess?.();
    } else {
      setErr(r.error || "Error login");
    }
  };

  return (
    <div className="login-wrapper vh-100 d-flex align-items-center justify-content-center">
      <div className="login-box p-4 rounded shadow" style={{maxWidth:360, width:"100%", background:"linear-gradient(to bottom,#111,#444)"}}>
        <h2 className="text-light mb-3">Login</h2>
        <form onSubmit={handle}>
          <input className="form-control mb-2" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="E-mail" type="email" />
          <input className="form-control mb-2" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="Password" type="password" />
          <button className="btn btn-login w-100">Iniciar</button>
          {err && <div className="text-danger mt-2">{err}</div>}
        </form>
      </div>
    </div>
  );
}
