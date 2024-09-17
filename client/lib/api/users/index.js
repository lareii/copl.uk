import api from '@/lib/api';

export async function getUser({ slug }) {
  try {
    const response = await api.get(`/users/${slug}`);
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function getUsers(limit, offset) {
  try {
    const response = await api.get('/users', { params: { limit, offset } });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function followUser(slug) {
  try {
    const response = await api.post(`/users/${slug}/follows`);
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function getFollows(slug, option, limit, offset) {
  try {
    const response = await api.get(`/users/${slug}/follows`, {
      params: { option, limit, offset }
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function getUserPosts(slug, limit, offset) {
  try {
    const response = await api.get(`/users/${slug}/posts`, {
      params: { limit, offset }
    });
    return response;
  } catch (error) {
    return error.response;
  }
}
