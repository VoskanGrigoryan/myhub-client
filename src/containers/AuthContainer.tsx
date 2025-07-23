import { AppShell, Text } from "@mantine/core";
import classes from "./Auth.module.css";

interface IContainerProps {
  children: React.ReactNode;
  title: string;
}

export function AuhtShell({ children, title }: IContainerProps) {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header className={classes.header}>
        <Text ff={"monospace"} fw={100} fz={25}>{title}</Text>
      </AppShell.Header>
      <AppShell.Main className={classes.mainBackground}>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}
