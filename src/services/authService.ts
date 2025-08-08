import axios from "axios";

const node_url = process.env.NEXT_PUBLIC_NODE_API_BASE_URL;

export const logout = async (): Promise<void> => {
  await axios.post(
    `${node_url}/auth/logout`,
    {},
    { withCredentials: true } // SENDS COOKIES TO BACKEND
  );
};
