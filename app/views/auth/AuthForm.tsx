"use client";

import { AuhtShell } from "@/src/containers/auth/AuthContainer";
import { Card, Divider, Stack, Text } from "@mantine/core";
import { GoogleButton } from "@/src/assets/GoogleButton";
import { useGoogleAuth } from "@/src/hooks/useGoogleAuth";
import { GithubButton } from "@/src/assets/GitHubButton";

const AuthForm = () => {
  const handleGoogleSignIn = useGoogleAuth();

  return (
    <AuhtShell>
      <Card p={20} style={{ width: 350 }}>
        <Text fz={20}>Authentication</Text>
        <Divider mb="md" mt="xs" />
        <Stack gap={"xs"}>
          <GoogleButton
            onClick={() => {
              handleGoogleSignIn();
            }}
          />

          <GithubButton>Login with GitHub</GithubButton>
        </Stack>
      </Card>
    </AuhtShell>
  );
};

export default AuthForm;
