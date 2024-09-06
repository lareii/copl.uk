import api from '@/lib/api';

export async function getComments(post_id, limit, offset) {
  try {
    const response = await api.get(`/posts/${post_id}/comments/`, {
      params: { limit, offset }
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function createComment({ post_id, content }) {
  try {
    const response = await api.post(`/posts/${post_id}/comments/`, { content });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function editComment({ post_id, id, content }) {
  try {
    const response = await api.patch(`/posts/${post_id}/comments/${id}`, {
      content
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function likeComment({ post_id, id, like }) {
  try {
    const response = await api.patch(`/posts/${post_id}/comments/${id}/`, {
      like
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function deleteComment({ post_id, id }) {
  try {
    const response = await api.delete(`/posts/${post_id}/comments/${id}`);
    return response;
  } catch (error) {
    return error.response;
  }
}
