"use client"
import React from 'react'
import { useState, useEffect } from 'react';
import  Link  from 'next/link';
import { useSession } from "next-auth/react"




const PuzzleSets = () => {
    const [userId, setUserId] = useState("");
    const { data: session, status } = useSession()
    const [userData, setUserData] = useState(null);
    const [isRetrieved, setIsRetrieved] = useState(false);
    // setUserId(session.user.id)
    // console.log(session.user.id)
    const fetchData = async (e) => {
        const response = await fetch(`/api/fetchUserPuzzle?userId=${session.user.id}`)
        if (response.ok) {
        setUserData(await response.json());
        setIsRetrieved(true);
        }
        else{
            setIsRetrieved(false);
        }
    }
    
    useEffect(() => {
     fetchData();
    },[])
    
    return (
        <div>
            <section className="text-gray-600 body-font min-h-screen">
                <div className="container px-5 mx-auto">
                    <div className="flex flex-wrap -m-4">
                        <div className="p-4 md:w-1/4 sm:w-1/2 w-1/2">
                            <Link href="/gameplay?set=1">
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
                            <Link href="/gameplay?set=2">
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
                            <Link href="/gameplay?set=3">
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
                            <Link href="/gameplay?set=4">
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
                            <Link href="/gameplay?set=5">
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
                            <Link href="/gameplay?set=6">
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
                            <Link href="/gameplay?set=7">
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
                            <Link href="/gameplay?set=8">
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
                            <Link href="/gameplay?set=9">
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
                            <Link href="/gameplay?set=10">
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

export default PuzzleSets
