"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Toaster, toast } from 'react-hot-toast';

export default function SignupPage() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [buttonDisable, setButtonDisable] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter();

const onSignup = async () => {
    try {
        setLoading(true);
        const response = await axios.post(
            "/api/users/signup",
            user
        );
        toast.success("User created successfully")
        setTimeout(() => {
            router.push("/login");
        }, 2000);
        
    } catch (error:any) {
        toast.error(error?.response?.data?.error || "Something went wrong");

    }finally {
        setLoading(false);
    }
}

  useEffect(() => {
    if(user.username.length > 0 && user.email.length > 0 && user.password.length > 0) {
      setButtonDisable(false)
    } else {
      setButtonDisable(true)
    }
  }, [user])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      
      <h1 className="text-center text-2xl">{loading ? "Processing" : "Sign Up Page"}</h1>
      <div className="w-2/3 lg:w-1/4">
        <Toaster />
        <div className="flex flex-col mt-4">
          <label className="text-left" htmlFor="username">
            User Name
          </label>
          <input
            id="username"
            type="text"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="username"
            className="p-2 border border-blue-300 rounded-md focus: outline-none focus:border-blue-600"
          />
        </div>

        <div className="flex flex-col mt-4">
          <label className="text-left" htmlFor="email">
            User Email
          </label>
          <input
            id="email"
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="User Email"
            className="p-2 border border-blue-300 rounded-md focus: outline-none focus:border-blue-600"
          />
        </div>

        <div className="flex flex-col mt-4">
          <label className="text-left" htmlFor="password">
            User Password
          </label>
          <input
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="User Password"
            className="p-2 border border-blue-300 rounded-md focus: outline-none focus:border-blue-600"
          />
        </div>

        <button
          className="p-2 border border-gray-300 rounded-lg mt-4 focus: outline-none focus:border-gray-600 disabled:opacity-50"
          onClick={onSignup}
          disabled={buttonDisable}
        >
         {buttonDisable ? "Please fill all fields" : "Sign Up Here"}
        </button>
        <Link href="/login" className="mt-2">
          {" "}
          Visit Login Page{" "}
        </Link>
      </div>
    </div>
  );
}
