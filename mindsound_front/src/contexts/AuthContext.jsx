import React, { createContext, useState, useEffect } from "react";
import { postJson } from "../api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("ms_user")); } catch(e){ return null; }
  });
  const [token, setToken] = useState(() => localStorage.getItem("ms_token"));

  useEffect(() => {
    if (token) localStorage.setItem("ms_token", token); else localStorage.removeItem("ms_token");
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem("ms_user", JSON.stringify(user)); else localStorage.removeItem("ms_user");
  }, [user]);

  const login = async (email, password) => {
    const data = await postJson("/api/auth/login", { email, password });
    if (data.accessToken) {
      setToken(data.accessToken);
      setUser(data.user);
      return { ok: true };
    }
    return { ok: false, error: data.error || data.message };
  };

  const register = async (email, password) => {
    const data = await postJson("/api/auth/register", { email, password });
    // many backends auto-login; adapt if yours returns tokens
    return data;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, token, login, register, logout }}>{children}</AuthContext.Provider>;
}
