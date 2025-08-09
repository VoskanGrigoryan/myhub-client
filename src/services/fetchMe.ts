import { cookies } from "next/headers";

const node_url = process.env.NEXT_PUBLIC_NODE_API_BASE_URL;

//Replaced the axios with regular fetch bc I need to use it in the Layout.tsx
//and dont want to make it a client side component
export async function fetchMe() {
  const cookieStore = await cookies(); // gives you access to cookies on the server
  const res = await fetch(`${node_url}/auth/me`, {
    headers: {
      Cookie: cookieStore.toString(), // SENDS COOKIES TO BACKEND
    },
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) {
    return null;
  }

  const data = await res.json();
  return data;
}

export async function fetchMeMiddleware(cookieHeader: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_NODE_API_BASE_URL}/auth/me`, {
      method: "GET",
      headers: { cookie: cookieHeader },
      credentials: "include",
    });

    if (!res.ok) return null;
    return res.json();
  } catch (err) {
    console.error("fetchMeMiddleware error:", err);
    return null;
  }
}