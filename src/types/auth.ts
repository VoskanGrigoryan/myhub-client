
export interface GoogleAuthRequest {
  googleId: string;
  email: string;
  name?: string;
  image?: string;
  idToken: string; // The ID token from Google, to be verified by your backend
}

export interface GoogleAuthResponse {
  token: string; // Your application's JWT
  user: {
    id: string;
    email: string;
    name?: string;
  };
}