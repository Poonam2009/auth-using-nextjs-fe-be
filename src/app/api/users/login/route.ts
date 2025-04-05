import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

await connect();
console.log("Connected to database");

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {email, password} = reqBody

        console.log(reqBody);

        //check if user already exists
        const user = await User.findOne({email})

        if(!user){
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }

        //check password
        const isPasswordCorrect = await bcryptjs.compare(password, user.password)

        if(!isPasswordCorrect){
            return NextResponse.json({error: "Incorrect password"}, {status: 400})
        }

        // create token data

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        // create the token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})

        const response = NextResponse.json({
            message: "Login Successfully",
            succss: true
        })

        response.cookies.set("token", token, { 
            httpOnly:true
        })

        return response
        
    } catch (error: any) {
        console.error("Login API error:", error); // Log this in terminal
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}