"use client"

import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const Layout = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const { session, status, isAuthenticated } = useAuth();
  const { data: session, status } = useSession()
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      setIsLoading(false);
      setIsAuthenticated(true);
      console.log("authenticated")
    } else if (status === 'unauthenticated') {
      setIsAuthenticated(false);
      router.push('/login');
    }
  }, [status, router]);
  if (isLoading) {
    return <div>Loading</div>
  }
  if (isAuthenticated) {

    return (
      <div>
        {children}
      </div>
    )
  }
  else {
    return <div>Loading</div>
  }
}

export default Layout
