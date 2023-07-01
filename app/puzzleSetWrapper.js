"use client"

import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext';


const PuzzleSetWrapper = ({ children }) => {
    const { loginStatus } = useContext(UserContext);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();
 
    useEffect(() => {
        console.log("Login Status Changed")
        if (loginStatus === 'authenticated') {
            // setIsLoading(false);
            setIsAuthenticated(true);
            // console.log("authenticated")
        } else if (loginStatus === 'unauthenticated') {
            console.log("session is unauthenticated")
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

export default PuzzleSetWrapper
