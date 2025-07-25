import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id?: string; // Custom ID from your backend
      backendToken?: string; // Your custom JWT from backend
      isNewUser?: boolean; // Custom flag from backend
    } & DefaultSession["user"]; // Merge with default user properties (name, email, image)
  }

  interface User extends DefaultUser {
    id?: string; // Custom ID from your backend
    backendToken?: string; // Your custom JWT from backend
    isNewUser?: boolean; // Custom flag from backend
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string; // Custom ID passed to JWT
    backendToken?: string; // Your custom JWT in the NextAuth JWT
    isNewUser?: boolean; // Custom flag in the NextAuth JWT
  }
}