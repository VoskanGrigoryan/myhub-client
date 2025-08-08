import { cookies } from "next/headers";

const node_url = process.env.NEXT_PUBLIC_NODE_API_BASE_URL;

//Replaced the axios with regular fetch bc I need to use it in the Layout.tsx
//and dont want to make it a client side component
export async function fetchMe() {
  const cookieStore = await cookies(); // gives you access to cookies on the server
  const res = await fetch(`${node_url}/users/me`, {
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

// export async function fetchMe() {
//   const response = await axios.get("http://localhost:8080/auth/me", {
//     withCredentials: true, // SENDS COOKIE TO BACKEND
//   });

//   return response.data;
// }
