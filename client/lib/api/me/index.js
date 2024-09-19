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

export async function getFeed(limit, offset) {
  try {
    const response = await api.get('/me/feed', { params: { limit, offset } });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function getNotifications(limit, offset) {
  try {
    const response = await api.get('/me/notifications', {
      params: { limit, offset }
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function getUnreadNotificationsCount() {
  try {
    const response = await api.get('/me/notifications/unread');
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function updateNotification({ id, read }) {
  try {
    const response = await api.patch(`/me/notifications/${id}`, { read });
    return response;
  } catch (error) {
    return error.response;
  }
}
