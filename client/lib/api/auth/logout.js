import api from "@/lib/api";

export async function logout() {
  try {
    const response = await api.get("/auth/logout");
    return response;
  } catch (error) {
    return error.response;
  }
}