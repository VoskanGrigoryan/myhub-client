import GoogleProvider from "next-auth/providers/google";
import NextAuth, {
  NextAuthOptions,
  SessionStrategy,
} from "next-auth";
import { Account, Profile, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  callbacks: {
    async signIn({
      user,
      account,
      profile,
    }: {
      user: User;
      account: Account | null;
      profile?: Profile;
    }): Promise<boolean> {
      if (account?.provider === "google" && profile) {
        try {
          const backendResponse = await fetch(
            `${process.env.BACKEND_API_BASE_URL}/auth/google`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                googleId: profile.sub,
                email: profile.email,
                name: profile.name,
                idToken: account.id_token,
              }),
            }
          );

          if (backendResponse.ok) {
            const backendData = await backendResponse.json();
            if (backendData.token) {
              (user as any).backendToken = backendData.token;
              (user as any).isNewUser = backendData.isNewUser || false;
              return true;
            } else {
              console.error("Backend did not return a token during Google login.");
              return false;
            }
          } else {
            console.error(
              "Backend Google authentication failed:",
              backendResponse.status,
              await backendResponse.text()
            );
            return false;
          }
        } catch (error) {
          console.error("Error integrating with backend for Google authentication:", error);
          return false;
        }
      }
      return true;
    },

    async jwt({
      token,
      user,
    }: {
      token: JWT;
      user?: User;
      account?: Account | null;
    }): Promise<JWT> {
      if (user) {
        token.backendToken = (user as any).backendToken;
        token.isNewUser = (user as any).isNewUser;
        token.id = (user as any).id;
      }
      return token;
    },

    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
    }): Promise<Session> {
      if (token.backendToken) {
        (session.user as any).backendToken = token.backendToken;
      }
      if (token.isNewUser !== undefined) {
        (session.user as any).isNewUser = token.isNewUser;
      }
      if (token.id) {
        (session.user as any).id = token.id;
      }
      return session;
    },

    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt" as SessionStrategy,
  },

  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };