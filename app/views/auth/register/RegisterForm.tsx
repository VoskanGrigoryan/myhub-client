"use client";

import { AuhtShell } from "@/src/containers/AuthContainer";
import { Anchor, Card, Divider, Group, Text } from "@mantine/core";
import classes from "./Register.module.css";
import { GoogleButton } from "@/src/assets/GoogleButton";
import { signIn } from "next-auth/react";
import Link from "next/link";

const RegisterForm = () => {
  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/" });
  };

  console.log("Client BACKEND_API_BASE_URL:", process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL);

  
  return (
    <AuhtShell title={"Register"}>
      <Card className={classes.registerCard} p={30}>
        <Text fz={20}>Register a new account</Text>
        <Divider mb="md" mt="xs" />
        <GoogleButton onClick={handleGoogleSignIn} />

        <Divider  mb="xs" mt="md" />
        <Group gap={4}>
          <div>Have an account?</div>
          <Anchor component={Link} href="/login" size="sm">
            Login
          </Anchor>
        </Group>
      </Card>
    </AuhtShell>
  );
};

export default RegisterForm;
