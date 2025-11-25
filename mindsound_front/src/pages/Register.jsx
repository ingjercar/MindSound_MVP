import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Register({ onSuccess }) {
  const { register } = useContext(AuthContext);
  const [form, setForm] = useState({ email:"", password:"" });
  const [msg, setMsg] = useState(null);

  const handle = async (e) => {
    e.preventDefault();
    const r = await register(form.email, form.password);
    setMsg(r.msg || r.error || JSON.stringify(r));
    if (r.accessToken) onSuccess?.();
  };

  return (
    <div className="login-wrapper vh-100 d-flex align-items-center justify-content-center">
      <div className="login-box p-4 rounded shadow" style={{maxWidth:360, background:"linear-gradient(to bottom,#111,#444)"}}>
        <h2 className="text-light mb-3">Crear cuenta</h2>
        <form onSubmit={handle}>
          <input className="form-control mb-2" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="E-mail" />
          <input className="form-control mb-2" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="Password" />
          <button className="btn btn-login w-100">Crear</button>
          {msg && <div className="text-info mt-2">{msg}</div>}
        </form>
      </div>
    </div>
  );
}
