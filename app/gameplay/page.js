"use client"
import React, { useEffect } from 'react'
// import ChessboardComponent from '../../components/Chessground';
import ChessBoard from '../../components/ChessBoard';
import { TbPlayerTrackNext } from 'react-icons/tb'
import { useState, useContext, useRef } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';
import { useSearchParams, useRouter } from 'next/navigation'

async function fetchPuzzle(set, serialNo) {
    const url = `/api/fetchPuzzle?set=${set}&&serialNo=${serialNo}`;

    try {
        const response = await axios.get(url);
        return response;
    }
    catch (error) {
        console.error('Error fetching data:', error);
        console.log('error')
        return null;
    }
}
async function fetchUserPuzzle(userId, repeat, set) {
    const url = `/api/fetchNewPuzzle?userId=${userId}&&set=${set}&&repeat=${repeat}`;

    try {
        const response = await axios.get(url);
        // console.log("response: ", response)
        return response;
    }
    catch (error) {
        console.error('Error fetching data:', error);
        console.log('error')
        return null;
    }
}


const Page = () => {
    const { userId } = useContext(UserContext);
    const router = useRouter();

    const [moveResult, setMoveResult] = useState(null);
    const [isCorrect, setIsCorrect] = useState(false);
    const [isWon, setIsWon] = useState(false);
    const [isLost, setIsLost] = useState(false);
    const [fenData, setFenData] = useState(null);
    const [puzzleMoves, setPuzzleMoves] = useState(null)
    const [thisUserId, setThisUserId] = useState(null);
    const [currentPlayer, setCurrentPlayer] = useState("Loading")
    const [serialNo, setSerialNo] = useState('');
    const [userPuzzleId, setUserPuzzleId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [nextPuzzle, setNextPuzzle] = useState(null);
    useEffect(() => {
        setNextPuzzle(true);
    })
    const Q1Ref = useRef();
    const Q2_1Ref = useRef();
    const Q2_2Ref = useRef();
    const Q3Ref = useRef();



    // const [setNo, setSetNo] = useState(null);
    const searchParams = useSearchParams()
    // console.log("Router: ", router.query)
    const set = searchParams.get('set')
    // console.log("set", typeof set)

    const setCurrentPlayerFromFEN = (fen) => {
        const fenParts = fen.split(' ');
        const activePlayer = fenParts[1]; // Second element in the FEN string

        if (activePlayer === 'w') {
            setCurrentPlayer("Black")
        } else if (activePlayer === 'b') {
            setCurrentPlayer("White")
        }

        // Handle invalid FEN notation
        return null;
    }

    useEffect(() => {
        if (userId != '') {

            setThisUserId(userId)
            // console.log("User id in gameplay: ", userId)
            const setNo = Number(set)
            // console.log(setNo)
            fetchUserPuzzle(userId, false, setNo)
                .then(response => {
                    setUserPuzzleId(response.data._id);
                    console.log(response.data._id);
                    fetchPuzzle(response.data.puzzleSet, response.data.serialNo)
                        .then(puzzleResponse => {
                            if (puzzleResponse) {
                                // console.log('Dashboard:', response.data);
                                // setPuzzleData(response.data);
                                // console.log("Response Data", response.data[0].FEN);
                                // const chess = new Chess(response.data[0].FEN)
                                setIsLoading(false);
                                console.log("Loading false")
                                setFenData(puzzleResponse.data[0].FEN);
                                setCurrentPlayerFromFEN(puzzleResponse.data[0].FEN)
                                const moves = puzzleResponse.data[0].Moves;
                                setPuzzleMoves(moves.split(' '));
                                setSerialNo(puzzleResponse.data[0].serialNo)

                                // setGame(chess);
                                // setCurrentPosition(chess.fen());


                            }
                            else {
                                console.log('not approached')
                            }
                        });
                })
        }
    }, [userId]);


    const handleMessage = (childMessage) => {
        setMoveResult(childMessage); //Value: "correct", "Won", ""Lost"
        console.log(childMessage);
    };

    const puzzleCompleted = async (isWon) => {
        console.log("PuzzleCompleted function")
        const response = await fetch('/api/updateUserPuzzleGame', {
            method: 'POST',
            header: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ isWon, userPuzzleId }),
        });
        console.log("Response", response)
    }

    const formSubmit = async () => {
        console.log("Form Submit function")
        const q1Value = Q1Ref.current.value;
        const q2_1Value = Q2_1Ref.current.value;
        const q2_2Value = Q2_2Ref.current.value;
        const q3Value = Q3Ref.current.value;
        const response = await fetch('/api/updateUserPuzzleForm', {
            method: 'POST',
            header: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ q1Value, q2_1Value, q2_2Value, q3Value, userPuzzleId }),
        });
        // setNextPuzzle(!nextPuzzle)
        router.reload();

    }

    useEffect(() => {
        if (moveResult == "correct") {
            setIsCorrect(true);
            setIsWon(false);
            setIsLost(false);
        }
        else if (moveResult == "won") {
            setIsCorrect(false);
            setIsWon(true);
            setIsLost(false);
            puzzleCompleted(true)
        }
        else if (moveResult == "lost") {
            setIsCorrect(false);
            setIsWon(false);
            setIsLost(true);
            puzzleCompleted(false)
        }
        else {
            setIsCorrect(false);
            setIsWon(false);
            setIsLost(false);
        }
    }, [moveResult])

    return (
        <div>
            {/* {typeof userId} */}
            <hr />
            <section className="text-gray-600 body-font relative">
                <div className="container px-5 py-4 mx-auto flex sm:flex-nowrap flex-wrap">
                    <div className=" border-gray-400 flex mx-auto relative">
                        <section className="text-gray-600 body-font">
                            {!isLoading && <div className="px-auto rounded-lg mt-6 sm:mt-0 lg:px-10">
                                <section className="text-gray-600 body-font">
                                    <div className="container mx-auto flex flex-col">
                                        <h2 className="text-md text-indigo-500 tracking-widest font-medium title-font mb-1">Puzzle No: {serialNo}/1000</h2>
                                        <h1 className="md:text-3xl text-2xl font-medium title-font text-gray-900">Find Best Move for "{currentPlayer}"</h1>


                                    </div>
                                </section>
                                {/* <ChessboardComponent serialNo={2} set={1} onMessage={handleMessage} /> */}
                                <div className=" border-gray-300">
                                    {(fenData && puzzleMoves) &&
                                        <ChessBoard fenData={fenData} puzzleMoves={puzzleMoves} onMessage={handleMessage} />
                                    }
                                </div>
                            </div>}
                            {
                                isLoading && <h1 className='text-5xl mt-5'>Loading...</h1>
                            }
                        </section>

                    </div>
                    <div className="lg:w-1/2 md:w-1/2 flex flex-col px-4 md:ml-auto w-full md:py-4 mt-8 md:mt-0">

                        <h2 className="inline text-gray-900 text-2xl mb-1 font-medium title-font">
                            Questions
                        </h2>
                        <p className="inline leading-relaxed mb-2 text-gray-600">
                            Answer following questions while finding your best move.
                        </p>
                        <div className="relative mb-2">
                            <label htmlFor="name" className="leading-7 text-lg text-gray-600">
                                General observations about the position and placement of pieces?
                                <br />
                                <p className='text-sm'>

                                    (undefine pieces, potential forks and skewers etc..)
                                </p>
                            </label>
                            <input
                                ref={Q1Ref}
                                type="text"
                                id="name"
                                name="name"
                                className="w-full bg-none mt-2 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                        </div>
                        <div className="flex w-full sm:flex-row flex-col px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
                            <div className="relative flex-grow w-full">
                                <label htmlFor="full-name" className="leading-7 text-lg text-gray-600">
                                    Candatide Move # 1
                                </label>
                                <input
                                    ref={Q2_1Ref}
                                    type="text"
                                    id="full-name"
                                    name="full-name"
                                    className="w-full bg-none mt-2 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                            <div className="relative flex-grow w-full">
                                <label htmlFor="email" className="leading-7 text-lg text-gray-600">
                                    Candatide Move # 2
                                </label>
                                <input
                                    ref={Q2_2Ref}
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="w-full bg-none mt-2 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>

                        </div>
                        <div className="relative mb-2 mt-2">
                            <label htmlFor="name" className="leading-7 text-lg text-gray-600">
                                Calculation of full line with different variations.
                                <br />
                                <p className='text-sm'>
                                    (try to visualize as far as possible, try to come up with best response for your opponent as well)
                                </p>
                            </label>
                            <input
                                ref={Q3Ref}
                                type="text"
                                id="name"
                                name="name"
                                className="w-full bg-none mt-2 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                        </div>

                        <button disabled={isLoading} onClick={formSubmit} className="text-white bg-indigo-500 border-0 py-2 px-6 mt-2 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                            Submit & Proceed to Next
                        </button>
                        {/* <p className="text-xs text-gray-500 mt-3">
                            Ratings will be updated after you submit the puzzle.
                        </p> */}
                        <div className='mt-4 w-3/4'>
                            {
                                isWon &&
                                <div className="bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded relative" role="alert">
                                    <strong className="font-bold">Success! &nbsp;</strong>
                                    <span className="block sm:inline">Your Solution is Correct.</span>
                                    <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                                        <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                                    </span>
                                </div>
                            }
                            {
                                isCorrect &&
                                <div className="bg-blue-100 border  text-blue-700 px-4 py-3 rounded relative" role="alert">
                                    <strong className="font-bold">Correct! &nbsp;</strong>
                                    <span className="block sm:inline">You did a good move, keep going.</span>
                                    <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                                        <svg className="fill-current h-6 w-6 text-blue-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                                    </span>
                                </div>
                            }
                            {
                                isLost &&
                                <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
                                    <strong className="font-bold">Incorrect Solution! &nbsp;</strong>
                                    <span className="block sm:inline">Try your luck next time.</span>
                                    <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                                        <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                                    </span>
                                </div>
                            }
                        </div>
                    </div>

                </div>

            </section>

        </div>
    )
}

export default Page