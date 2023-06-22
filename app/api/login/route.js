import { signIn } from 'next-auth/client';

export async function POST(request) {
    const { email, password } = request.body;
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result.error) {
      res.status(401).json({ message: 'Login failed' });
    } else {
      res.status(200).json({ message: 'Login successful' });
    }
  
}







// import { MongoClient, ObjectId } from 'mongodb';
// import bcrypt from 'bcrypt';
// import { NextResponse, NextRequest } from 'next/server'
// import mongoose from 'mongoose';
// import { stringify } from 'postcss';




// export async function POST(request) {
//     console.log("api-------Login---------------------------");
//     const body = await request.json();
//     const {email, password} = body;
//     console.log(email, password);


//     await mongoose.connect('mongodb://127.0.0.1:27017/puzzle-website')
//     .then(()=>{
//         console.log("Connection successful");
//     })
//     .catch((err)=>{
//         console.error("Database not connected: ", err);
//     })

//     const userSchema = new mongoose.Schema({
//         name: String,
//         email: String,
//         password: String
//     })
//     const models = mongoose.modelNames();
//     console.log("models: ", models);
//     const User = mongoose.model('User', userSchema, 'users');
//     const CurrentUser = new User({
//         name: "Junaid",
//         email: "adfa@sdf.com",
//         password: "23fw423"
//     })
//     console.log(CurrentUser.email);
//     await CurrentUser.save();

//     const users = await User.find();
//     console.log("Users: ", users)

//     return NextResponse.json("Success", { status: 201 })



// }