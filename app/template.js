"use client";

import React, { Children } from 'react'
import Navbar from '@/components/Navbar'
import { useState } from 'react';
import { useEffect, createContext } from 'react';
import { useSession } from "next-auth/react"
import { UserProvider } from './UserContext';
import PuzzleSetWrapper from './puzzleSetWrapper';


const Template = ({ children }) => {
  const [username, setUsername] = useState("not logged in ");
  const [fullName, setFullName] = useState("not logged in ");
  const [userId, setuserId] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //Fetching account data
  const { data: session, status } = useSession()
  useEffect(() => {
    if (status === "authenticated") {
      setIsLoggedIn(true);
      setuserId(session.user.id)
      setUsername(session.user.username)
      setFullName(session.user.fullName)
      // console.log(session.user.id)

      // console.log("Session User: ", session);
    }
    // console.log("Session Status: ", status)
    // console.log(username);


  }, [status]);
  return (
    <div className='template min-h-screen'>
      <UserProvider>
        <Navbar fullName={fullName} isLoggedIn={isLoggedIn}></Navbar>
        <main className="flex min-h-screen min-w-full flex-col items-center">

        {/* {userId} */}
        {children}
        </main>
      </UserProvider>

    </div>
  )
}

export default Template
