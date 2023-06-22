import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';
import { NextResponse, NextRequest } from 'next/server'

import {User} from '../../../models/dbConn'



export async function POST(request) {
    console.log("api----------------------------------");

    const body = await request.json();
    const { fullName, email, password } = body;
    // console.log("Full Name: ", fullName);
    // console.log("email: ", email);
    // console.log("password: ", password);
    const hashedPassword = await bcrypt.hash(password,10);
    console.log(hashedPassword);
    
    try {
        const newUser = new User({
            fullName,
            email,
            hashedPassword
        });
        //console.log(newUser);
        await newUser.save();
        console.log(User.db.name)
        return NextResponse.json({ message: 'Signup successfully'},{status: 201} )
    } catch (error){
        return  NextResponse.json({message: 'Signup Failed'}, {status: 500})
    }
    


    
    return NextResponse.json(body, { status: 201 })
    //     let hashedPassword = '';
    //   await bcrypt.hash(password, 10, function(err, hash) {
    //     console.log("Hash: ", hash)
    //     hashedPassword = hash;
    //     });


    // // Generate a salt
    // //  const hashedPassword = await bcrypt.genSalt(10)
    // //  .then(salt =>{
    // //     console.log("Salt: ", salt);
    // //     return bcrypt.hash(password, salt);
    // //  })
    // // console.log("Hashed Password: ", hashedPassword);
    // //const hashedPassword = await bcrypt.hash(password, salt);
    // console.log(process.env.MONGODB_CONNECTION_STRING);
    // await mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //   });
    //   const db = mongoose.connection;
    //   db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    //   const testSchema = new mongoose.Schema({
    //     name: String,
    //     email: String,
    //     password: String,
    //   });
    //   const Test = mongoose.model('Test', testSchema);
    //   const data = await Test.find();
    // console.log(data);
    //   // Connect to MongoDB
    // //   const client = new MongoClient(process.env.MONGODB_CONNECTION_STRING, {
    // //     useNewUrlParser: true,
    // //     useUnifiedTopology: true,
    // //   });
    // //   console.log(client);
    //   try {
    //     console.log("Before Schema");

    //     const userSchema = new mongoose.Schema({
    //         username: string,
    //         userEmail: string,
    //         userPassword: string
    //     })
    //     console.log("Before model");

    //     const user = mongoose.model('userInfo', userSchema)
    //     console.log("Before new user");

    //     const newuser = new user({
    //         name: fullName,
    //         userEmail: email,
    //         userPassword: password
    //     })
    //     console.log("Before Save");
    //     await newuser.save();
    //     // await client.connect();
    //     // const db = client.db();
    //     // console.log('API  2 -----------------------------------------')
    //     // // Store user information in MongoDB
    //     // console.log(db);
    //     // const usersCollection = db.collection('users');
    //     // const result = await usersCollection.insertOne({fullName, email, password: hashedPassword });
    //     console.log('API  3 -----------------------------------------')
    //     // console.log(result);
    //     return NextResponse.json({ message: 'Signup successful' }, { status: 201 })
    //     // res.status(201).json({ message: 'Signup successful' });
    //   } catch (error) {
    //     return NextResponse.json({ message: 'Signup failed' , error }, { status: 500 })
    //     // res.status(500).json({ message: 'Signup failed' , error});
    //   } finally {
    //     // await client.close();
    //   }
}
