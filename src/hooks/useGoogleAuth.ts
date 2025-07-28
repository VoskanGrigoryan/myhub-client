"use client";

import { useRouter } from "next/navigation";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useAuthStore } from "../zustand/authStore";

export function useGoogleAuth() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const handleGoogleSignIn = useGoogleLogin({
    flow: "auth-code",
    redirect_uri: "http://localhost:3000",
    onSuccess: async ({ code }) => {
      try {
        const response = await axios.post(
          "http://localhost:8080/auth/google",
          { code },
          { withCredentials: true }
        );

        const { user, isNewUser } = response.data;
        setUser(user, isNewUser);

        router.push("/");
      } catch (error) {
        console.error("Login failed", error);
      }
    },
    onError: (err) => {
      console.error("Google login error:", err);
    },
  });

  return handleGoogleSignIn;
}
