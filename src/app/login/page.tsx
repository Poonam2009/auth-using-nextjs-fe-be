"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();
  const [buttonDisable, setButtonDisable] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      toast.success("Login successful");
      router.push("/profile");
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(
        error?.response?.data?.error || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Toaster />
      <h1 className="text-center text-2xl">Login Page</h1>
      <div className="w-2/3 lg:w-1/4">
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
          onClick={onLogin}
          disabled={buttonDisable}
        >
          {loading ? "Processing..." : "Login"}
        </button>
        <div>
          <Link href="/signup" className="mt-2">
            {" "}
            Visit signup Page{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}
