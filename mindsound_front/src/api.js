// src/api.js
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";

// helper headers with token
const authHeaders = () => {
  const token = localStorage.getItem("ms_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export async function postJson(path, body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(body),
  });
  return res.json();
}

export async function getJson(path) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { ...authHeaders() },
  });
  return res.json();
}

export async function uploadForm(path, formData) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { ...authHeaders() }, // don't set content-type for multipart
    body: formData,
  });
  return res.json();
}
