"use client";

import { Toaster } from "react-hot-toast";
import axios from "axios";
import React, { useState } from "react";
import Link from "next/link";

export default function ProfilePage () {
    const [data, setData] = useState("nothing")

    const getUserDetails = async () => {
        try {
          const response = await axios.get('/api/users/me');
          console.log("API Response:", response.data);
          const userId = response.data.data._id;
          setData(userId);
        } catch (error: any) {
          console.error("Error fetching user:", error.response?.data || error.message);
        }
      }
    console.log(data);
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-2">
            <Toaster />
            <h1 className="text-2xl text-center">Profile Page</h1>
            <h2 className="p-2 m-2 bg-amber-300 rounded-md">{data === "nothing" ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <button 
                className="p-2 bg-amber-300 text-white rounded-md font-bold hover:bg-amber-500 mt-2"
                onClick={getUserDetails}
            > 
            Get User Details
            </button>
            
        </div>
    )
}