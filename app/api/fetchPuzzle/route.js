
import { NextResponse} from 'next/server'
import {Puzzle} from '../../../models/dbConn'



export async function GET(request) {

    
    const {searchParams} = new URL(request.url);
    const serialNo = searchParams.get("serialNo");
    const set = searchParams.get("set")
    // console.log("Set :", set);
    // console.log("serialNo: ", serialNo)
    // console.log("User ID: ", userId)
    // console.log("userId: ", userId)
    const thisPuzzleData = await Puzzle.find({serialNo: serialNo, Set: set});
    // // console.log(thisUserData);
    

 return NextResponse.json(thisPuzzleData,{status: 201} )


}
