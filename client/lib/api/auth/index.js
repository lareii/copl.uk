import api from '@/lib/api';

export async function register(data) {
  try {
    const response = await api.post('/auth/register', data);
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function login(username, password) {
  try {
    const response = await api.post('/auth/login', { username, password });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function logout() {
  try {
    const response = await api.post('/auth/logout');
    return response;
  } catch (error) {
    return error.response;
  }
}