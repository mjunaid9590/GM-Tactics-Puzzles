import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';
import { NextResponse, NextRequest } from 'next/server'

import {User} from '../../../models/dbConn'



export async function POST(request) {
    console.log("signup API");

    const body = await request.json();
    const { fullName, email, newPassword } = body;
    const name = fullName;
    const password = await bcrypt.hash(newPassword,10);
    try {
        const newUser = new User({
            name,
            email,
            password,
        });
        await newUser.save();
        console.log(User.db.name)
        return NextResponse.json({ message: 'Signup successfully'},{status: 201} )
    } catch (error){
        return  NextResponse.json({message: 'Signup Failed'}, {status: 500})
    }
}
