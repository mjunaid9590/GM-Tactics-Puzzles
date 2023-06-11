"use client"
import React from 'react'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import axios from 'axios';
import { useState } from 'react';

async function makeApiRequest() {
    const url = 'https://lichess.org/api/account';
    const token = 'lip_LP9wEc1crYktsAD0FYQV';

    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}


const main = () => {
    const [userData, setUserData] = useState(null);
    const [username, setUsername] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    makeApiRequest()
        .then(response => {
            if (response) {
                console.log('Data:', response.data);
                setUserData(response.data);
                setUsername(userData.username);
                setIsLoggedIn(true);
            }
        });
    return (
        <div>
            <Navbar></Navbar>
        </div>
    )
}

export default main
