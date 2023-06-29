import { Chessboard } from 'react-chessboard'
// import {Chessground} from 'react-chessground'
import "react-chessground/dist/styles/chessground.css"
import styles from '@/styles/Home.module.css'
import { Chess } from "chess.js"
import { useState, useEffect } from "react"
import axios from 'axios';
import { useRef } from 'react'

import React from 'react'

async function fetchPuzzle(set, serialNo) {


    // const puzzleId = '00sO1'
    console.log("CG set: ", set)
    console.log("CG serial: ", serialNo)
    const url = `/api/fetchPuzzle?set=${set}&&serialNo=${serialNo}`;
    // const token = 'lip_LP9wEc1crYktsAD0FYQV';
    //console.log('count')
    try {
        const response = await axios.get(url);
        //console.log('api end')
        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
        console.log('error')
        return null;
    }
}


const ChessboardComponent = ({ serialNo, set, onMessage}) => {
    const chessboardRef = useRef();

    // const gameInitial = new Chess();
    const [puzzleData, setPuzzleData] = useState(null);
    const [puzzleMoves, setPuzzleMoves] = useState([]);
    const [currentPosition, setCurrentPosition] = useState('');

    const [game, setGame] = useState(null);
    //const [game, setGame] = useState(puzzleData);
    useEffect(() => {
        fetchPuzzle(set, serialNo)
            .then(response => {
                if (response) {
                    //console.log('Dashboard:', response.data);

                    setPuzzleData(response.data);
                    console.log("Response Data", response.data[0].FEN);
                    const chess = new Chess(response.data[0].FEN)
                    const moves = response.data[0].Moves;
                    setPuzzleMoves(moves.split(' '));
                    // var gameCopy = new Chess(game.fen());
                    // // gameCopy = game;
                    // //gameCopy.loadPgn = game.loadPgn();
                    // console.log("gameCopy: ", gameCopy);
                    // console.log("game: ", game);
                    // gameCopy.loadPgn(response.data.game.pgn);
                    // setGame(gameCopy);
                    // game.loadPgn(response.data.game.pgn);
                    // console.log(game.moves());
                    //console.log("Fetched puzzle: ", response.data);
                    // console.log(game.turn());
                    setGame(chess);
                    setCurrentPosition(chess.fen());


                }
                else {
                    console.log('not approached')
                }
            });
    }, [set, serialNo]);

    // useEffect(()=>{
    //     console.log("Current Game: ", game)
    // },[game])

    // console.log("puzzleMoves: ", puzzleMoves);
    function makeAMove(move) {
        //new Chess(game.fen())
        console.log(move);
        // var gameCopy = new Chess(game.fen());
        const gameCopy = new Chess(currentPosition);

        // console.log("Current Player: ", gameCopy._turn)
        // console.log("game before: ",game);

        // gameCopy = game;
        const result = gameCopy.move(move);
        // console.log("After Player: ", gameCopy._turn)
        // console.log("Current Player: ", gameCopy._turn)
        // console.log("game after: ",game);

        // console.log(game.turn());
        // console.log("result: ", result)
        setGame(gameCopy);
        setCurrentPosition(gameCopy.fen());

        // console.log("making Move")
        return result; // null if the move was illegal, the move object if the move was legal
    }

    function makeRandomMove() {
        const possibleMoves = game.moves();
        if (game.isGameOver() || game.isDraw() || possibleMoves.length === 0) return; // exit if the game is over
        const randomIndex = Math.floor(Math.random() * possibleMoves.length);
        const randomMove = possibleMoves[randomIndex];
        makeAMove(randomMove);

        // const thismove = {
        //     from: 'e2',
        //     to: 'g4',
        // }
        // // console.log("Player to random move: ", game._turn)

        // makeAMove(thismove);
    }
    function makeNextMove(){
        if (puzzleMoves.length > 0) {
            const move = puzzleMoves.shift();
            makeAMove(move);
          } else {
            // Computer's move from e2 to g4
            const computerMove = 'e2g4';
            makeAMove(computerMove);
          }
        
    }
    function afterDrop(automove) {
        const move = makeAMove(automove);
        // const move2 = puzzleMoves.shift();
        console.log("manual move made")
        // illegal move
        if (move === null) return false;
        // setTimeout(makeRandomMove, 2000);
        // setTimeout(makeNextMove, 2000)
        // console.log("Automatic move made", move2)
        // setTimeout(makeAMove(puzzleMoves), 2000)
        return true;
    }

    function onDrop(sourceSquare, targetSquare) {
        console.log("Player to Move: ", game._turn)
        const move = makeAMove({
            from: sourceSquare,
            to: targetSquare,
            //promotion: "q", // always promote to a queen for example simplicity
        });
        // const move2 = puzzleMoves.shift();

        console.log("manual move made")
        // illegal move
        if (move === null) return false;
        //  setTimeout(afterDrop(puzzleMoves[1]), 2000);
        // setTimeout(makeNextMove, 2000)
        // console.log("Automatic move made", move2)
        setTimeout(makeRandomMove, 2000)
        return true;
    }

    // console.log("updated game: ", game)
    return ((
        game &&
        <Chessboard ref={chessboardRef} className={styles.chessboard} key={currentPosition} position={currentPosition} onPieceDrop={onDrop} boardWidth={500}>{console.log("Re-rendered")}</Chessboard>
    ))
}

export default ChessboardComponent