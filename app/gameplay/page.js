"use client"
import React from 'react'
import ChessboardComponent from '../../components/Chessground';
import { TbPlayerTrackNext } from 'react-icons/tb'


const Page = () => {
    return (
        <div>
            <hr />
            <section className="text-gray-600 body-font relative">
                <div className="container px-5 py-4 mx-auto flex sm:flex-nowrap flex-wrap">
                    <div className=" border-gray-400 flex mx-auto relative">
                        <section className="text-gray-600 body-font">
                            <div className="px-auto rounded-lg mt-6 sm:mt-0 lg:px-10">
                                <section className="text-gray-600 body-font">
                                    <div className="container mx-auto flex flex-col">
                                        <h2 className="text-md text-indigo-500 tracking-widest font-medium title-font mb-1">Puzzle No: 122/1000</h2>
                                        <h1 className="md:text-3xl text-2xl font-medium title-font text-gray-900">Find Best Move for White</h1>


                                    </div>
                                </section>
                                <ChessboardComponent />

                            </div>
                        </section>

                    </div>
                    <div className="lg:w-1/2 md:w-1/2 flex flex-col px-4 md:ml-auto w-full md:py-8 mt-8 md:mt-0">
                        <h2 className="text-gray-900 text-2xl mb-1 font-medium title-font">
                            Questions
                        </h2>
                        <p className="leading-relaxed mb-5 text-gray-600">
                            Answer following questions while finding your best move.
                        </p>
                        <div className="relative mb-4">
                            <label htmlFor="name" className="leading-7 text-lg text-gray-600">
                                General observations about the position and placement of pieces?
                                <br />
                                (undefine pieces, potential forks and skewers etc..)
                            </label>
                            <input
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
                                    type="text"
                                    id="full-name"
                                    name="full-name"
                                    className="w-full  bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                            <div className="relative flex-grow w-full">
                                <label htmlFor="email" className="leading-7 text-lg text-gray-600">
                                    Candatide Move # 2
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="w-full  bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                            
                        </div>

                        
                        <button className="text-white bg-indigo-500 border-0 py-2 px-6 mt-4 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                            Submit & Proceed to Next
                        </button>
                        <p className="text-xs text-gray-500 mt-3">
                            Ratings will be updated after you submit the puzzle.
                        </p>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Page
