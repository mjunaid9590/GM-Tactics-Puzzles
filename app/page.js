"use client";

// import axios from 'axios';
// import { useState, useEffect } from 'react';
// import { signIn, signOut, useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';



// async function fetchPuzzleDashboard() {
//     const days = 30;
//     const url = `https://lichess.org/api/puzzle/dashboard/30`;
//     const token = 'lip_LP9wEc1crYktsAD0FYQV';
//     //console.log('dashboard api')
//     try {
//         const response = await axios.get(url, {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         });
//         //console.log('dashboard api end')
//         return response;
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         console.log('error')
//         return null;
//     }
// }
// export default function Home() {
//     const router = useRouter();

//     router.push('/puzzleSets')
//     const [puzzleDashboard, setPuzzleDashboard] = useState(null);
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);
//     // const { session, status, isAuthenticated } = useAuth();
//     const { data: session, status } = useSession()

//     useEffect(() => {
//         if (status === 'authenticated') {
//           setIsLoading(false);
//           setIsAuthenticated(true);
//           console.log("authenticated")
//         } else if (status === 'unauthenticated') {
//             setIsAuthenticated(false);
//           router.push('/login');
//         }
//       }, [status, router]);

//     //Fetching Puzzle Data
//     useEffect(() => {
//         fetchPuzzleDashboard()
//             .then(response => {
//                 if (response) {
//                     //console.log('Dashboard:', response.data);
//                     setPuzzleDashboard(response.data);
//                     //console.log(puzzleDashboard);
//                 }
//                 else {
//                     // setUsername('default');
//                     console.log('not approached')
//                 }
//             });
//     }, []);
//     // useEffect(() => {
//     //     if (!isLoading && !isAuthenticated) {
//     //       signIn();
//     //     }
//     //   }, [isLoading, isAuthenticated]);
//     if (isLoading) {
//         return <div>Loading...</div>;
//       }
//     if(isAuthenticated) {
//     return (

//         <main className="flex min-h-screen min-w-full flex-col items-center">

//             <MainBody puzzleDashboard={puzzleDashboard}></MainBody>
//         </main>
//     )
//     }
//     else{
//         <main className="flex h-screen min-h-screen min-w-full flex-col items-center">
//             Loading
//         </main>
//     }

// }
// "use client"
import React from 'react'
import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { UserContext } from './UserContext';
import { useRouter } from 'next/navigation';
import PuzzleSetWrapper from './puzzleSetWrapper';



