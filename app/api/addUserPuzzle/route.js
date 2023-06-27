import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';
import { NextResponse, NextRequest } from 'next/server'

import {User} from '../../../models/dbConn'



export async function POST(request) {
    console.log("signup API");
    // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    // puzzleSetId: { type: mongoose.Schema.Types.ObjectId, required: true },
    // puzzleId: { type: String, ref: 'Puzzles', required: true },
    // isSolved: { type: Boolean, default: false },
    // isAttempted: { type: Boolean, default: false },

    const body = await request.json();
    const { userId, puzzleSet, puzzleId, isSolved, isAttempted } = body;
    const name = fullName;
    const password = await bcrypt.hash(newPassword,10);
    try {
        const newUserPuzzle = new User({
            userId,
            puzzleSet,
            puzzleId,
            isSolved,
            isAttempted
        });
        await newUserPuzzle.save();
        // console.log(User.db.name)
        return NextResponse.json({ message: 'Data updated successfully'},{status: 201} )
    } catch (error){
        return  NextResponse.json({message: 'Error! Could not enter user puzzle'}, {status: 500})
    }
}
