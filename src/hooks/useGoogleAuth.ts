"use client";

import { useRouter } from "next/navigation";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

export function useGoogleAuth() {
  const router = useRouter();

  const handleGoogleSignIn = useGoogleLogin({
    flow: "auth-code",
    redirect_uri: "http://localhost:3000",
    onSuccess: async ({ code }) => {
      await axios.post(
        "http://localhost:8080/auth/google",
        { code },
        {
          withCredentials: true,
        }
      );

      router.push("/");
    },
    onError: (err) => {
      console.error("Google login error:", err);
    },
  });

  return handleGoogleSignIn;
}
