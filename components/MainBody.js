import React, { useEffect, useState } from 'react'

// import { Chessboard } from "react-chessboard";
import ChessboardComponent from './Chessground';
import { TbPlayerTrackNext } from 'react-icons/tb'

const MainBody = (puzzleObject) => {
    const [totalPlayed, setTotalPlayed] = useState("Loading");
    const [totalWins, setTotalWins] = useState("Loading");
    const [performance, setPerformance] = useState("Loading");
    const [avgRating, setAvgRating] = useState("Loading");
    useEffect(() => {
        // const puzzleDashboard = puzzleObject.puzzleDashboard;
        //console.log(puzzleObject.puzzleDashboard);
        if (puzzleObject.puzzleDashboard) {
            setTotalPlayed(puzzleObject.puzzleDashboard.global.nb);
            setTotalWins(parseInt(puzzleObject.puzzleDashboard.global.firstWins) + parseInt(puzzleObject.puzzleDashboard.global.replayWins));
            setPerformance(puzzleObject.puzzleDashboard.global.performance);
            setAvgRating(puzzleObject.puzzleDashboard.global.puzzleRatingAvg);
        }
    }, [puzzleObject])

    return (
        <div>
            {/* {puzzleDashboard.days} */}
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-10 mx-auto flex flex-wrap">
                    <div className="flex flex-wrap -mx-4 mt-auto mb-auto lg:w-1/2 sm:w-2/3 content-start sm:pr-10">
                        <div className="w-full sm:p-4 px-4 mt-0">
                            <h1 className="title-font font-medium text-3xl mb-2 text-gray-900">
                                Puzzles Dashboard
                            </h1>
                            <div className="leading-relaxed">
                                (Last 30 days)
                            </div>
                        </div>
                        <section className="text-gray-600 body-font">
                            <div className="container px-5 mx-auto">
                                <div className="flex flex-wrap -m-4 text-center">
                                    <div className="p-4 md:w-1/2 sm:w-1/2 w-full">
                                        <div className="border-2 border-gray-200 px-4 py-6 rounded-lg bg-gray-300">

                                            <h2 className="title-font font-medium text-3xl text-gray-900">{totalPlayed}</h2>
                                            <p className="leading-relaxed text-lg">Played</p>
                                        </div>
                                    </div>
                                    <div className="p-4 md:w-1/2 sm:w-1/2 w-full">
                                        <div className="border-2 border-gray-200 px-4 py-6 rounded-lg bg-green-400">

                                            <h2 className="title-font font-medium text-3xl text-gray-900">{totalWins}</h2>
                                            <p className="leading-relaxed text-lg">Solved</p>
                                        </div>
                                    </div>
                                    <div className="p-4 md:w-1/2 sm:w-1/2 w-full">
                                        <div className="border-2 border-gray-200 px-4 py-6 rounded-lg bg-red-300">

                                            <h2 className="title-font font-medium text-3xl text-gray-900">{performance}</h2>
                                            <p className="leading-relaxed text-lg">Performance</p>
                                        </div>
                                    </div>
                                    <div className="p-4 md:w-1/2 sm:w-1/2 w-full">
                                        <div className="border-2 border-gray-200 px-4 py-6 rounded-lg bg-blue-400 ">

                                            <h2 className="title-font font-medium text-3xl text-gray-900">{avgRating}</h2>
                                            <p className="leading-relaxed text-lg">Avg Rating</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                    </div>
                    <div className="lg:w-1/2 sm:w-1/3 px-auto rounded-lg overflow-hidden mt-6 sm:mt-0 lg:px-10">
                        <section className="text-gray-600 body-font">
                            <div className="container mx-auto flex flex-col">
                                <div className="md:pr-10 md:mb-1 mb-6 pr-0 w-full md:w-auto md:text-left text-center">
                                    <h2 className="text-md text-indigo-500 tracking-widest font-medium title-font mb-1">Puzzle No: {parseInt(totalPlayed) + 1}</h2>
                                    <h1 className="md:text-3xl text-2xl font-medium title-font text-gray-900">Find Best Move for White</h1>
                                </div>

                            </div>
                        </section>
                        <ChessboardComponent />
                        <div className="flex flex-row md:flex-row md:mr-0 md:ml-auto mx-auto items-center flex-shrink-0 space-x-4 mt-2">
                            <button className="inline-flex items-center focus:outline-none text-white bg-indigo-500 border-0 hover:bg-indigo-600 rounded text-lg">
                                <span className="flex items-start flex-col leading-none px-2">
                                    <span className="text-lg mb-1">Next Puzzle </span>
                                    </span>
                                <TbPlayerTrackNext className='pr-2' size={27}/>
                            </button>
                            
                        </div>
                    </div>
                </div>
            </section>

        </div>



    )
}

export default MainBody


