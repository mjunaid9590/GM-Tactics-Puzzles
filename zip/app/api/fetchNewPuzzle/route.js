import { NextResponse } from 'next/server'
import {UserPuzzle} from '../../../models/dbConn'


export async function GET(request) {

    
    const {searchParams} = new URL(request.url);
    const userId = searchParams.get("userId");
    const set = Number(searchParams.get("set"));
    const isRepeat = searchParams.get("repeat")
   
    
    if(isRepeat == "false"){

        const thisUserData = await UserPuzzle.findOne({userId: userId, isAttempted: false, puzzleSet: set});
        // console.log(thisUserData)
        return NextResponse.json(thisUserData,{status: 201} )
    }
    else{
        const thisUserData = await UserPuzzle.findOne({userId: userId, isAttempted: true, isSolved: false, puzzleSet: set});
        // console.log(thisUserData)
        return NextResponse.json(thisUserData,{status: 201} )
    }


}
