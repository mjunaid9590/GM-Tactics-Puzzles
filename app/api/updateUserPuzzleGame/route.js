
import { NextResponse} from 'next/server'

import { UserPuzzle } from '../../../models/dbConn'


export async function POST(request) {
    console.log("updateUserPuzzleGame API");

    const body = await request.json();
    const { isWon, userPuzzleId } = body;
    
    console.log("userId: ", userPuzzleId);
    const result = await UserPuzzle.findOneAndUpdate({_id: userPuzzleId},{isAttempted:true, isSolved: isWon},{ new: true })
    
      console.log("API result", result)
      return NextResponse.json({ message: 'Data updated successfully' }, { status: 201 })
    
}
