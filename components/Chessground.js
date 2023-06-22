import { Chessboard } from 'react-chessboard'
// import {Chessground} from 'react-chessground'
import "react-chessground/dist/styles/chessground.css"
import styles from '@/styles/Home.module.css'
import {Chess} from "chess.js"
import {useState, useEffect} from "react"
import axios from 'axios';


import React from 'react'

async function fetchPuzzle() {
    const puzzleId = '00sO1'
    const url = `https://lichess.org/api/puzzle/${puzzleId}`;
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


const ChessboardComponent = () => {
   // const gameInitial = new Chess();
    const [puzzleData, setPuzzleData] = useState(null);
    
    const [game, setGame] = useState(new Chess());
    //const [game, setGame] = useState(puzzleData);
    useEffect(() => {
        fetchPuzzle()
            .then(response => {
                if (response) {
                    //console.log('Dashboard:', response.data);
                    
                    setPuzzleData(response.data);
                    console.log(response.data);
                    var gameCopy = new Chess(game.fen());
                    // gameCopy = game;
                    //gameCopy.loadPgn = game.loadPgn();
                    console.log("gameCopy: ", gameCopy);
                    console.log("game: ", game);
                    gameCopy.loadPgn(response.data.game.pgn);
                    setGame(gameCopy);
                    // game.loadPgn(response.data.game.pgn);
                    // console.log(game.moves());
                    //console.log("Fetched puzzle: ", response.data);
                    console.log(game.turn());
                    
                }
                else {
                    console.log('not approached')
                }
            });
      }, []);


    function makeAMove(move) {
        //new Chess(game.fen())
        var gameCopy = new Chess(game.fen());
        // gameCopy = game;
        const result = gameCopy.move(move);
        
        // console.log(game.turn());
        console.log("result: ", result)
        setGame(gameCopy);
        //console.log(game);
        
        return result; // null if the move was illegal, the move object if the move was legal
    }

    function makeRandomMove() {
        const possibleMoves = game.moves();
        if (game.isGameOver() || game.isDraw() || possibleMoves.length === 0) return; // exit if the game is over
        const randomIndex = Math.floor(Math.random() * possibleMoves.length);
        makeAMove(possibleMoves[randomIndex]);
    }

    function onDrop(sourceSquare, targetSquare) {
        const move = makeAMove({
            from: sourceSquare,
            to: targetSquare,
            //promotion: "q", // always promote to a queen for example simplicity
        });
        console.log("manual move made")
        // illegal move
        if (move === null) return false;
        //setTimeout(makeRandomMove, 200);
        console.log("Automatic move made")
        return true;
    }
    
   // console.log("updated game: ", game)
    return ((
        game && 
        <Chessboard className={styles.chessboard} key={game.fen()} position={game.fen()} onPieceDrop={onDrop} boardWidth={500}>{console.log("Re-rendered")}</Chessboard>
    ))
}

export default ChessboardComponent
