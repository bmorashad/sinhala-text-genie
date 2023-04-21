import React, { useState } from 'react';
import {
    AppShell,
    Avatar,
    Group,
    Center,
    Navbar,
    Header,
    Footer,
    Text,
    MediaQuery,
    Burger,
    NavLink,
    useMantineTheme,
} from '@mantine/core';
import logo from '../../assets/icon.svg'
import {
    IconWriting,
    IconCursorText,
    IconSettings,
    IconRefresh,
    IconCircleCheck,
    IconCircleDashed,
    IconTextPlus, IconBallpen, IconCheck, IconCopy
} from '@tabler/icons-react';
import {Link, NavLink as Nav} from "react-router-dom";

export default function Shell(props) {
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
    useState()
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
                <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
                    {/* <Box w={240}> */}
                    <NavMenu to={"/nextword"} label={"Word Predictor"} icon={<IconCursorText stroke={1.5} />}/>
                    <NavMenu to={"/textgen"} label={"Text Generator"} icon={<IconWriting stroke={1.5} />}/>
                    {/* </Box> */}
                </Navbar>
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
                <Header height={{ base: 50, md: 70 }} p="md">
                    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
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
