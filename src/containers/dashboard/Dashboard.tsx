"use client";

import { AppShell, Burger, Divider, Group, Stack, Text } from "@mantine/core";
import {
  IconBarbell,
  IconBook,
  IconHome,
  IconLogout,
  IconUser,
} from "@tabler/icons-react";
import classes from "./Dashboard.module.css";

import { useRouter } from "next/navigation";

import axios from "axios";
import MyButton from "@/src/components/myComponents/MyButton";
import { useDisclosure } from "@mantine/hooks";

interface IContainerProps {
  children: React.ReactNode;
  title: string;
}

const navbarOptions = [
  { text: "Dashboard", icon: <IconHome />, redirectUrl: "/" },
  { text: "Fitness", icon: <IconBarbell />, redirectUrl: "/views/fitness" },
  { text: "Literature", icon: <IconBook />, redirectUrl: "/views/literature" },
];

export function DashboardShell({ children, title }: IContainerProps) {
  const router = useRouter();

  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8080/auth/logout",
        {},
        {
          withCredentials: true, // SENDS COOKIE TO BACKEND
        }
      );

      router.push("/views/auth/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AppShell
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: false },
      }}
      padding="md"
    >
      <AppShell.Header className={classes.header} hiddenFrom="sm">
        <Group justify="space-between" gap={0} style={{ width: "100%" }}>
          <Burger
            color="white"
            opened={mobileOpened}
            onClick={toggleMobile}
            size="sm"
          />
          <Text ff={"monospace"} fw={100} fz={25} c={"white"}>
            {title}
          </Text>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar className={classes.navbar}>
        <AppShell.Section p="sm">
          <Group justify="space-between">
            <Text size="xl">Menu</Text>
            <Burger
              hiddenFrom="sm"
              color="white"
              opened={mobileOpened}
              onClick={toggleMobile}
              size="sm"
            />
          </Group>

          <Divider color={"dark"} my="xs" />
        </AppShell.Section>

        <AppShell.Section grow px="sm">
          <Stack gap={"sm"}>
            {navbarOptions.map((item) => {
              return (
                <MyButton
                  onClick={() => {
                    router.push(item.redirectUrl);
                  }}
                  justify="space-between"
                  variant="filled"
                  color="indigo"
                  radius="xs"
                  rightSection={item.icon}
                >
                  {item.text}
                </MyButton>
              );
            })}
          </Stack>
        </AppShell.Section>

        <AppShell.Section p="md">
          <Stack>
            <MyButton
              fullWidth
              color="indigo"
              variant="filled"
              rightSection={<IconUser size={20} />}
              onClick={() => {
                handleLogout();
              }}
            >
              Profile
            </MyButton>
            <MyButton
              fullWidth
              color="indigo"
              variant="light"
              rightSection={<IconLogout size={20} />}
              onClick={() => {
                handleLogout();
              }}
            >
              Logout
            </MyButton>
          </Stack>
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main className={classes.mainBody}>{children}</AppShell.Main>
    </AppShell>
  );
}
