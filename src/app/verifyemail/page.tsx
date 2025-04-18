"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.reponse.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-center text-2xl">Verify Email </h1>
      {verified && (
        <>
          <p className="text-green-500">Your email has been verified!</p>
          <Link href="/login" className="text-blue-500">
            Go to Login
          </Link>
        </>
      )}
      {error && (
        <>
          <p className="text-red-500">Your email verification failed!</p>
          <Link href="/login" className="text-blue-500">
            Go to Login
          </Link>
        </>
      )}
      <p className="text-center">
        Please check your email for the verification link.
      </p>
      <p className="text-center">Token: {token ? token : "No Token"}</p>
      {/* <button onClick={() => verifyUserEmail(token)}>
    Verify Email
</button> */}
    </div>
  );
}
