import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';
import { NextResponse, NextRequest } from 'next/server'

import {UserPuzzle} from '../../../models/dbConn'



export async function POST(request) {
    console.log("addUserPuzzle API");

    const body = await request.json();
    const { userId, puzzleSet, puzzleId, isSolved, isAttempted } = body;
     console.log(userId);
    try {
        const newUserPuzzle = new UserPuzzle({
            userId,
            puzzleSet,
            puzzleId,
            isSolved,
            isAttempted
        });
        await newUserPuzzle.save();
         console.log(newUserPuzzle);
        return NextResponse.json({ message: 'Data updated successfully'},{status: 201} )
    } catch (error){
        return  NextResponse.json({message: error}, {status: 500})
    }
}
