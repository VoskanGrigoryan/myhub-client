import axios from "axios";

export const logout = async (): Promise<void> => {
  await axios.post(
    "http://localhost:8080/auth/logout",
    {},
    { withCredentials: true } // SENDS COOKIES TO BACKEND
  );
};
