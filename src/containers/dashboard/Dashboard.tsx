"use client";

import { AppShell, Burger, Code, Group, Stack, Text } from "@mantine/core";
import {
  IconBodyScan,
  IconBook,
  IconHome,
  IconLogout,
  IconUser,
} from "@tabler/icons-react";
import classes from "./Dashboard.module.css";

import { useRouter } from "next/navigation";
import { logout } from "@/src/services/authService";
import { useAuthStore } from "@/src/zustand/authStore";
import Image from "next/image";
import TORCHLOGO from "../../../public/favicon.svg";
import { useUIStore } from "@/src/zustand/uiStore";

interface IContainerProps {
  children: React.ReactNode;
  title: string;
}

const navbarOptions = [
  { label: "Dashboard", icon: IconHome, link: "/" },
  { label: "Body Composition", icon: IconBodyScan, link: "/views/fitness" },
  { label: "Literature", icon: IconBook, link: "/views/literature" },
];

export function DashboardShell({ children, title }: IContainerProps) {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const { navbarOpen, setNavbarOpen, selectedNavItem, setSelectedNavItem } =
    useUIStore();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/views/auth");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const links = navbarOptions.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === selectedNavItem || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setSelectedNavItem(item.label);
        router.push(item.link);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <AppShell
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !navbarOpen, desktop: false },
      }}
      padding="md"
    >
      <AppShell.Header className={classes.header} hiddenFrom="sm">
        <Group justify="space-between" gap={0} style={{ width: "100%" }}>
          <Burger
            color="white"
            opened={navbarOpen}
            onClick={() => {
              setNavbarOpen(!navbarOpen);
            }}
            size="sm"
          />
          <Text ff={"monospace"} fw={100} fz={20}>
            {title}
          </Text>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar className={classes.navbar} withBorder={false}>
        <div className={classes.navbarMain}>
          <Group className={classes.header} justify="space-between">
            {navbarOpen ? (
              <Burger
                hiddenFrom="sm"
                color="white"
                opened={navbarOpen}
                onClick={() => {
                  setNavbarOpen(!navbarOpen);
                }}
                size="sm"
              />
            ) : (
              <>
                <Image src={TORCHLOGO} alt={"logo"} width={32} height={32} />
                <Code fw={700} className={classes.version}>
                  v0.0.2
                </Code>
              </>
            )}
          </Group>
          <Stack style={{ marginTop: 10 }} gap={"xs"}>{links}</Stack>
        </div>

        <div className={classes.footer}>
          <a
            href="#"
            className={classes.link}
            onClick={(event) => event.preventDefault()}
          >
            <IconUser className={classes.linkIcon} stroke={1.5} />
            <span>{user?.name}</span>
          </a>

          <a
            href="#"
            className={classes.link}
            onClick={(event) => {
              event.preventDefault();
              handleLogout();
            }}
          >
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <span>Logout</span>
          </a>
        </div>
      </AppShell.Navbar>

      <AppShell.Main className={classes.mainBody}>{children}</AppShell.Main>
    </AppShell>
  );
}
