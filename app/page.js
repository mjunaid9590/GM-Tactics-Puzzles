"use client";

import MainBody from '@/components/MainBody'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';



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
    const [puzzleDashboard, setPuzzleDashboard] = useState(null);
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
                    // setUsername('default');
                    console.log('not approached')
                }
            });
    }, []);
    // useEffect(() => {
    //     if (!isLoading && !isAuthenticated) {
    //       signIn();
    //     }
    //   }, [isLoading, isAuthenticated]);
    if (isLoading) {
        return <div>Loading...</div>;
      }
    if(isAuthenticated) {
    return (

        <main className="flex min-h-screen min-w-full flex-col items-center">
            
            <MainBody puzzleDashboard={puzzleDashboard}></MainBody>
        </main>
    )
    }
    else{
        <main className="flex min-h-screen min-w-full flex-col items-center">
            Loading
        </main>
    }
    
}
