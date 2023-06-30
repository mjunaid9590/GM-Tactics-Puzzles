import { useEffect } from 'react';
import { useSession, getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const redirectTo = '/login';
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Check if the user is authenticated
    const isAuthenticated = session?.status === 'authenticated';

    // Redirect to the login page if the user is not authenticated
    if (!isAuthenticated && router.pathname !== redirectTo) {
      router.push(redirectTo);
    }
  }, [session, router, redirectTo]);

  return { session, status };
}