const PuzzleSets = () => {

    const { userId, loginStatus } = useContext(UserContext);
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

    const [thisUserId, setThisUserId] = useState("");
    // const { data: session, status } = useSession()
    const [userData, setUserData] = useState(null);
    const [isRetrieved, setIsRetrieved] = useState(false);
    
    
    const fetchData = async (e) => {
        console.log("user id: ", userId)
        const response = await fetch(`/api/fetchUserPuzzle?userId=${userId}`)
        if (response.ok) {
            setUserData(await response.json());
            setIsRetrieved(true);
        }
        else {
            setIsRetrieved(false);
        }
    }

    useEffect(() => {
        if(userId != ''){
            fetchData();

        }
    }, [userId])
    if (isAuthenticated) {
    return (
                <div>
                    <section className="text-gray-600 body-font min-h-screen">
                        <div className="container px-5 mx-auto">
                            <div className="flex flex-wrap -m-4">
                                <div className="p-4 md:w-1/4 sm:w-1/2 w-1/2">
                                    <Link href={`/gameplay?set=1&&isRepeat=${(userData) && (userData[1].attempted >= userData[1].total)}`}>
                                        <div className=" cursor-pointer border-2 border-gray-200 px-6 py-3 rounded-lg bg-gray-300 hover:bg-gray-400">

                                            <h2 className="title-font text-3xl text-gray-900">Set 1</h2>
                                            <hr className='bg-gray-500 border-gray-500' />
                                            <p className="leading-relaxed text-lg">Total Puzzles: {userData && userData[1].total}</p>
                                            <p className="leading-relaxed text-lg">Attempted: {userData && userData[1].attempted}</p>
                                            <p className="leading-relaxed text-lg">Solved: {userData && userData[1].solved}</p>
                                            {/* <p className="leading-relaxed text-lg">Avg Rating: ---</p> */}
                                        </div>
                                    </Link>
                                </div>
                                <div className="p-4 md:w-1/4 sm:w-1/2 w-1/2">
                                    <Link href={`/gameplay?set=2&&isRepeat=${(userData) && (userData[2].attempted >= userData[2].total)}`}>
                                        <div className="cursor-pointer hover:bg-teal-400 border-2 border-gray-200 px-6 py-3 rounded-lg bg-teal-300">

                                            <h2 className="title-font text-3xl text-gray-900">Set 2</h2>
                                            <hr className='bg-gray-500 border-gray-500' />
                                            <p className="leading-relaxed text-lg">Total Puzzles: {userData && userData[2].total}</p>
                                            <p className="leading-relaxed text-lg">Attempted: {userData && userData[2].attempted}</p>
                                            <p className="leading-relaxed text-lg">Solved: {userData && userData[2].solved}</p>
                                            {/* <p className="leading-relaxed text-lg">Avg Rating: ---</p> */}
                                        </div>
                                    </Link>
                                </div>
                                <div className="p-4 md:w-1/4 sm:w-1/2 w-1/2">
                                    <Link href={`/gameplay?set=3&&isRepeat=${(userData) && (userData[3].attempted >= userData[3].total)}`}>
                                        <div className="cursor-pointer hover:bg-yellow-400 border-2 border-gray-200 px-6 py-3 rounded-lg bg-yellow-300">

                                            <h2 className="title-font text-3xl text-gray-900">Set 3</h2>
                                            <hr className='bg-gray-500 border-gray-500' />
                                            <p className="leading-relaxed text-lg">Total Puzzles: {userData && userData[3].total}</p>
                                            <p className="leading-relaxed text-lg">Attempted: {userData && userData[3].attempted}</p>
                                            <p className="leading-relaxed text-lg">Solved: {userData && userData[3].solved}</p>
                                            {/* <p className="leading-relaxed text-lg">Avg Rating: ---</p> */}
                                        </div>
                                    </Link>
                                </div>
                                <div className="p-4 md:w-1/4 sm:w-1/2 w-1/2">
                                    <Link href={`/gameplay?set=4&&isRepeat=${(userData) && (userData[4].attempted >= userData[4].total)}`}>
                                        <div className="cursor-pointer hover:bg-orange-400 border-2 border-gray-200 px-6 py-3 rounded-lg bg-orange-300 ">

                                            <h2 className="title-font text-3xl text-gray-900">Set 4</h2>
                                            <hr className='bg-gray-500 border-gray-500' />
                                            <p className="leading-relaxed text-lg">Total Puzzles: {userData && userData[4].total}</p>
                                            <p className="leading-relaxed text-lg">Attempted: {userData && userData[4].attempted}</p>
                                            <p className="leading-relaxed text-lg">Solved: {userData && userData[4].solved}</p>
                                            {/* <p className="leading-relaxed text-lg">Avg Rating: ---</p> */}
                                        </div>
                                    </Link>
                                </div>
                                <div className="p-4 md:w-1/4 sm:w-1/2 w-1/2">
                                    <Link href={`/gameplay?set=5&&isRepeat=${(userData) && (userData[5].attempted >= userData[5].total)}`}>
                                        <div className="cursor-pointer hover:bg-red-400 border-2 border-gray-200 px-6 py-3 rounded-lg bg-red-300 ">

                                            <h2 className="title-font text-3xl text-gray-900">Set 5</h2>
                                            <hr className='bg-gray-500 border-gray-500' />
                                            <p className="leading-relaxed text-lg">Total Puzzles: {userData && userData[5].total}</p>
                                            <p className="leading-relaxed text-lg">Attempted: {userData && userData[5].attempted}</p>
                                            <p className="leading-relaxed text-lg">Solved: {userData && userData[5].solved}</p>
                                            {/* <p className="leading-relaxed text-lg">Avg Rating: ---</p> */}
                                        </div>
                                    </Link>
                                </div>
                                <div className="p-4 md:w-1/4 sm:w-1/2 w-1/2">
                                    <Link href={`/gameplay?set=6&&isRepeat=${(userData) && (userData[6].attempted >= userData[6].total)}`}>
                                        <div className="cursor-pointer hover:bg-pink-400 border-2 border-gray-200 px-6 py-3 rounded-lg bg-pink-300">

                                            <h2 className="title-font text-3xl text-gray-900">Set 6</h2>
                                            <hr className='bg-gray-500 border-gray-500' />
                                            <p className="leading-relaxed text-lg">Total Puzzles: {userData && userData[6].total}</p>
                                            <p className="leading-relaxed text-lg">Attempted: {userData && userData[6].attempted}</p>
                                            <p className="leading-relaxed text-lg">Solved: {userData && userData[6].solved}</p>
                                            {/* <p className="leading-relaxed text-lg">Avg Rating: ---</p> */}
                                        </div>
                                    </Link>
                                </div>
                                <div className="p-4 md:w-1/4 sm:w-1/2 w-1/2">
                                    <Link href={`/gameplay?set=7&&isRepeat=${(userData) && (userData[7].attempted >= userData[7].total)}`}>
                                        <div className="cursor-pointer hover:bg-purple-400 border-2 border-gray-200 px-6 py-3 rounded-lg bg-purple-300 ">

                                            <h2 className="title-font text-3xl text-gray-900">Set 7</h2>
                                            <hr className='bg-gray-500 border-gray-500' />
                                            <p className="leading-relaxed text-lg">Total Puzzles: {userData && userData[7].total}</p>
                                            <p className="leading-relaxed text-lg">Attempted: {userData && userData[7].attempted}</p>
                                            <p className="leading-relaxed text-lg">Solved: {userData && userData[7].solved}</p>
                                            {/* <p className="leading-relaxed text-lg">Avg Rating: ---</p> */}
                                        </div>
                                    </Link>
                                </div>
                                <div className="p-4 md:w-1/4 sm:w-1/2 w-1/2">
                                    <Link href={`/gameplay?set=8&&isRepeat=${(userData) && (userData[8].attempted >= userData[8].total)}`}>
                                        <div className="cursor-pointer hover:bg-indigo-400 border-2 border-gray-200 px-6 py-3 rounded-lg bg-indigo-300 ">

                                            <h2 className="title-font text-3xl text-gray-900">Set 8</h2>
                                            <hr className='bg-gray-500 border-gray-500' />
                                            <p className="leading-relaxed text-lg">Total Puzzles: {userData && userData[8].total}</p>
                                            <p className="leading-relaxed text-lg">Attempted: {userData && userData[8].attempted}</p>
                                            <p className="leading-relaxed text-lg">Solved: {userData && userData[8].solved}</p>
                                            {/* <p className="leading-relaxed text-lg">Avg Rating: ---</p> */}
                                        </div>
                                    </Link>
                                </div>
                                <div className="p-4 md:w-1/4 sm:w-1/2 w-1/2">
                                    <Link href={`/gameplay?set=9&&isRepeat=${(userData) && (userData[9].attempted >= userData[9].total)}`}>
                                        <div className="cursor-pointer hover:bg-green-400 border-2 border-gray-200 px-6 py-3 rounded-lg bg-green-300 ">

                                            <h2 className="title-font text-3xl text-gray-900">Set 9</h2>
                                            <hr className='bg-gray-500 border-gray-500' />
                                            <p className="leading-relaxed text-lg">Total Puzzles: {userData && userData[9].total}</p>
                                            <p className="leading-relaxed text-lg">Attempted: {userData && userData[9].attempted}</p>
                                            <p className="leading-relaxed text-lg">Solved: {userData && userData[9].solved}</p>
                                            {/* <p className="leading-relaxed text-lg">Avg Rating: ---</p> */}
                                        </div>
                                    </Link>
                                </div>
                                <div className="p-4 md:w-1/4 sm:w-1/2 w-1/2">
                                    <Link href={`/gameplay?set=10&&isRepeat=${(userData) && (userData[10].attempted >= userData[10].total)}`}>
                                        <div className="cursor-pointer hover:bg-blue-400 border-2 border-gray-200 px-6 py-3 rounded-lg bg-blue-300 ">

                                            <h2 className="title-font text-3xl text-gray-900">Set 10</h2>
                                            <hr className='bg-gray-500 border-gray-500' />
                                            <p className="leading-relaxed text-lg">Total Puzzles: {userData && userData[10].total}</p>
                                            <p className="leading-relaxed text-lg">Attempted: {userData && userData[10].attempted}</p>
                                            <p className="leading-relaxed text-lg">Solved: {userData && userData[10].solved}</p>
                                            {/* <p className="leading-relaxed text-lg">Avg Rating: ---</p> */}
                                        </div>
                                    </Link>
                                </div>

                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            </div>

                        </div>
                    </section>

                </div>
          
    
    )
    }
    else {
        return <div>Loading...</div>
    }
}

export default PuzzleSets
