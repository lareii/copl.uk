import api from "@/lib/api";

export async function login(username, password) {
  try {
    const response = await api.post("/auth/login", { username, password });
    return response;
  } catch (error) {
    return error.response;
  }
}