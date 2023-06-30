
import { NextResponse, } from 'next/server'
import {UserPuzzle} from '../../../models/dbConn'



export async function GET(request) {

 
    const {searchParams} = new URL(request.url);
    const userId = searchParams.get("userId");
    const isRepeat = searchParams.get("repeat")
    const thisUserData = await UserPuzzle.find({userId: userId});
    const segregatedData = thisUserData.reduce((result, data) => {
        const set = data.puzzleSet;
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
 return NextResponse.json(segregatedData,{status: 201} )


}
