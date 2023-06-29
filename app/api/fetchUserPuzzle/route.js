import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';
import { NextResponse, NextRequest } from 'next/server'
import {UserPuzzle} from '../../../models/dbConn'
import { useSession } from "next-auth/react"



export async function GET(request) {

    // setUsername(session.user.username)
    // console.log(request.url)
    const {searchParams} = new URL(request.url);
    const userId = searchParams.get("userId");
    const isRepeat = searchParams.get("repeat")
    // console.log("userId: ", userId)
    const thisUserData = await UserPuzzle.find({userId: userId});
    // console.log(thisUserData);
    const segregatedData = thisUserData.reduce((result, data) => {
        const set = data.puzzleSet;
        // console.log(data.puzzleSet)
        const attempted = data.isAttempted;
        const solved = data.isSolved;
    
        // Initialize counters for each set if not already present
        result[set] = result[set] || { total: 0, attempted: 0, solved: 0 };
    
        // Increment counters based on 'isAttempted' and 'isSolved' values
        result[set].total++;
        if (attempted) result[set].attempted++;
        if (solved) result[set].solved++;
    
        return result;
      }, {});
    console.log("SegregatedData: ", segregatedData);

 return NextResponse.json(segregatedData,{status: 201} )


}
