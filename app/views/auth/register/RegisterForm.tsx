"use client";

import { AuhtShell } from "@/src/containers/auth/AuthContainer";
import { Anchor, Card, Divider, Group, Text } from "@mantine/core";
import classes from "../Auth.module.css";
import { GoogleButton } from "@/src/assets/GoogleButton";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useGoogleAuth } from "@/src/hooks/useGoogleAuth";

const RegisterForm = () => {
  const handleGoogleSignIn = useGoogleAuth();

  return (
    <AuhtShell title={"Register"}>
      <Card className={classes.registerCard} p={30}>
        <Text fz={20}>New account</Text>
        <Divider mb="md" mt="xs" />
        <GoogleButton
          onClick={() => {
            handleGoogleSignIn();
          }}
        />

        <Divider mb="xs" mt="md" />
        <Group gap={4}>
          <div>Have an account?</div>
          <Anchor component={Link} href="/views/auth/login" size="md">
            Login
          </Anchor>
        </Group>
      </Card>
    </AuhtShell>
  );
};

export default RegisterForm;
