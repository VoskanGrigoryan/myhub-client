import { AppShell, Button, Group, Text } from "@mantine/core";
import classes from "./Dashboard.module.css";
import { signOut } from "next-auth/react";
import { IconLogout } from "@tabler/icons-react";
interface IContainerProps {
  children: React.ReactNode;
  title: string;
}

export function DashboardShell({ children, title }: IContainerProps) {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header className={classes.header}>
        <Group
          justify="space-between"
          gap={0}
          style={{ width: "100%" }}
        >
          <Text ff={"monospace"} fw={100} fz={25}>
            {title}
          </Text>
          <Button onClick={() => signOut({ callbackUrl: "/views/auth/login" })}>
             <IconLogout size={20}/> 
          </Button>
        </Group>
      </AppShell.Header>
      <AppShell.Main className={classes.mainBody}>{children}</AppShell.Main>
    </AppShell>
  );
}
