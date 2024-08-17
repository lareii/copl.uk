import api from "@/lib/api";

export async function me() {
  try {
    const response = await api.get("/auth/me");
    return response;
  } catch (error) {
    return error.response;
  }
}