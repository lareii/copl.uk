import api from '@/lib/api';

export async function login(username, password) {
  try {
    const response = await api.post(`/auth/login`, { username, password });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function logout() {
  try {
    const response = await api.get(`/auth/logout`);
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function me() {
  try {
    const response = await api.get(`/auth/me`);
    return response;
  } catch (error) {
    return error.response;
  }
}