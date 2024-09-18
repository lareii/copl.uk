import api from '@/lib/api';

export async function me() {
  try {
    const response = await api.get('/me');
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function updateMe(data) {
  try {
    const response = await api.patch('/me', data);
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function getFeed() {
  try {
    const response = await api.get('/me/feed');
    return response;
  } catch (error) {
    return error.response;
  }
}