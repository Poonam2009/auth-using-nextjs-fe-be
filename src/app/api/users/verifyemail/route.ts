import {connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";


await connect();

export async function POST (request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {token} = reqBody

        // check if token is valid
        const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}})

        if(!user){
            return NextResponse.json({error: "Invalid or expired token"}, {status: 400})
        }

        // update user
        user.isVarified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined
        await user.save()

        return NextResponse.json({message: "Email verified successfully"}, {status: 200})

    } catch (error:any) {
        console.error("Verify email API error:", error); // Log this in terminal
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}