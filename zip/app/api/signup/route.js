import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';
import { NextResponse, NextRequest } from 'next/server'

import { User, Puzzle, UserPuzzle } from '../../../models/dbConn'


export async function POST(request) {
    console.log("signup API");

    const body = await request.json();
    const { fullName, email, newPassword } = body;
    const name = fullName;
    const password = await bcrypt.hash(newPassword, 10);
    try {
        const newUser = new User({
            name,
            email,
            password,
        });
        // console.log(newUser.email);
        let ifAlready = 0;
        const searchEmail = newUser.email;
        // const ifAlready = User.find({email: newUser.email});
        ifAlready = await User.count({ email: searchEmail })
        console.log("ifAlready: ", ifAlready)
        if(ifAlready>0){
            console.log("returning");
            return NextResponse.json({ message: "Email already Exist" }, { status: 500 })
        }
        

        const puzzles = await Puzzle.find();
        // console.log()



        // const userId = newUser._id;
        // const puzzleSet = 1;
        // const puzzleId = newUser._id;
        // const isSolved = false;
        // const isAttempted = false;
        
        const newUserPuzzle = puzzles.map(puzzle => ({
            userId: newUser._id,
            puzzleSet: puzzle.Set,
            serialNo: puzzle.serialNo,
            puzzleId: puzzle._id,
        }));
         console.log(newUserPuzzle);
        // console.log(UserPuzzle.find());
        await newUser.save();
        // console.log(newUser._id);
        await UserPuzzle.insertMany(newUserPuzzle);
        return NextResponse.json({ message: 'Signup successfully' }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: 'Signup Failed' }, { status: 500 })
    }
}
