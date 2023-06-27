"use client";

import React from 'react'
import Navbar from '@/components/Navbar'
import { useState } from 'react';
import { useEffect } from 'react';
import { useSession } from "next-auth/react"

const Template = ({children}) => {
    const [username, setUsername] = useState("not logged in ");
    const [fullName, setFullName] = useState("not logged in ");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    //Fetching account data
    const { data: session, status } = useSession()
    useEffect(() => {
      if (status === "authenticated") {
        setIsLoggedIn(true);
        setUsername(session.user.username)
        setFullName(session.user.fullName)
        
        // console.log("Session User: ", session);
    }
    // console.log("Session Status: ", status)
    // console.log(username);
      
    
     }, [status]);
    
  return (
    <div>
        <Navbar fullName={fullName} isLoggedIn={isLoggedIn}></Navbar>
      {children}
    </div>
  )
}

export default Template
