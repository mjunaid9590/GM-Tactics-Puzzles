
import { NextResponse} from 'next/server'

import { UserPuzzle } from '../../../models/dbConn'


export async function POST(request) {
    console.log("updateUserPuzzleForm API");

    const body = await request.json();
    const { q1Value, q2_1Value, q2_2Value, q3Value, userPuzzleId } = body;
    
    console.log("userId: ", userPuzzleId);
    const result = await UserPuzzle.findOneAndUpdate({_id: userPuzzleId},{question_1:q1Value, question_2_1:q2_1Value, question_2_2:q2_2Value, question_3:q3Value})
    
      console.log("API result", result)
      return NextResponse.json({ message: 'Data updated successfully' }, { status: 201 })
    
}
