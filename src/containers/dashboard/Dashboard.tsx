import { AppShell, Button, Group, Text } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import classes from "./Dashboard.module.css";

import { useRouter } from "next/navigation";

import axios from "axios";

interface IContainerProps {
  children: React.ReactNode;
  title: string;
}

export function DashboardShell({ children, title }: IContainerProps) {
  const router = useRouter();

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
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header className={classes.header}>
        <Group justify="space-between" gap={0} style={{ width: "100%" }}>
          <Text ff={"monospace"} fw={100} fz={25}>
            {title}
          </Text>
          <Button
            onClick={() => {
              handleLogout();
            }}
          >
            <IconLogout size={20} />
          </Button>
        </Group>
      </AppShell.Header>
      <AppShell.Main className={classes.mainBody}>{children}</AppShell.Main>
    </AppShell>
  );
}
