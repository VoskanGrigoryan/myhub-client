"use client";

import { useRouter } from "next/navigation";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useAuthStore } from "../zustand/authStore";

const node_url = process.env.NEXT_PUBLIC_NODE_API_BASE_URL;
const base_url = process.env.NEXT_PUBLIC_BASE_PATH;

export function useGoogleAuth() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const handleGoogleSignIn = useGoogleLogin({
    flow: "auth-code",
    redirect_uri: base_url,
    onSuccess: async ({ code }) => {
      try {
        const response = await axios.post(
          `${node_url}/auth/google`,
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
