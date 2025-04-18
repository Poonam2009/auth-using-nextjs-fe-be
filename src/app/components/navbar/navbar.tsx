"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "../authContext/page";

export default function Navbar() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const router = useRouter();
  

  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logged out successfully!");
      setIsLoggedIn(false);
      router.push("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };
  console.log(isLoggedIn);
  return (
       <nav className="flex justify-center text-center">
      {isLoggedIn ? (
        <>
        <li className="mr-2">
          <Link className="p-2 hover:bg-blue-500" href="/">Home</Link>
        </li>
        <li className="mr-2">
          <Link className="p-2 hover:bg-blue-500" href="/profile">Profile</Link>
        </li>
        <li>
            <Link className="p-2 hover:bg-blue-500" onClick={handleLogout}  href="/login">Logout</Link>
        </li>
      </>
      ) : (
        <>
        <li className="mr-2">
          <Link className="p-2 hover:bg-blue-500" href="/login">Login</Link>
        </li>
        <li>
          <Link className="p-2 hover:bg-blue-500" href="/signup">Signup</Link>
        </li>
      </>
      )}
    </nav>
  );
}
