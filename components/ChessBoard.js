import { useEffect, useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

export default function ChessBoard({fenData, puzzleMoves, onMessage}) {
    // console.log("fen", fenData);
    // console.log("puzzleMoves: ", puzzleMoves)
    const chess = new Chess(fenData)
    const [game, setGame] = useState(chess);
    const [moveMade, setMoveMade] = useState(1);
    const [solution, setSolution] = useState(puzzleMoves);
    // const [puzzleMoves, setPuzzleMoves] = useState([]);
    useEffect(()=>{
        setSolution(puzzleMoves);
        // console.log(puzzleMoves)
    },[puzzleMoves])
    useEffect(() => {
            setTimeout(makeRandomMove,1000);
    }, [moveMade])

    function makeAMove(move) {
        // console.log("solution: ",solution)
        try{

            const result = game.move(move);
            
            setGame((prevGame) => new Chess(prevGame.fen())); // Create a new Chess instance with the updated FEN position
            return result;
        }catch(error){
            // console.log("My Error: ",error);
        }
    }

    function makeRandomMove() {
        // const possibleMoves = game.moves();
        console.log("solution: ",solution)

        if (game.isGameOver() || game.isDraw() )
            return; // exit if the game is over
        const moveExpected = solution.shift();
        // console.log("Auto Expected Move: ", moveExpected);
        // console.log(solution)
        if(moveExpected){
        const move = makeAMove(moveExpected);
        // console.log("Auto Executed Move: ", move);
        }

    }

    function onDrop(sourceSquare, targetSquare) {
        console.log("solution: ",solution)

        const moveExpected = solution.shift();
        // console.log("Manual Expected Move: ", moveExpected);
        try{
        const move = makeAMove({
            from: sourceSquare,
            to: targetSquare,
            //   promotion: "q", // always promote to a queen for example simplicity
        });

        console.log("Manual Executed Move", move);
        // illegal move
        if (move === null) return false;
        // setTimeout(makeRandomMove, 200);

        if (move.from === moveExpected.substr(0, 2) && move.to === moveExpected.substr(2, 2)) {
            // The last move matches the algebraic notation move
            console.log('The moves match!');
            // console.log(solution);
            if(solution.length<=0){
                onMessage("won")
            }
            else{
                setMoveMade(moveMade + 1);

                onMessage("correct")
            }

          } else {
            // The last move does not match the algebraic notation move
            console.log('The moves do not match!');
            onMessage("lost")
            return false;
          }

        // console.log(moveMade)
        return true;
        }
        catch(error){
            // console.log("Drop error")
        }
    }

    return <Chessboard position={game.fen()} onPieceDrop={onDrop} />;
}