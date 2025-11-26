// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { postJson } from "../api";

export const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { id, email, role }
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("ms_user");
    const token = localStorage.getItem("ms_token");
    if (raw && token) {
      try {
        setUser(JSON.parse(raw));
      } catch (e) {
        localStorage.removeItem("ms_user");
        localStorage.removeItem("ms_token");
      }
    }
    setReady(true);
  }, []);

  async function login(email, password) {
    const res = await postJson("/api/auth/login", { email, password });
    if (res.accessToken) {
      localStorage.setItem("ms_token", res.accessToken);
      localStorage.setItem("ms_user", JSON.stringify(res.user));
      setUser(res.user);
      return { ok: true };
    }
    return { ok: false, error: res.error || res };
  }

  async function register(email, password) {
    const res = await postJson("/api/auth/register", { email, password });
    // you may auto-login after register if backend returns tokens
    return res;
  }

  function logout() {
    localStorage.removeItem("ms_token");
    localStorage.removeItem("ms_user");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, ready, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}
