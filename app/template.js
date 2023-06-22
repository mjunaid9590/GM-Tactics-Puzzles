"use client";

import React from 'react'
import Navbar from '@/components/Navbar'
import MainBody from '@/components/MainBody'
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import  Link  from "next/link";

async function fetchAccountData() {
    const url = 'https://lichess.org/api/account';
    const token = 'lip_LP9wEc1crYktsAD0FYQV';
    //console.log('count')
    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        //console.log('api end')
        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
        console.log('error')
        return null;
    }
}
const Template = ({children}) => {
    const [userData, setUserData] = useState(null);
    const [username, setUsername] = useState("not logged in ");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [puzzleDashboard, setPuzzleDashboard] = useState(null);

    //Fetching account data
    useEffect(() => {
        fetchAccountData()
            .then(response => {
                if (response) {
                    //console.log('Data:', response.data.username);
                    setUserData(response.data);
                    setUsername(response.data.username);
                    //console.log('username:', username)
                    setIsLoggedIn(true);
                    //console.log('approached');
                }
                else {
                    setUsername('default');
                    //console.log('not approached')
                }
            });
    }, []);
    
  return (
    <div>
        <Navbar username={username} isLoggedIn={isLoggedIn}></Navbar>
      {children}
    </div>
  )
}

export default Template
