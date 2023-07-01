"use client"

import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext';


const Layout = ({ children }) => {
    const { loginStatus } = useContext(UserContext);

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    //   const [isLoading, setIsLoading] = useState(false);
    //   // const { session, status, isAuthenticated } = useAuth();
    //   const { data: session, status } = useSession()
    const router = useRouter();
    // console.log("isLoading", isLoading)
    useEffect(() => {
        if (loginStatus === 'authenticated') {
            // setIsLoading(false);
            setIsAuthenticated(true);
            console.log("authenticated")
        } else if (loginStatus === 'unauthenticated') {
            setIsAuthenticated(false);
            router.push('/login');
        }
    }, [loginStatus]);

    if (isAuthenticated) {

        return (
            <div>
                {children}
            </div>
        )
    }
    else {
        return <div>Loading...</div>
    }
}

export default Layout
