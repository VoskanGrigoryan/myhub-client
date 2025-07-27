"use client";

import MyButton from "@/src/components/myComponents/MyButton";
import { Group, Stack, Text, Title } from "@mantine/core";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function AuthErrorPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const errorMessages: Record<string, string> = {
    Configuration: "There is a problem with the server configuration.",
    AccessDenied: "You don't have permission to sign in.",
    Verification: "The sign-in link is no longer valid.",
    OAuthSignin: "Error in signing in with OAuth.",
    OAuthCallback: "Error in OAuth callback.",
    OAuthCreateAccount: "Could not create account.",
    OAuthAccountNotLinked:
      "This account is already linked to a different provider.",
    EmailCreateAccount: "Could not create account using email.",
    default: "Something went wrong during sign in.",
  };

  const message = error
    ? errorMessages[error] ?? errorMessages.default
    : errorMessages.default;

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        padding: 0,
        margin: 0,
        backgroundColor: "var(--mantine-color-dark-6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
      }}
    >
      <Stack align="stretch" justify="center" gap="md">
        <Title>Authentification error</Title>
        <Group justify="center">
            <Text>{message}</Text>
            <MyButton onClick={() => router.push("/views/auth/login")}>Go back</MyButton>
        </Group>
      </Stack>
    </div>
  );
}
