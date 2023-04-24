import React, {useState} from 'react';
import {
  ActionIcon,
  AppShell,
  Avatar,
  Burger, Button,
  Center, Divider, Flex,
  Footer,
  Group,
  Header,
  MediaQuery,
  Navbar,
  NavLink, Skeleton, Space,
  Text, Tooltip,
  useMantineTheme,
} from '@mantine/core';
import logo from '../../assets/icon.svg'
import {IconCursorText, IconLogout, IconWriting} from '@tabler/icons-react';
import {Link, NavLink as Nav, useNavigate} from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";

export default function Shell(props) {
  const LoginButton = () => {
    const { loginWithRedirect, user, isLoading, logout } = useAuth0();

    if (!isLoading) {
      return <>
        <Flex gap={15} justify={"center"} align={"center"} wrap={"wrap"}>
        <Avatar src={user.picture}></Avatar>
          <div>
        <Text size={"md"} fw={500} color={"gray.7"}>{user.name}</Text>
          <Text color={"dimmed"} size={"xs"} fw={300}> {user.email} </Text>
            </div>
                <Tooltip label="Logout">

          <ActionIcon variant={"subtle"} color={"gray.5"}
                      onClick={() =>
                          logout({ logoutParams: { returnTo: window.location.origin + "/logout" } })}>
            <IconLogout />
          </ActionIcon>
                  </Tooltip>

        </Flex>
      </>
    }
    return (
        <>
          <Flex gap={15} justify={"center"} align={"center"} wrap={"wrap"}>
          <Skeleton height={40} width={40} radius="md" visible={true} variant={""}/>
            <div>
              <Skeleton height={13} width={160} radius="md" visible={true}/>
              <Space h={5}/>
              <Skeleton height={10} width={100} radius="md" visible={true}/>
            </div>
          </Flex>
          </>
    )
  };

  const LogoutButton = () => {
    const { logout } = useAuth0();

    return (
        <></>
    );
  };
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  let NavMenu = ({to, label, icon}) =>
      (
          <Nav to={to}>
            {({isActive, isPending}) => (
                <NavLink label={label} color="blue.7" active={isActive} icon={icon}/>
            )}
          </Nav>
      )
  return (
      <AppShell
          styles={{
            main: {
              background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
            },
          }}
          navbarOffsetBreakpoint="sm"
          asideOffsetBreakpoint="sm"
          navbar={
            <>
              <Navbar hiddenBreakpoint="sm" hidden={!opened} width={{sm: 200, lg: 300}}>
                <Navbar.Section grow p="md" >
                  {/* <Box w={240}> */}
                  <NavMenu to={"/nextword"} label={"Word Predictor"} icon={<IconCursorText stroke={1.5}/>}/>
                  <NavMenu to={"/textgen"} label={"Text Generator"} icon={<IconWriting stroke={1.5}/>}/>
                  {/* </Box> */}
                </Navbar.Section>
                <Divider m={"lg"}/>
                <Navbar.Section p="md">
                  <Flex direction={"column"}>
                    <LoginButton />
                    <Space h={"md"}/>
                    <LogoutButton/>
                  </Flex>
                </Navbar.Section>
              </Navbar>
            </>
          }
          footer={
            <Footer height={60} p="md">
              <Center>
                <Text color={"dimmed"} fw={300} size={"md"}>
                  SinhalaTextGenie © 2023 rashad. All rights reserved.
                </Text>
              </Center>
            </Footer>
          }
          header={
            <Header height={{base: 50, md: 70}} p="md">
              <div style={{display: 'flex', alignItems: 'center', height: '100%'}}>
                <MediaQuery largerThan="sm" styles={{display: 'none'}}>
                  <Burger
                      opened={opened}
                      onClick={() => setOpened((o) => !o)}
                      size="sm"
                      color={theme.colors.gray[6]}
                      mr="xl"
                  />
                </MediaQuery>
                <Link to={"/"}>
                  <Group>
                    <Avatar radius="xs" src={logo} alt="logo"/>
                    <Text color="blue.9" order={4} fw={700}>SinhalaTextGenie</Text>
                  </Group>
                </Link>

              </div>
            </Header>
          }
      >
        {props.children}
      </AppShell>
  );
}

export const withShell = (children) => {
  return (
      <Shell>
        {children}
      </Shell>
  )
}