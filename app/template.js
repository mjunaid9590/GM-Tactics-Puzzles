"use client";

import React from 'react'
import Navbar from '@/components/Navbar'
import MainBody from '@/components/MainBody'
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import  Link  from "next/link";
import { useSession } from "next-auth/react"


// async function fetchAccountData() {
//     // const url = 'https://lichess.org/api/account';
//     // const token = 'lip_LP9wEc1crYktsAD0FYQV';
//     //console.log('count')
//     // const { data: session, status } = useSession()

//     // try {
//     //     const response = await axios.get(url, {
//     //         headers: {
//     //             Authorization: `Bearer ${token}`
//     //         }
//     //     });
//     //     //console.log('api end')
//     //     return response;
//     // } catch (error) {
//     //     console.error('Error fetching data:', error);
//     //     console.log('error')
//     //     return null;
//     // }
// }
const Template = ({children}) => {
    const [username, setUsername] = useState("not logged in ");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    //Fetching account data
    const { data: session, status } = useSession()
    useEffect(() => {
      if (status === "authenticated") {
        setIsLoggedIn(true);
        setUsername(session.user.username)
        // console.log("Session User: ", session);
    }
    console.log("Session Status: ", status)
    console.log(username);
      
    
     }, [status]);
    
  return (
    <div>
        <Navbar username={username} isLoggedIn={isLoggedIn}></Navbar>
      {children}
    </div>
  )
}

export default Template
