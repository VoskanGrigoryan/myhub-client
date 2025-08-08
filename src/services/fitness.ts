import axios from "axios";

const java_url = process.env.NEXT_PUBLIC_JAVA_API_BASE_URL;

export const getBodyCompositionEntries = async (): Promise<void> => {
  await axios.get(
    `${java_url}/api/me`,
    {},
  );
};

