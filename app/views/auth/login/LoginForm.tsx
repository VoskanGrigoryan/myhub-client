"use client";

import { AuhtShell } from "@/src/containers/auth/AuthContainer";
import { Anchor, Card, Divider, Group, Text } from "@mantine/core";
import classes from "../Auth.module.css";
import { GoogleButton } from "@/src/assets/GoogleButton";
import { signIn } from "next-auth/react";
import Link from "next/link";

const LoginForm = () => {
  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <AuhtShell title={"Login"}>
      <Card className={classes.registerCard} p={20}>
        <Text fz={20}>Login into account</Text>
        <Divider mb="md" mt="xs" />
        <GoogleButton onClick={handleGoogleSignIn} />

        <Divider mb="xs" mt="md" />
        <Group gap={4}>
          <div>Don't have an account?</div>
          <Anchor component={Link} href="/views/auth/register" size="md">
            Register
          </Anchor>
        </Group>
      </Card>
    </AuhtShell>
  );
};

export default LoginForm;
