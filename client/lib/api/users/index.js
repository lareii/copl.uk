import api from '@/lib/api';

export async function getUser({ slug }) {
  try {
    const response = await api.get(`/users/${slug}`);
    return response;
  } catch (error) {
    return error.response;
  }
}