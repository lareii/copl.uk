import api from '@/lib/api';

export async function getPost({ id }) {
  try {
    const response = await api.get(`/posts/${id}`);
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function getPosts(limit, offset) {
  try {
    const response = await api.get('/posts', { params: { limit, offset } });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function createPost({ content }) {
  try {
    const response = await api.post('/posts', { content });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function likePost({ id, like }) {
  try {
    const response = await api.patch(`/posts/${id}`, { like });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function editPost({ id, content }) {
  try {
    const response = await api.patch(`/posts/${id}`, { content });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function deletePost({ id }) {
  try {
    const response = await api.delete(`/posts/${id}`);
    return response;
  } catch (error) {
    return error.response;
  }
}
