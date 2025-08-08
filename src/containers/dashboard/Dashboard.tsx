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
import { logout } from "@/src/services/authService";
import { useAuthStore } from "@/src/zustand/authStore";

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
      await logout();
      router.push("/views/auth/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const user = useAuthStore((state) => state.user);

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
            <Burger
              hiddenFrom="sm"
              color="white"
              opened={mobileOpened}
              onClick={toggleMobile}
              size="sm"
            />
          </Group>

        </AppShell.Section>

        <AppShell.Section grow px="8">
          <Stack gap={"sm"}>
            
            {navbarOptions.map((item) => {
              return (
                <MyButton
                  key={item.text}
                  onClick={() => {
                    router.push(item.redirectUrl);
                  }}
                  justify="space-between"
                  variant="subtle"
                  color="blue.7"
                  radius="sm"
                  h={50}
                  rightSection={item.icon}
                  size="md"
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
              color="blue"
              variant="filled"
              rightSection={<IconUser size={20} />}
              onClick={() => {
                handleLogout();
              }}
            >
              {user?.name}
            </MyButton>
            <MyButton
              fullWidth
              color="blue"
              variant="outline"
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
