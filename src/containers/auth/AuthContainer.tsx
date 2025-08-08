import { AppShell } from "@mantine/core";
import classes from "./Auth.module.css";

interface IContainerProps {
  children: React.ReactNode;
}

export function AuhtShell({ children }: IContainerProps) {
  return (
    <AppShell padding="md">
      <AppShell.Main className={classes.mainBody}>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}
