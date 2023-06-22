"use client";

import Navbar from '@/components/Navbar'
import MainBody from '@/components/MainBody'
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import  Link  from "next/link";
// import { Router } from 'react-router-dom';

// async function fetchAccountData() {
//     const url = 'https://lichess.org/api/account';
//     const token = 'lip_LP9wEc1crYktsAD0FYQV';
//     //console.log('count')
//     try {
//         const response = await axios.get(url, {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         });
//         //console.log('api end')
//         return response;
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         console.log('error')
//         return null;
//     }
// }
async function fetchPuzzleDashboard() {
    const days = 30;
    const url = `https://lichess.org/api/puzzle/dashboard/30`;
    const token = 'lip_LP9wEc1crYktsAD0FYQV';
    //console.log('dashboard api')
    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        //console.log('dashboard api end')
        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
        console.log('error')
        return null;
    }
}

export default function Home() {
    // const [userData, setUserData] = useState(null);
    // const [username, setUsername] = useState("not logged in ");
    // const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [puzzleDashboard, setPuzzleDashboard] = useState(null);

    // //Fetching account data
    // useEffect(() => {
    //     fetchAccountData()
    //         .then(response => {
    //             if (response) {
    //                 //console.log('Data:', response.data.username);
    //                 setUserData(response.data);
    //                 setUsername(response.data.username);
    //                 //console.log('username:', username)
    //                 setIsLoggedIn(true);
    //                 //console.log('approached');
    //             }
    //             else {
    //                 setUsername('default');
    //                 //console.log('not approached')
    //             }
    //         });
    // }, []);
    //Fetching Puzzle Data
    useEffect(() => {
        fetchPuzzleDashboard()
            .then(response => {
                if (response) {
                    //console.log('Dashboard:', response.data);
                    setPuzzleDashboard(response.data);
                    //console.log(puzzleDashboard);
                }
                else {
                    setUsername('default');
                    console.log('not approached')
                }
            });
    }, []);
    return (

        <main className="flex min-h-screen min-w-full flex-col items-center">
            {/* <h1>{isLoggedIn}</h1> */}
            {/* <Navbar username={username} isLoggedIn={isLoggedIn}></Navbar> */}
            {/* {puzzleDashboard.global.nb} */}
            <MainBody puzzleDashboard={puzzleDashboard}></MainBody>
            {/* <Router> */}
            <Link href="/login">
                Login

            </Link>
            <Link href="/signup">
                Signup
            </Link>
            {/* </Router> */}
        </main>
    )
}
