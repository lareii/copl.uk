'use client';

import { useEffect } from 'react';
import useLoadingStore from '@/stores/loading';
import useAuthStore from '@/stores/auth';
import { me } from '@/lib/api/me';

export default function AuthProvider({ children }) {
  const setUser = useAuthStore((state) => state.setUser);
  const setLoading = useLoadingStore((state) => state.setLoading);

  useEffect(
    () => {
      const fetchUser = async () => {
        const response = await me();
        if (response) {
          setUser(response.data.user);
          setLoading(false);
        }
      };

      fetchUser();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return children;
}
